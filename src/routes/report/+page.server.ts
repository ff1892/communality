import type { Actions, PageServerLoad } from './$types';
import { getLastMetric, getLastRate, insertMetric } from '$lib/db/queries';
import { transformMetricDBToMetric, transformRateDBToRate } from '$lib/functions/transforms';
import { isValidRecalcToken, processUnprocessedMetrics } from '$lib/server/paymentProcessing';
import type { MetricDB, MetricInsert } from '$lib/types/metric';

const formatDate = (value: Date): string => value.toISOString().slice(0, 10);

const parseRequiredField = (formData: FormData, key: string, label: string): string => {
  const value = formData.get(key);
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Поле "${label}" обязательно`);
  }

  return value.trim();
};

const parseNumberField = (formData: FormData, key: string, label: string): number => {
  const rawValue = parseRequiredField(formData, key, label).replace(',', '.');
  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    throw new Error(`Поле "${label}" должно быть числом`);
  }

  return value;
};

const validateMetricProgress = (metric: MetricInsert, previousMetric: MetricDB): void => {
  if (metric.checked_at <= previousMetric.checked_at) {
    throw new Error('Дата показаний должна быть позже предыдущей записи');
  }

  const monotonicFields = [
    ['electricity_t1', 'T1 (пик)'],
    ['electricity_t2', 'T2 (ночь)'],
    ['electricity_t3', 'T3 (полупик)'],
    ['water_cold', 'Холодная вода'],
    ['water_hot', 'Горячая вода'],
  ] as const satisfies ReadonlyArray<[keyof MetricInsert & keyof MetricDB, string]>;

  for (const [field, label] of monotonicFields) {
    if (metric[field] < previousMetric[field]) {
      throw new Error(`Показание "${label}" не может быть меньше предыдущего`);
    }
  }
};

export const load: PageServerLoad = async () => {
  const [lastMetricDB, lastRateDB] = await Promise.all([getLastMetric(), getLastRate()]);

  return {
    defaultCheckedAt: formatDate(new Date()),
    lastMetric: transformMetricDBToMetric(lastMetricDB),
    lastRate: transformRateDBToRate(lastRateDB),
  };
};

export const actions: Actions = {
  submit: async ({ request }) => {
    const formData = await request.formData();
    const token = formData.get('token');

    if (!isValidRecalcToken(token)) {
      return { success: false, error: 'Неверный токен' };
    }

    try {
      const [lastMetric, lastRate] = await Promise.all([getLastMetric(), getLastRate()]);

      const metric: MetricInsert = {
        id: crypto.randomUUID(),
        checked_at: parseRequiredField(formData, 'checked_at', 'Дата показаний'),
        electricity_t1: parseNumberField(formData, 'electricity_t1', 'T1 (пик)'),
        electricity_t2: parseNumberField(formData, 'electricity_t2', 'T2 (ночь)'),
        electricity_t3: parseNumberField(formData, 'electricity_t3', 'T3 (полупик)'),
        water_cold: parseNumberField(formData, 'water_cold', 'Холодная вода'),
        water_hot: parseNumberField(formData, 'water_hot', 'Горячая вода'),
        rate_id: lastRate.id,
      };

      validateMetricProgress(metric, lastMetric);
      await insertMetric(metric);

      const result = await processUnprocessedMetrics();

      return {
        success: true,
        message: `Показания добавлены. ${result.message}`,
        processed: result.paymentsCreated,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      console.error('[report/submit]', message);
      return { success: false, error: message };
    }
  },
};
