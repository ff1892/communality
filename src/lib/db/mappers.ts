import type { Row } from '@libsql/client';
import type { MetricDB } from '$lib/types/metric';
import type { RateDB } from '$lib/types/rate';
import type { PaymentDB } from '$lib/types/payment';

export const mapRateRow = (row: Row): RateDB => ({
  serial: row.serial as number,
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
});

export const mapMetricRow = (row: Row): MetricDB => ({
  serial: row.serial as number,
  id: row.id as string,
  created_at: row.created_at as string,
  checked_at: row.checked_at as string,
  electricity_t1: row.electricity_t1 as number,
  electricity_t2: row.electricity_t2 as number,
  electricity_t3: row.electricity_t3 as number,
  water_cold: row.water_cold as number,
  water_hot: row.water_hot as number,
  rate_id: row.rate_id as string,
  processed: (row.processed as number) ?? 0,
});

export const mapPaymentRow = (row: Row): PaymentDB => ({
  id: row.id as string,
  created_at: row.created_at as string,
  period_from: row.period_from as string,
  period_to: row.period_to as string,
  metric_newer_id: row.metric_newer_id as string,
  metric_older_id: row.metric_older_id as string,
  rate_id: row.rate_id as string,
  electricity_t1_diff: row.electricity_t1_diff as number,
  electricity_t2_diff: row.electricity_t2_diff as number,
  electricity_t3_diff: row.electricity_t3_diff as number,
  water_cold_diff: row.water_cold_diff as number,
  water_hot_diff: row.water_hot_diff as number,
  electricity_t1_cost: row.electricity_t1_cost as number,
  electricity_t2_cost: row.electricity_t2_cost as number,
  electricity_t3_cost: row.electricity_t3_cost as number,
  water_cold_cost: row.water_cold_cost as number,
  water_hot_cost: row.water_hot_cost as number,
  internet_cost: row.internet_cost as number,
  electricity_total: row.electricity_total as number,
  water_total: row.water_total as number,
  total: row.total as number,
});
