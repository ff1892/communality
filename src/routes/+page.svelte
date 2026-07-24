<script lang="ts">
  import type { PageProps } from './$types';
  import Receipt from '$lib/components/Receipt.svelte';
  import ReceiptSectionTitle from '$lib/components/ReceiptSectionTitle.svelte';
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

<Receipt title="Коммунальные услуги" subtitle={date}>
  <div class="receipt-section">
    <ReceiptSectionTitle title="Показания" />
    <ul class="receipt-list">
      <MonthMetric label="T1 (пик)" monthMetric={newerMetric.electricityT1} />
      <MonthMetric label="T2 (ночь)" monthMetric={newerMetric.electricityT2} />
      <MonthMetric label="T3 (полупик)" monthMetric={newerMetric.electricityT3} />
      <MonthMetric label="Хол. вода" monthMetric={newerMetric.waterCold.toFixed(3)} />
      <MonthMetric label="Гор. вода" monthMetric={newerMetric.waterHot.toFixed(3)} />
    </ul>
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Расчёты" />
    <ul class="receipt-list">
      <MonthCalculation
        label="T1 (пик)"
        newerMetric={newerMetric.electricityT1}
        olderMetric={olderMetric.electricityT1}
        diff={diff.electricityT1}
        rate={rate.electricityT1}
        cost={cost.electricityT1}
      />
      <MonthCalculation
        label="T2 (ночь)"
        newerMetric={newerMetric.electricityT2}
        olderMetric={olderMetric.electricityT2}
        diff={diff.electricityT2}
        rate={rate.electricityT2}
        cost={cost.electricityT2}
      />
      <MonthCalculation
        label="T3 (полупик)"
        newerMetric={newerMetric.electricityT3}
        olderMetric={olderMetric.electricityT3}
        diff={diff.electricityT3}
        rate={rate.electricityT3}
        cost={cost.electricityT3}
      />
      <MonthCalculation
        label="Хол. вода"
        newerMetric={newerMetric.waterCold.toFixed(3)}
        olderMetric={olderMetric.waterCold.toFixed(3)}
        diff={diff.waterCold.toFixed(3)}
        rate={rate.waterCold}
        cost={cost.waterCold}
      />
      <MonthCalculation
        label="Гор. вода"
        newerMetric={newerMetric.waterHot.toFixed(3)}
        olderMetric={olderMetric.waterHot.toFixed(3)}
        diff={diff.waterHot.toFixed(3)}
        rate={rate.waterHot}
        cost={cost.waterHot}
      />
    </ul>
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Начисления" />
    <ul class="receipt-list">
      <MonthCategory label="Электричество" cost={data.electricityTotal} />
      <MonthCategory label="Вода" cost={data.waterTotal} />
      <MonthCategory label="Интернет" cost={cost.internet} />
    </ul>
  </div>

  <div class="receipt-total-row">
    <span>ИТОГО</span>
    <span>{total} P</span>
  </div>
</Receipt>
