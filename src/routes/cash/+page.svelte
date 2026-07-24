<script lang="ts">
  import { enhance } from '$app/forms';
  import Receipt from '$lib/components/Receipt.svelte';
  import Icon from '$lib/components/Icon.svelte';

  let token = $state('');
  let result: { success?: boolean; error?: string; message?: string; processed?: number } | null =
    $state(null);
  let loading = $state(false);
</script>

<Receipt title="Пересчёт" subtitle="Обработка метрик">
  <form
    method="POST"
    action="?/process"
    use:enhance={() => {
      loading = true;
      result = null;
      return async ({ result: res, update }) => {
        loading = false;
        if (res.type === 'success' && res.data) {
          result = res.data as typeof result;
        } else {
          result = { success: false, error: 'Ошибка сервера' };
        }
        await update({ reset: false });
      };
    }}
  >
    <div class="cash-field">
      <label class="cash-label" for="token">
        <Icon name="lock" size={14} />
        Токен пересчёта
      </label>
      <input
        id="token"
        name="token"
        type="password"
        class="receipt-input"
        bind:value={token}
        placeholder="Введите токен..."
        required
      />
    </div>

    <button type="submit" class="receipt-btn" disabled={loading || !token}>
      {loading ? 'Обработка...' : 'Запустить пересчёт'}
    </button>
  </form>

  {#if result}
    <hr class="receipt-divider" />
    <div class="cash-result" class:success={result.success} class:error={!result.success}>
      {#if result.success}
        <p>{result.message}</p>
      {:else}
        <p>{result.error}</p>
      {/if}
    </div>
  {/if}
</Receipt>

<style>
  .cash-field {
    margin-bottom: var(--spacing-md);
  }

  .cash-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-light);
  }

  .cash-result {
    padding: var(--spacing-sm);
    font-size: 12px;
    text-align: center;
  }

  .cash-result.success {
    border: 1px solid #6a8a6a;
    color: #4a6a4a;
    background: #f0f5f0;
  }

  .cash-result.error {
    border: 1px solid #8a6a6a;
    color: #6a4a4a;
    background: #f5f0f0;
  }

  .cash-result p {
    margin: 0;
  }
</style>
