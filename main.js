// import {
//   counterIndex,
//   waterAndElectricityTarrifs,
//   internetTariffs,
//   counterLabel,
// } from "./counter-data";

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
  electricity_t1: "💡 T1",
  electricity_t2: "💡 T2",
  electricity_t3: "💡 T3",
  water_cold: "🔵 Холодная вода",
  water_hot: "🔴 Горячая вода",
  internet: "🛜 Интернет",
};

const waterAndElectricityTariff = waterAndElectricityTarrifs.find(
  (tariff) => tariff.isActive
);
const internetTariff = internetTariffs.find((tariff) => tariff.isActive);

const actualData = counterIndex.at(-1);
const prevData = counterIndex.at(-2);

const electricityKeys = ["electricity_t1", "electricity_t2", "electricity_t3"];
const waterKeys = ["water_cold", "water_hot"];
const internetKey = "internet";

const countElecticity = () => {
  const amounts = [];
  for (const electricityKey of electricityKeys) {
    const key = counterLabel[electricityKey];
    const last = parseInt(actualData[electricityKey], 10);
    const prev = parseInt(prevData[electricityKey], 10);
    const diff = last - prev;
    const tariff = parseFloat(waterAndElectricityTariff[electricityKey]);
    const amount = (diff * tariff).toFixed(2);
    amounts.push(amount);
    console.log(
      `${key}\nБыло: ${prevData[electricityKey]}\nСтало: ${actualData[electricityKey]}\nРазница: ${diff}\nТариф: ${tariff}\nСумма: ${amount}\n`
    );
  }
  const total = amounts.reduce((acc, cur) => acc + Number(cur), 0);
  console.log(`⚡Итого за электричество: ${total.toFixed(2)}\n`);
  return total;
};

const countWater = () => {
  const amounts = [];
  for (const waterKey of waterKeys) {
    const key = counterLabel[waterKey];
    const last = parseFloat(actualData[waterKey]);
    const prev = parseFloat(prevData[waterKey]);
    const diff = (last - prev).toFixed(3);
    const tariff = parseFloat(waterAndElectricityTariff[waterKey]);
    const amount = (diff * tariff).toFixed(2);
    amounts.push(amount);
    console.log(
      `${key}\nБыло: ${prevData[waterKey]}\nСтало: ${actualData[waterKey]}\nРазница: ${diff}\nТариф: ${tariff}\nСумма: ${amount}\n`
    );
  }
  const total = amounts.reduce((acc, cur) => acc + Number(cur), 0);
  console.log(`🚿 Итого за воду: ${total.toFixed(2)}\n`);
  return total;
};

const countInternet = () => {
  const amount = parseFloat(internetTariff.internet);
  console.log(`${counterLabel[internetKey]}: ${amount.toFixed(2)}`);
  return amount;
};

const run = () => {
  console.log("Расчёт коммунальных услуг:\n");
  const electricityTotal = countElecticity();
  const waterTotal = countWater();
  const internetTotal = countInternet();
  const grandTotal = (electricityTotal + waterTotal + internetTotal).toFixed(2);
  console.log(`\nИтого: ${grandTotal}`);
};

run();
