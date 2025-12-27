import type { Metric } from './metric';
import type { Rate } from './rate';

export type MonthDiff = {
  electricityT1: number;
  electricityT2: number;
  electricityT3: number;
  waterCold: number;
  waterHot: number;
};

export type MonthCost = {
  electricityT1: number;
  electricityT2: number;
  electricityT3: number;
  waterCold: number;
  waterHot: number;
  internet: number;
};

export type MonthReport = {
  newerMetric: Metric;
  olderMetric: Metric;
  diff: MonthDiff;
  rate: Rate;
  cost: MonthCost;
  electricityTotal: number;
  waterTotal: number;
  total: number;
};
