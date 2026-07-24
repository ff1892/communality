<script lang="ts">
  let { label, newerMetric, olderMetric, diff, rate, cost } = $props();
</script>

<li class="calc-item">
  <div class="calc-label">{label}</div>
  <div class="calc-detail">
    {newerMetric} - {olderMetric} = {diff}
  </div>
  <div class="calc-detail">
    {diff} x {rate.toFixed(2)} = <span class="calc-cost">{cost.toFixed(2)} P</span>
  </div>
</li>

<style>
  .calc-item {
    padding: 5px 0;
    border-bottom: 1px dashed var(--color-border-dashed);
  }

  .calc-item:last-child {
    border-bottom: none;
  }

  .calc-label {
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .calc-detail {
    color: var(--color-text-light);
    font-size: 14px;
  }

  .calc-cost {
    font-weight: 700;
    color: var(--color-text);
  }
</style>
