<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import Receipt from '$lib/components/Receipt.svelte';
  import ReceiptSectionTitle from '$lib/components/ReceiptSectionTitle.svelte';
  import ReceiptRow from '$lib/components/ReceiptRow.svelte';
  import DateSelect from '$lib/components/DateSelect.svelte';

  let { data }: PageProps = $props();
  let { payment, dates, selectedDate } = $derived(data);

  let formattedDate = $derived(
    payment
      ? new Date(payment.periodTo).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : 'Нет данных'
  );

  function handleDateChange(date: string) {
    return goto(`/payments?date=${date}`);
  }
</script>

<Receipt title="Платежи" subtitle={formattedDate}>
  {#if !payment}
    <p class="empty-msg">Платежей пока нет. Выполните пересчёт метрик.</p>
  {:else}
    <div class="receipt-section">
      <DateSelect {dates} selected={selectedDate ?? ''} onchange={handleDateChange} />
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-section">
      <ReceiptSectionTitle title="Электричество" />
      <ul class="receipt-list">
        <ReceiptRow label="T1 (пик)" value={`${payment.electricityT1Cost.toFixed(2)} P`} />
        <ReceiptRow label="T2 (ночь)" value={`${payment.electricityT2Cost.toFixed(2)} P`} />
        <ReceiptRow label="T3 (полупик)" value={`${payment.electricityT3Cost.toFixed(2)} P`} />
      </ul>
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-section">
      <ReceiptSectionTitle title="Вода" />
      <ul class="receipt-list">
        <ReceiptRow label="Холодная" value={`${payment.waterColdCost.toFixed(2)} P`} />
        <ReceiptRow label="Горячая" value={`${payment.waterHotCost.toFixed(2)} P`} />
      </ul>
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-section">
      <ReceiptSectionTitle title="Начисления" />
      <ul class="receipt-list">
        <ReceiptRow label="Электричество" value={payment.electricityTotal.toFixed(2) + ' P'} />
        <ReceiptRow label="Вода" value={payment.waterTotal.toFixed(2) + ' P'} />
        <ReceiptRow label="Интернет" value={payment.internetCost.toFixed(2) + ' P'} />
      </ul>
    </div>

    <div class="receipt-total-row">
      <span>ИТОГО</span>
      <span>{payment.total.toFixed(2)} P</span>
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-section">
      <ReceiptSectionTitle title="Период" />
      <ul class="receipt-list">
        <ReceiptRow label="С" value={payment.periodFrom.toLocaleDateString('ru-RU')} />
        <ReceiptRow label="По" value={payment.periodTo.toLocaleDateString('ru-RU')} />
      </ul>
    </div>
  {/if}
</Receipt>

<style>
  .empty-msg {
    text-align: center;
    color: var(--color-text-light);
    font-size: 12px;
    padding: var(--spacing-lg) 0;
  }
</style>
