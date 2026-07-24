<script lang="ts">
  let { label, cost } = $props();
</script>

<li class="receipt-row">
  <span class="receipt-row-label">{label}</span>
  <span class="receipt-row-value">{cost.toFixed(2)} P</span>
</li>
