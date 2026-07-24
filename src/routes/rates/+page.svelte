<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import Receipt from '$lib/components/Receipt.svelte';
  import ReceiptSectionTitle from '$lib/components/ReceiptSectionTitle.svelte';
  import ReceiptRow from '$lib/components/ReceiptRow.svelte';
  import DateSelect from '$lib/components/DateSelect.svelte';

  let { data }: PageProps = $props();
  let { rate, dates, selectedDate } = $derived(data);

  let formattedDate = $derived(
    new Date(rate.startDay).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );

  function handleDateChange(date: string) {
    goto(`/rates?date=${date}`);
  }
</script>

<Receipt title="Тарифы" subtitle={'с ' + formattedDate}>
  <div class="receipt-section">
    <DateSelect {dates} selected={selectedDate} onchange={handleDateChange} />
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Электричество" />
    <ul class="receipt-list">
      <ReceiptRow label="T1 (пик)" value="{rate.electricityT1.toFixed(2)} P/кВт·ч" />
      <ReceiptRow label="T2 (ночь)" value="{rate.electricityT2.toFixed(2)} P/кВт·ч" />
      <ReceiptRow label="T3 (полупик)" value="{rate.electricityT3.toFixed(2)} P/кВт·ч" />
    </ul>
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Вода" />
    <ul class="receipt-list">
      <ReceiptRow label="Холодная" value="{rate.waterCold.toFixed(2)} P/м³" />
      <ReceiptRow label="Горячая" value="{rate.waterHot.toFixed(2)} P/м³" />
    </ul>
  </div>

  <hr class="receipt-divider" />

  <div class="receipt-section">
    <ReceiptSectionTitle title="Интернет" />
    <ul class="receipt-list">
      <ReceiptRow label="Ежемесячно" value="{rate.internet.toFixed(2)} P" />
    </ul>
  </div>

  {#if rate.comment}
    <hr class="receipt-divider" />
    <div class="rate-comment">
      <ReceiptSectionTitle title="Примечание" />
      <p class="comment-text">{rate.comment}</p>
    </div>
  {/if}
</Receipt>

<style>
  .comment-text {
    font-size: 11px;
    color: var(--color-text-light);
    margin: var(--spacing-xs) 0 0;
    word-break: break-word;
  }
</style>
