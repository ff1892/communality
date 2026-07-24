export type RateDB = {
  serial: number;
  id: string;
  created_at: string;
  start_day: string;
  electricity_t1: number;
  electricity_t2: number;
  electricity_t3: number;
  water_cold: number;
  water_hot: number;
  internet: number;
  comment?: string;
};

export type Rate = {
  serial: number;
  id: string;
  createdAt: Date;
  startDay: Date;
  electricityT1: number;
  electricityT2: number;
  electricityT3: number;
  waterCold: number;
  waterHot: number;
  internet: number;
  comment?: string;
};
