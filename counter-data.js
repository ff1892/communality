const counterIndex = [
  {
    id: 1,
    checked_at: "2025-08-15T10:00:00Z",
    electricity_t1: "8738",
    electricity_t2: "5607",
    electricity_t3: "10909",
    water_cold: "00513.939",
    water_hot: "00362.092",
  },
  {
    id: 2,
    checked_at: "2025-09-15T10:00:00Z",
    electricity_t1: "8780",
    electricity_t2: "5622",
    electricity_t3: "10956",
    water_cold: "00520.144",
    water_hot: "00364.947",
  },
  {
    id: 3,
    checked_at: "2025-10-15T10:00:00Z",
    electricity_t1: "8822",
    electricity_t2: "5638",
    electricity_t3: "11012",
    water_cold: "00527.787",
    water_hot: "00369.191",
  },
  {
    id: 4,
    checked_at: "2025-11-15T10:00:00Z",
    electricity_t1: "8862",
    electricity_t2: "5654",
    electricity_t3: "11063",
    water_cold: "00533.771",
    water_hot: "00372.802",
  },
  {
    id: 5,
    checked_at: "2025-12-15T10:00:00Z",
    electricity_t1: "8909",
    electricity_t2: "5673",
    electricity_t3: "11136",
    water_cold: "00542.350",
    water_hot: "00378.848",
  },
];

const waterAndElectricityTarrifs = [
  {
    id: 1,
    isActive: true,
    addedAt: "2025-07-01T10:00:00Z",
    electricity_t1: "10.23",
    electricity_t2: "7.16",
    electricity_t3: "3.71",
    water_cold: "65.77",
    water_hot: "312.50",
  },
];

const internetTariffs = [
  {
    id: 1,
    isActive: true,
    addedAt: "2025-07-01T10:00:00Z",
    internet: "860",
  },
];

const counterLabel = {
  electricity_t1: "💡1️⃣ T1",
  electricity_t2: "💡2️⃣ T2",
  electricity_t3: "💡3️⃣ T3",
  water_cold: "🔵 Холодная вода",
  water_hot: "🔴 Горячая вода",
  internet: "🛜 Интернет",
};

export {
  counterIndex,
  waterAndElectricityTarrifs,
  internetTariffs,
  counterLabel,
};
