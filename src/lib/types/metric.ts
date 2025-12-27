export type MetricDB = {
  id: string;
  created_at: Date;
  checked_at: Date;
  electricity_t1: number;
  electricity_t2: number;
  electricity_t3: number;
  water_cold: number;
  water_hot: number;
  rate_id: string;
};

export type Metric = {
  id: string;
  createdAt: Date;
  checkedAt: Date;
  electricityT1: number;
  electricityT2: number;
  electricityT3: number;
  waterCold: number;
  waterHot: number;
  rateId: string;
};
