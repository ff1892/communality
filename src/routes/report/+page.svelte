<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import Receipt from '$lib/components/Receipt.svelte';
  import ReceiptRow from '$lib/components/ReceiptRow.svelte';
  import ReceiptSectionTitle from '$lib/components/ReceiptSectionTitle.svelte';
  import Icon from '$lib/components/Icon.svelte';

  type ActionResult = {
    success?: boolean;
    error?: string;
    message?: string;
    processed?: number;
  };

  let { data }: PageProps = $props();

  let loading = $state(false);
  let result: ActionResult | null = $state(null);

  let lastMetricDate = $derived(
    new Date(data.lastMetric.checkedAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );

  let rateSubtitle = $derived(
    `Тариф #${data.lastRate.serial} c ${new Date(data.lastRate.startDay).toLocaleDateString('ru-RU')}`
  );
</script>

<Receipt title="Новый отчёт" subtitle={rateSubtitle}>
  <div class="receipt-section">
    <ReceiptSectionTitle title="Последние показания" />
    <ul class="receipt-list">
      <ReceiptRow label="Дата" value={lastMetricDate} />
      <ReceiptRow label="T1 (пик)" value={data.lastMetric.electricityT1} />
      <ReceiptRow label="T2 (ночь)" value={data.lastMetric.electricityT2} />
      <ReceiptRow label="T3 (полупик)" value={data.lastMetric.electricityT3} />
      <ReceiptRow label="Хол. вода" value={data.lastMetric.waterCold.toFixed(3)} />
      <ReceiptRow label="Гор. вода" value={data.lastMetric.waterHot.toFixed(3)} />
    </ul>
  </div>

  <hr class="receipt-divider" />

  <form
    method="POST"
    action="?/submit"
    use:enhance={() => {
      loading = true;
      result = null;

      return async ({ result: response, update }) => {
        loading = false;

        if (response.type === 'success' && response.data) {
          result = response.data as ActionResult;
        } else {
          result = { success: false, error: 'Ошибка сервера' };
        }

        await update({ reset: true });
      };
    }}
  >
    <div class="report-grid">
      <div class="report-field report-field-full">
        <label class="report-label" for="checked_at">Дата показаний</label>
        <input
          id="checked_at"
          name="checked_at"
          type="date"
          class="receipt-input"
          value={data.defaultCheckedAt}
          required
        />
      </div>

      <div class="report-field">
        <label class="report-label" for="electricity_t1">T1 (пик)</label>
        <input
          id="electricity_t1"
          name="electricity_t1"
          type="number"
          step="0.001"
          min={data.lastMetric.electricityT1}
          value={data.lastMetric.electricityT1}
          class="receipt-input"
          required
        />
      </div>

      <div class="report-field">
        <label class="report-label" for="electricity_t2">T2 (ночь)</label>
        <input
          id="electricity_t2"
          name="electricity_t2"
          type="number"
          step="0.001"
          min={data.lastMetric.electricityT2}
          value={data.lastMetric.electricityT2}
          class="receipt-input"
          required
        />
      </div>

      <div class="report-field">
        <label class="report-label" for="electricity_t3">T3 (полупик)</label>
        <input
          id="electricity_t3"
          name="electricity_t3"
          type="number"
          step="0.001"
          min={data.lastMetric.electricityT3}
          value={data.lastMetric.electricityT3}
          class="receipt-input"
          required
        />
      </div>

      <div class="report-field">
        <label class="report-label" for="water_cold">Холодная вода</label>
        <input
          id="water_cold"
          name="water_cold"
          type="number"
          step="0.001"
          min={data.lastMetric.waterCold}
          value={data.lastMetric.waterCold}
          class="receipt-input"
          required
        />
      </div>

      <div class="report-field">
        <label class="report-label" for="water_hot">Горячая вода</label>
        <input
          id="water_hot"
          name="water_hot"
          type="number"
          step="0.001"
          min={data.lastMetric.waterHot}
          value={data.lastMetric.waterHot}
          class="receipt-input"
          required
        />
      </div>

      <div class="report-field report-field-full">
        <label class="report-label" for="token">
          <Icon name="lock" size={14} />
          Токен пересчёта
        </label>
        <input
          id="token"
          name="token"
          type="password"
          class="receipt-input"
          placeholder="Введите токен..."
          required
        />
      </div>
    </div>

    <button type="submit" class="receipt-btn" disabled={loading}>
      {loading ? 'Сохраняем...' : 'Сохранить и пересчитать'}
    </button>
  </form>

  {#if result}
    <hr class="receipt-divider" />
    <div class="report-result" class:success={result.success} class:error={!result.success}>
      {#if result.success}
        <p>{result.message}</p>
      {:else}
        <p>{result.error}</p>
      {/if}
    </div>
  {/if}
</Receipt>

<style>
  .report-grid {
    display: grid;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  .report-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .report-field-full {
    grid-column: 1 / -1;
  }

  .report-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-light);
  }

  .report-result {
    padding: var(--spacing-sm);
    font-size: 12px;
    text-align: center;
  }

  .report-result.success {
    border: 1px solid #6a8a6a;
    color: #4a6a4a;
    background: #f0f5f0;
  }

  .report-result.error {
    border: 1px solid #8a6a6a;
    color: #6a4a4a;
    background: #f5f0f0;
  }

  .report-result p {
    margin: 0;
  }

  @media (min-width: 480px) {
    .report-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
