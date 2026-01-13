<script lang="ts">
  let { label, cost } = $props();
</script>

<li class="category-item">
  <span class="label">{label}</span>
  <span class="cost">{cost.toFixed(2)} ₽</span>
</li>

<style>
  .category-item {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }

  .label {
    font-weight: 600;
  }

  .cost {
    font-weight: 600;
  }
</style>
