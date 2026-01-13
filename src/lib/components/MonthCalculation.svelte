<script lang="ts">
  let { label, newerMetric, olderMetric, diff, rate, cost } = $props();
</script>

<li class="calculation-item">
  <span class="label">{label}</span>
  <div>
    <span>Разница: {newerMetric} - {olderMetric} = </span>
    <span class="diff">{diff}</span>
  </div>
  <div>
    <span>
      Расчёт: {diff} * {rate.toFixed(2)} ₽ = <b>{cost.toFixed(2)} ₽</b>
    </span>
  </div>
</li>

<style>
  .calculation-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 1rem;
  }

  .label {
    font-weight: 600;
  }
</style>
