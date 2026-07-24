import { generateMonthReportData } from '$lib/functions/generateMonthReportData';
import { turso } from '$lib/tursoClient';
import { getLastRate } from './queries';
import { mapMetricRow } from './mappers';

const getLastTwoMetrics = async () => {
  const result = await turso.execute('SELECT * FROM metrics ORDER BY checked_at DESC LIMIT 2');
  if (result.rows.length < 2) throw new Error('Not enough metrics found');
  return result.rows.map(mapMetricRow);
};

export const getPageData = async () => {
  const lastRate = await getLastRate();
  const lastMetrics = await getLastTwoMetrics();
  const [newerMetric, olderMetric] = lastMetrics;
  return generateMonthReportData(lastRate, [newerMetric, olderMetric]);
};
