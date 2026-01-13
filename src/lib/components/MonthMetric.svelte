<script lang="ts">
  let { label, monthMetric } = $props();
</script>

<li>
  <span class="label">
    {label}
  </span>
  <span class="metric">
    {monthMetric}
  </span>
</li>

<style>
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label {
    font-size: 1rem;
  }

  .metric {
    font-size: 1.1rem;
    font-weight: bold;
  }
</style>
