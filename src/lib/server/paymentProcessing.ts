import { env } from '$env/dynamic/private';
import {
  getAllMetricsSorted,
  getRateById,
  getUnprocessedMetrics,
  insertPayments,
  markMetricsProcessed,
} from '$lib/db/queries';
import type { MetricDB } from '$lib/types/metric';
import type { PaymentDB } from '$lib/types/payment';
import { randomUUID } from 'node:crypto';

type ProcessMetricsResult = {
  paymentsCreated: number;
  metricsProcessed: number;
  message: string;
};

const roundMetric = (value: number): number => Math.round(value * 1000) / 1000;
const roundMoney = (value: number): number => Math.round(value * 100) / 100;

export const isValidRecalcToken = (token: FormDataEntryValue | null): token is string => {
  return typeof token === 'string' && token.length > 0 && token === env.RECALC_TOKEN;
};

const createPaymentRecord = async (
  olderMetric: MetricDB,
  newerMetric: MetricDB
): Promise<PaymentDB> => {
  const rate = await getRateById(newerMetric.rate_id);
  const electricityT1Diff = newerMetric.electricity_t1 - olderMetric.electricity_t1;
  const electricityT2Diff = newerMetric.electricity_t2 - olderMetric.electricity_t2;
  const electricityT3Diff = newerMetric.electricity_t3 - olderMetric.electricity_t3;
  const waterColdDiff = newerMetric.water_cold - olderMetric.water_cold;
  const waterHotDiff = newerMetric.water_hot - olderMetric.water_hot;

  const electricityT1Cost = electricityT1Diff * rate.electricity_t1;
  const electricityT2Cost = electricityT2Diff * rate.electricity_t2;
  const electricityT3Cost = electricityT3Diff * rate.electricity_t3;
  const waterColdCost = waterColdDiff * rate.water_cold;
  const waterHotCost = waterHotDiff * rate.water_hot;
  const internetCost = rate.internet;

  const electricityTotal = electricityT1Cost + electricityT2Cost + electricityT3Cost;
  const waterTotal = waterColdCost + waterHotCost;
  const total = electricityTotal + waterTotal + internetCost;

  return {
    id: randomUUID(),
    created_at: new Date().toISOString().slice(0, 10),
    period_from: olderMetric.checked_at,
    period_to: newerMetric.checked_at,
    metric_newer_id: newerMetric.id,
    metric_older_id: olderMetric.id,
    rate_id: rate.id,
    electricity_t1_diff: roundMetric(electricityT1Diff),
    electricity_t2_diff: roundMetric(electricityT2Diff),
    electricity_t3_diff: roundMetric(electricityT3Diff),
    water_cold_diff: roundMetric(waterColdDiff),
    water_hot_diff: roundMetric(waterHotDiff),
    electricity_t1_cost: roundMoney(electricityT1Cost),
    electricity_t2_cost: roundMoney(electricityT2Cost),
    electricity_t3_cost: roundMoney(electricityT3Cost),
    water_cold_cost: roundMoney(waterColdCost),
    water_hot_cost: roundMoney(waterHotCost),
    internet_cost: internetCost,
    electricity_total: roundMoney(electricityTotal),
    water_total: roundMoney(waterTotal),
    total: roundMoney(total),
  };
};

export const processUnprocessedMetrics = async (): Promise<ProcessMetricsResult> => {
  const unprocessedMetrics = await getUnprocessedMetrics();
  if (unprocessedMetrics.length === 0) {
    return {
      paymentsCreated: 0,
      metricsProcessed: 0,
      message: 'Нет необработанных метрик',
    };
  }

  const allMetrics = await getAllMetricsSorted();
  const payments: PaymentDB[] = [];
  const processedIds: string[] = [];

  for (const metric of unprocessedMetrics) {
    const metricIndex = allMetrics.findIndex((currentMetric) => currentMetric.id === metric.id);
    if (metricIndex <= 0) {
      continue;
    }

    const olderMetric = allMetrics[metricIndex - 1];
    const newerMetric = allMetrics[metricIndex];
    payments.push(await createPaymentRecord(olderMetric, newerMetric));
    processedIds.push(metric.id);
  }

  if (payments.length > 0) {
    await insertPayments(payments);
    await markMetricsProcessed(processedIds);
  }

  return {
    paymentsCreated: payments.length,
    metricsProcessed: processedIds.length,
    message: `Обработано метрик: ${processedIds.length}, создано платежей: ${payments.length}`,
  };
};
