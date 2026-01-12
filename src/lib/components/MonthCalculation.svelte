<script lang="ts">
  let { label, newerMetric, olderMetric, diff, rate, cost } = $props();
</script>

<li>
  <span class="label">{label}</span>
  <div class="calculation">
    <span>{newerMetric} - {olderMetric} = </span>
    <span class="diff">{diff}</span>

    <span>
      × {rate.toFixed(2)} = {cost.toFixed(2)} ₽
    </span>
  </div>
</li>

<style>
  li {
    margin-bottom: 0.5rem;
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
  }

  .label {
    min-width: 140px;
    font-weight: 600;
  }

  .diff {
    font-weight: 600;
  }

  /* span {
    margin-right: 1rem;
  }
  span:last-child {
    margin-right: 0;
  } */
</style>
