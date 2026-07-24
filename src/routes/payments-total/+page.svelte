<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import Receipt from '$lib/components/Receipt.svelte';
  import ReceiptRow from '$lib/components/ReceiptRow.svelte';
  import ReceiptSectionTitle from '$lib/components/ReceiptSectionTitle.svelte';

  let { data }: PageProps = $props();

  let hasData = $derived(data.years.length > 0);
  let scaleMax = $derived(data.maxTotal > 0 ? data.maxTotal : 1);
  let peakPoint = $derived(
    data.points.reduce(
      (maxPoint, point) => (point.total > maxPoint.total ? point : maxPoint),
      data.points[0] ?? { month: 0, label: '-', total: 0 }
    )
  );

  function handleYearChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    goto(`/payments-total?year=${target.value}`);
  }

  function formatMoney(value: number) {
    return `${value.toFixed(2)} P`;
  }
</script>

<Receipt title="Итоги платежей" subtitle={`Год ${data.selectedYear}`}>
  {#if !hasData}
    <p class="empty-msg">Платежей пока нет. График появится после первого пересчёта.</p>
  {:else}
    <div class="receipt-section">
      <ReceiptSectionTitle title="Период" />
      <select class="receipt-select" value={String(data.selectedYear)} onchange={handleYearChange}>
        {#each data.years as year (year)}
          <option value={year}>{year}</option>
        {/each}
      </select>
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-section">
      <ReceiptSectionTitle title="Сводка" />
      <ul class="receipt-list">
        <ReceiptRow label="Итого за год" value={formatMoney(data.yearTotal)} />
        <ReceiptRow label="Среднее по активным месяцам" value={formatMoney(data.averageTotal)} />
        <ReceiptRow
          label="Пик"
          value={`${peakPoint.label.toUpperCase()} · ${formatMoney(peakPoint.total)}`}
        />
      </ul>
    </div>

    <hr class="receipt-divider" />

    <div class="receipt-section">
      <ReceiptSectionTitle title="График по месяцам" />
      <div class="chart-shell">
        <div class="chart-grid">
          {#each data.points as point (point.month)}
            <div class="chart-column">
              <span class="chart-value">{point.total > 0 ? point.total.toFixed(0) : ''}</span>
              <div class="chart-bar-track">
                <div
                  class="chart-bar"
                  style={`height: ${(point.total / scaleMax) * 100}%`}
                  title={`${point.label}: ${formatMoney(point.total)}`}
                ></div>
              </div>
              <span class="chart-label">{point.label}</span>
            </div>
          {/each}
        </div>
      </div>
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

  .chart-shell {
    padding-top: var(--spacing-sm);
  }

  .chart-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 6px;
    align-items: end;
    min-height: 190px;
    padding: var(--spacing-sm) 0 0;
    background-image: repeating-linear-gradient(
      to top,
      transparent 0,
      transparent 31px,
      rgba(176, 176, 168, 0.55) 31px,
      rgba(176, 176, 168, 0.55) 32px
    );
    border-top: 1px dashed var(--color-border-dashed);
    border-bottom: 1px solid var(--color-border);
  }

  .chart-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-xs);
    min-height: 180px;
  }

  .chart-value {
    min-height: 14px;
    font-size: 10px;
    color: var(--color-text-light);
    letter-spacing: 0.04em;
  }

  .chart-bar-track {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .chart-bar {
    width: min(14px, 100%);
    min-height: 0;
    background: repeating-linear-gradient(
      to top,
      var(--color-text) 0,
      var(--color-text) 6px,
      #7b7b74 6px,
      #7b7b74 7px
    );
    border: 1px solid var(--color-text);
    border-bottom: none;
    transition: opacity 0.15s ease;
  }

  .chart-bar:hover {
    opacity: 0.8;
  }

  .chart-label {
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-light);
  }
</style>
