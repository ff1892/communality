<script lang="ts">
  let { label, value }: { label: string; value: string | number } = $props();
</script>

<div class="receipt-row">
  <span class="receipt-row-label">{label}</span>
  <span class="receipt-row-value">{value}</span>
</div>
