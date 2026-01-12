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
    flex-direction: column;
    align-items: center;

    padding: 0.5rem;
    border: 1px solid rgb(172, 172, 172);
    min-height: 5rem;
    corner-shape: squircle;
    border-radius: 20px;
  }

  .label {
    font-size: 0.9rem;
  }

  .metric {
    font-size: 1.5rem;
    font-weight: bold;
    margin-block: auto;
  }
</style>
