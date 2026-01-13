<script lang="ts">
  import type { PageProps } from './$types';
  import MonthMetric from '$lib/components/MonthMetric.svelte';
  import MonthCalculation from '$lib/components/MonthCalculation.svelte';
  import MonthCategory from '$lib/components/MonthCategory.svelte';

  let { data }: PageProps = $props();
  let { newerMetric, olderMetric, diff, rate, cost } = $derived(data);

  let date = $derived(
    new Date(newerMetric.checkedAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );
  let total = $derived(data.total.toFixed(2));
</script>

<main class="container">
  <h1 class="main-title">Коммунальные услуги</h1>
  <h2 class="date-title">📅 {date}</h2>
  <section class="section">
    <h3>Показания счетчиков</h3>
    <ul class="list">
      <MonthMetric label="⚡T1" monthMetric={newerMetric.electricityT1} />
      <MonthMetric label="⚡T2" monthMetric={newerMetric.electricityT2} />
      <MonthMetric label="⚡T3" monthMetric={newerMetric.electricityT3} />
      <MonthMetric label="🔵 Холодная вода" monthMetric={newerMetric.waterCold.toFixed(3)} />
      <MonthMetric label="🔴 Горячая вода" monthMetric={newerMetric.waterHot.toFixed(3)} />
    </ul>
  </section>
  <section class="section">
    <h3>Расчёты</h3>
    <ul class="list">
      <MonthCalculation
        label="⚡T1"
        newerMetric={newerMetric.electricityT1}
        olderMetric={olderMetric.electricityT1}
        diff={diff.electricityT1}
        rate={rate.electricityT1}
        cost={cost.electricityT1}
      />
      <MonthCalculation
        label="⚡T2"
        newerMetric={newerMetric.electricityT2}
        olderMetric={olderMetric.electricityT2}
        diff={diff.electricityT2}
        rate={rate.electricityT2}
        cost={cost.electricityT2}
      />
      <MonthCalculation
        label="⚡T3"
        newerMetric={newerMetric.electricityT3}
        olderMetric={olderMetric.electricityT3}
        diff={diff.electricityT3}
        rate={rate.electricityT3}
        cost={cost.electricityT3}
      />

      <MonthCalculation
        label="🔵 Холодная вода"
        newerMetric={newerMetric.waterCold.toFixed(3)}
        olderMetric={olderMetric.waterCold.toFixed(3)}
        diff={diff.waterCold.toFixed(3)}
        rate={rate.waterCold}
        cost={cost.waterCold}
      />
      <MonthCalculation
        label="🔴 Горячая вода"
        newerMetric={newerMetric.waterHot.toFixed(3)}
        olderMetric={olderMetric.waterHot.toFixed(3)}
        diff={diff.waterHot.toFixed(3)}
        rate={rate.waterHot}
        cost={cost.waterHot}
      />
    </ul>
  </section>
  <section class="section">
    <h3>Начисления</h3>
    <ul class="list">
      <MonthCategory label="⚡ Электричество" cost={data.electricityTotal} />
      <MonthCategory label="💧 Вода" cost={data.waterTotal} />
      <MonthCategory label="🛜 Интернет" cost={cost.internet} />
    </ul>
  </section>
  <h3 class="total">Общий итог: {total} ₽</h3>
</main>

<style lang="css">
  h1,
  h2,
  h3 {
    text-align: center;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .main-title {
    font-size: 1.5rem;
  }

  .date-title {
    font-size: 1.1rem;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .total {
    margin-bottom: 2rem;
  }
</style>
