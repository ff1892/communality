import type { Rate, RateDB } from '$lib/types/rate';
import type { Metric, MetricDB } from '$lib/types/metric';
import type { Payment, PaymentDB } from '$lib/types/payment';

const transformRateDBToRate = (rateDB: RateDB): Rate => {
  return {
    serial: rateDB.serial,
    id: rateDB.id,
    createdAt: new Date(rateDB.created_at),
    startDay: new Date(rateDB.start_day),
    electricityT1: rateDB.electricity_t1,
    electricityT2: rateDB.electricity_t2,
    electricityT3: rateDB.electricity_t3,
    waterCold: rateDB.water_cold,
    waterHot: rateDB.water_hot,
    internet: rateDB.internet,
    comment: rateDB.comment,
  };
};

const transformMetricDBToMetric = (metricDB: MetricDB): Metric => {
  return {
    serial: metricDB.serial,
    id: metricDB.id,
    createdAt: new Date(metricDB.created_at),
    checkedAt: new Date(metricDB.checked_at),
    electricityT1: metricDB.electricity_t1,
    electricityT2: metricDB.electricity_t2,
    electricityT3: metricDB.electricity_t3,
    waterCold: metricDB.water_cold,
    waterHot: metricDB.water_hot,
    rateId: metricDB.rate_id,
    processed: metricDB.processed === 1,
  };
};

const tranformMetricsDBToMetrics = (metricsDB: MetricDB[]): Metric[] => {
  return metricsDB.map(transformMetricDBToMetric);
};

const transformPaymentDBToPayment = (paymentDB: PaymentDB): Payment => {
  return {
    id: paymentDB.id,
    createdAt: new Date(paymentDB.created_at),
    periodFrom: new Date(paymentDB.period_from),
    periodTo: new Date(paymentDB.period_to),
    metricNewerId: paymentDB.metric_newer_id,
    metricOlderId: paymentDB.metric_older_id,
    rateId: paymentDB.rate_id,
    electricityT1Diff: paymentDB.electricity_t1_diff,
    electricityT2Diff: paymentDB.electricity_t2_diff,
    electricityT3Diff: paymentDB.electricity_t3_diff,
    waterColdDiff: paymentDB.water_cold_diff,
    waterHotDiff: paymentDB.water_hot_diff,
    electricityT1Cost: paymentDB.electricity_t1_cost,
    electricityT2Cost: paymentDB.electricity_t2_cost,
    electricityT3Cost: paymentDB.electricity_t3_cost,
    waterColdCost: paymentDB.water_cold_cost,
    waterHotCost: paymentDB.water_hot_cost,
    internetCost: paymentDB.internet_cost,
    electricityTotal: paymentDB.electricity_total,
    waterTotal: paymentDB.water_total,
    total: paymentDB.total,
  };
};

export {
  transformRateDBToRate,
  transformMetricDBToMetric,
  tranformMetricsDBToMetrics,
  transformPaymentDBToPayment,
};
