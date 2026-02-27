import { generateMonthReportData } from '$lib/functions/generateMonthReportData';
import { turso } from '$lib/tursoClient';
import type { MetricDB } from '$lib/types/metric';
import type { RateDB } from '$lib/types/rate';

const getLastRate = async (): Promise<RateDB> => {
  const result = await turso.execute('SELECT * FROM rates ORDER BY start_day DESC LIMIT 1');
  if (result.rows.length === 0) {
    throw new Error('No rates found');
  }
  const row = result.rows[0];
  return {
    id: row.id as string,
    created_at: row.created_at as string,
    start_day: row.start_day as string,
    electricity_t1: row.electricity_t1 as number,
    electricity_t2: row.electricity_t2 as number,
    electricity_t3: row.electricity_t3 as number,
    water_cold: row.water_cold as number,
    water_hot: row.water_hot as number,
    internet: row.internet as number,
    comment: row.comment as string | undefined,
  };
};

const getLastMetrics = async (): Promise<MetricDB[]> => {
  const result = await turso.execute('SELECT * FROM metrics ORDER BY checked_at DESC LIMIT 2');
  if (result.rows.length < 2) {
    throw new Error('Not enough metrics found');
  }
  return result.rows.map((row) => ({
    id: row.id as string,
    created_at: row.created_at as string,
    checked_at: row.checked_at as string,
    electricity_t1: row.electricity_t1 as number,
    electricity_t2: row.electricity_t2 as number,
    electricity_t3: row.electricity_t3 as number,
    water_cold: row.water_cold as number,
    water_hot: row.water_hot as number,
    rate_id: row.rate_id as string,
  }));
};

export const getPageData = async () => {
  const lastRate = await getLastRate();
  const lastMetrics = await getLastMetrics();

  const [newerMetric, olderMetric] = lastMetrics;

  const pageData = generateMonthReportData(lastRate, [newerMetric, olderMetric]);
  return pageData;
};
