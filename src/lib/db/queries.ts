import { turso } from '$lib/tursoClient';
import { mapMetricRow, mapRateRow, mapPaymentRow } from './mappers';
import type { MetricDB, MetricInsert } from '$lib/types/metric';
import type { RateDB } from '$lib/types/rate';
import type { PaymentDB } from '$lib/types/payment';

// --- Metrics ---

export const getAllMetricDates = async (): Promise<string[]> => {
  const result = await turso.execute(
    'SELECT DISTINCT checked_at FROM metrics ORDER BY checked_at DESC'
  );
  return result.rows.map((row) => row.checked_at as string);
};

export const getMetricByDate = async (date: string): Promise<MetricDB> => {
  const result = await turso.execute({
    sql: 'SELECT * FROM metrics WHERE checked_at = ? LIMIT 1',
    args: [date],
  });
  if (result.rows.length === 0) throw new Error(`No metric found for date ${date}`);
  return mapMetricRow(result.rows[0]);
};

export const getLastMetric = async (): Promise<MetricDB> => {
  const result = await turso.execute('SELECT * FROM metrics ORDER BY checked_at DESC LIMIT 1');
  if (result.rows.length === 0) throw new Error('No metrics found');
  return mapMetricRow(result.rows[0]);
};

export const getUnprocessedMetrics = async (): Promise<MetricDB[]> => {
  const result = await turso.execute(
    'SELECT * FROM metrics WHERE processed = 0 ORDER BY checked_at ASC'
  );
  return result.rows.map(mapMetricRow);
};

export const getAllMetricsSorted = async (): Promise<MetricDB[]> => {
  const result = await turso.execute('SELECT * FROM metrics ORDER BY checked_at ASC');
  return result.rows.map(mapMetricRow);
};

export const markMetricsProcessed = async (ids: string[]): Promise<void> => {
  if (ids.length === 0) return;
  const placeholders = ids.map(() => '?').join(',');
  await turso.execute({
    sql: `UPDATE metrics SET processed = 1 WHERE id IN (${placeholders})`,
    args: ids,
  });
};

// --- Rates ---

export const getAllRateDates = async (): Promise<string[]> => {
  const result = await turso.execute(
    'SELECT DISTINCT start_day FROM rates ORDER BY start_day DESC'
  );
  return result.rows.map((row) => row.start_day as string);
};

export const getRateByDate = async (date: string): Promise<RateDB> => {
  const result = await turso.execute({
    sql: 'SELECT * FROM rates WHERE start_day = ? LIMIT 1',
    args: [date],
  });
  if (result.rows.length === 0) throw new Error(`No rate found for date ${date}`);
  return mapRateRow(result.rows[0]);
};

export const getLastRate = async (): Promise<RateDB> => {
  const result = await turso.execute('SELECT * FROM rates ORDER BY serial DESC LIMIT 1');
  if (result.rows.length === 0) throw new Error('No rates found');
  return mapRateRow(result.rows[0]);
};

export const getRateById = async (id: string): Promise<RateDB> => {
  const result = await turso.execute({
    sql: 'SELECT * FROM rates WHERE id = ? LIMIT 1',
    args: [id],
  });
  if (result.rows.length === 0) throw new Error(`Rate not found: ${id}`);
  return mapRateRow(result.rows[0]);
};

export const insertMetric = async (metric: MetricInsert): Promise<void> => {
  const createdAt = new Date().toISOString().slice(0, 10);

  await turso.execute({
    sql: `INSERT INTO metrics (
      serial,
      id,
      created_at,
      checked_at,
      electricity_t1,
      electricity_t2,
      electricity_t3,
      water_cold,
      water_hot,
      rate_id,
      processed
    ) VALUES ((SELECT COALESCE(MAX(serial), 0) + 1 FROM metrics), ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    args: [
      metric.id,
      createdAt,
      metric.checked_at,
      metric.electricity_t1,
      metric.electricity_t2,
      metric.electricity_t3,
      metric.water_cold,
      metric.water_hot,
      metric.rate_id,
    ],
  });
};

// --- Payments ---

export const getAllPaymentDates = async (): Promise<string[]> => {
  const result = await turso.execute(
    'SELECT DISTINCT period_to FROM payments ORDER BY period_to DESC'
  );
  return result.rows.map((row) => row.period_to as string);
};

export const getPaymentByDate = async (date: string): Promise<PaymentDB> => {
  const result = await turso.execute({
    sql: 'SELECT * FROM payments WHERE period_to = ? LIMIT 1',
    args: [date],
  });
  if (result.rows.length === 0) throw new Error(`No payment found for date ${date}`);
  return mapPaymentRow(result.rows[0]);
};

export const getLastPayment = async (): Promise<PaymentDB | null> => {
  const result = await turso.execute('SELECT * FROM payments ORDER BY period_to DESC LIMIT 1');
  if (result.rows.length === 0) return null;
  return mapPaymentRow(result.rows[0]);
};

export const getPaymentYears = async (): Promise<number[]> => {
  const result = await turso.execute(`
    SELECT CAST(strftime('%Y', period_to) AS INT) AS year
    FROM payments
    GROUP BY year
    ORDER BY year DESC
  `);

  return result.rows.map((row) => Number(row.year));
};

export const getPaymentTotalsByYear = async (
  year: number
): Promise<Array<{ month: number; total: number }>> => {
  const result = await turso.execute({
    sql: `
      SELECT
        CAST(strftime('%m', period_to) AS INT) AS month,
        ROUND(SUM(total), 2) AS total
      FROM payments
      WHERE strftime('%Y', period_to) = ?
      GROUP BY month
      ORDER BY month ASC
    `,
    args: [String(year)],
  });

  return result.rows.map((row) => ({
    month: Number(row.month),
    total: Number(row.total),
  }));
};

export const insertPayments = async (payments: PaymentDB[]): Promise<void> => {
  if (payments.length === 0) return;

  const statements = payments.map((p) => ({
    sql: `INSERT INTO payments (
      id, created_at, period_from, period_to,
      metric_newer_id, metric_older_id, rate_id,
      electricity_t1_diff, electricity_t2_diff, electricity_t3_diff,
      water_cold_diff, water_hot_diff,
      electricity_t1_cost, electricity_t2_cost, electricity_t3_cost,
      water_cold_cost, water_hot_cost, internet_cost,
      electricity_total, water_total, total
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      p.id,
      p.created_at,
      p.period_from,
      p.period_to,
      p.metric_newer_id,
      p.metric_older_id,
      p.rate_id,
      p.electricity_t1_diff,
      p.electricity_t2_diff,
      p.electricity_t3_diff,
      p.water_cold_diff,
      p.water_hot_diff,
      p.electricity_t1_cost,
      p.electricity_t2_cost,
      p.electricity_t3_cost,
      p.water_cold_cost,
      p.water_hot_cost,
      p.internet_cost,
      p.electricity_total,
      p.water_total,
      p.total,
    ],
  }));

  await turso.batch(statements, 'write');
};
