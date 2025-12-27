import type { RateDB } from '$lib/types/rate';
import type { MetricDB } from '$lib/types/metric';
import type { MonthReport } from '$lib/types/monthReport';
import { tranformMetricsDBToMetrics, transformRateDBToRate } from './transforms';

export const generateMonthReportData = (
  rateDb: RateDB,
  metricsDB: [MetricDB, MetricDB]
): MonthReport => {
  const metrics = tranformMetricsDBToMetrics(metricsDB);
  const rate = transformRateDBToRate(rateDb);
  if (metrics.length !== 2) {
    throw new Error('Expected exactly two metrics to generate month data');
  }
  const [newerMetric, olderMetric] = metrics;

  if (olderMetric.checkedAt >= newerMetric.checkedAt) {
    throw new Error('Metrics are not in chronological order');
  }
  if (olderMetric.rateId !== newerMetric.rateId) {
    throw new Error('Metrics do not belong to the same rate');
  }

  const diff = {
    electricityT1: newerMetric.electricityT1 - olderMetric.electricityT1,
    electricityT2: newerMetric.electricityT2 - olderMetric.electricityT2,
    electricityT3: newerMetric.electricityT3 - olderMetric.electricityT3,
    waterCold: newerMetric.waterCold - olderMetric.waterCold,
    waterHot: newerMetric.waterHot - olderMetric.waterHot,
  };

  const cost = {
    electricityT1: diff.electricityT1 * rate.electricityT1,
    electricityT2: diff.electricityT2 * rate.electricityT2,
    electricityT3: diff.electricityT3 * rate.electricityT3,
    waterCold: diff.waterCold * rate.waterCold,
    waterHot: diff.waterHot * rate.waterHot,
    internet: rate.internet,
  };

  const electricityTotal = cost.electricityT1 + cost.electricityT2 + cost.electricityT3;
  const waterTotal = cost.waterCold + cost.waterHot;
  const total = electricityTotal + waterTotal + cost.internet;

  return { newerMetric, olderMetric, diff, rate, cost, electricityTotal, waterTotal, total };
};
