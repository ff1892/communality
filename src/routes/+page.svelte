<script lang="ts">
  import type { PageProps } from './$types';
  import MonthMetric from '$lib/components/MonthMetric.svelte';
  import MonthCalculation from '$lib/components/MonthCalculation.svelte';

  let { data }: PageProps = $props();
  let { newerMetric, olderMetric, diff, rate, cost } = $derived(data);

  let date = $derived(
    new Date(newerMetric.checkedAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );
  let electricityTotal = $derived(data.electricityTotal.toFixed(2));
  let waterTotal = $derived(data.waterTotal.toFixed(2));
  let total = $derived(data.total.toFixed(2));
</script>

<main>
  <h1>Коммунальные услуги</h1>
  <div class="wrapper">
    <h2>{date}</h2>
    <section>
      <h3>Показания счетчиков</h3>
      <ul class="metrics-list">
        <div class="electricity-list">
          <MonthMetric label="⚡T1" monthMetric={newerMetric.electricityT1} />
          <MonthMetric label="⚡T2" monthMetric={newerMetric.electricityT2} />
          <MonthMetric label="⚡T3" monthMetric={newerMetric.electricityT3} />
        </div>
        <div class="water-list">
          <MonthMetric label="🔵 Холодная вода" monthMetric={newerMetric.waterCold.toFixed(3)} />
          <MonthMetric label="🔴 Горячая вода" monthMetric={newerMetric.waterHot.toFixed(3)} />
        </div>
      </ul>
    </section>
    <section>
      <h3>Расчёты</h3>
      <ul>
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
          newerMetric={newerMetric.waterCold}
          olderMetric={olderMetric.waterCold}
          diff={diff.waterCold.toFixed(3)}
          rate={rate.waterCold}
          cost={cost.waterCold}
        />
        <MonthCalculation
          label="🔴 Горячая вода"
          newerMetric={newerMetric.waterHot}
          olderMetric={olderMetric.waterHot}
          diff={diff.waterHot.toFixed(3)}
          rate={rate.waterHot}
          cost={cost.waterHot}
        />
      </ul>
    </section>
    <section>
      <h3>Начисления</h3>
      <ul class="categories">
        <li>Итого за электричество: {electricityTotal} ₽</li>
        <li>Итого за воду: {waterTotal} ₽</li>
        <li>Итого за интернет: {cost.internet.toFixed(2)} ₽</li>
      </ul>
    </section>
    <h3>Общий итог: {total} ₽</h3>
  </div>
</main>

<style lang="css">
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  section > h3 {
    margin-bottom: 1rem;
  }

  .wrapper > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .metrics-list {
    display: grid;
    grid-template-rows: auto auto;
    gap: 1rem;
  }

  .electricity-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 1rem;
  }

  .water-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  .categories {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  span {
    display: inline-block;
  } */
</style>
