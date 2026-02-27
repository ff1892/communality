import type { Rate, RateDB } from '$lib/types/rate';
import type { Metric, MetricDB } from '$lib/types/metric';

const transformRateDBToRate = (rateDB: RateDB): Rate => {
  return {
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
    id: metricDB.id,
    createdAt: new Date(metricDB.created_at),
    checkedAt: new Date(metricDB.checked_at),
    electricityT1: metricDB.electricity_t1,
    electricityT2: metricDB.electricity_t2,
    electricityT3: metricDB.electricity_t3,
    waterCold: metricDB.water_cold,
    waterHot: metricDB.water_hot,
    rateId: metricDB.rate_id,
  };
};

const tranformMetricsDBToMetrics = (metricsDB: MetricDB[]): Metric[] => {
  return metricsDB.map(transformMetricDBToMetric);
};

export { transformRateDBToRate, tranformMetricsDBToMetrics };
