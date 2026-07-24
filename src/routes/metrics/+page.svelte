<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import Receipt from '$lib/components/Receipt.svelte';
  import ReceiptSectionTitle from '$lib/components/ReceiptSectionTitle.svelte';
  import ReceiptRow from '$lib/components/ReceiptRow.svelte';
  import DateSelect from '$lib/components/DateSelect.svelte';

  let { data }: PageProps = $props();
  let { metric, dates, selectedDate } = $derived(data);

  let formattedDate = $derived(
    new Date(metric.checkedAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );

  function handleDateChange(date: string) {
    goto(`/metrics?date=${date}`);
  }
</script>

<Receipt title="Показания" subtitle={formattedDate}>
  <div class="receipt-section">
    <DateSelect {dates} selected={selectedDate} onchange={handleDateChange} />
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Электричество" />
    <ul class="receipt-list">
      <ReceiptRow label="T1 (пик)" value={metric.electricityT1} />
      <ReceiptRow label="T2 (ночь)" value={metric.electricityT2} />
      <ReceiptRow label="T3 (полупик)" value={metric.electricityT3} />
    </ul>
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Вода" />
    <ul class="receipt-list">
      <ReceiptRow label="Холодная" value={metric.waterCold.toFixed(3)} />
      <ReceiptRow label="Горячая" value={metric.waterHot.toFixed(3)} />
    </ul>
  </div>
</Receipt>
