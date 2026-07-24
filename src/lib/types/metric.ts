export type MetricDB = {
  serial: number;
  id: string;
  created_at: string;
  checked_at: string;
  electricity_t1: number;
  electricity_t2: number;
  electricity_t3: number;
  water_cold: number;
  water_hot: number;
  rate_id: string;
  processed: number;
};

export type MetricInsert = {
  id: string;
  checked_at: string;
  electricity_t1: number;
  electricity_t2: number;
  electricity_t3: number;
  water_cold: number;
  water_hot: number;
  rate_id: string;
};

export type Metric = {
  serial: number;
  id: string;
  createdAt: Date;
  checkedAt: Date;
  electricityT1: number;
  electricityT2: number;
  electricityT3: number;
  waterCold: number;
  waterHot: number;
  rateId: string;
  processed: boolean;
};
