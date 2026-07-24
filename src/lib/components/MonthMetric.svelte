<script lang="ts">
  let { label, monthMetric } = $props();
</script>

<li class="receipt-row">
  <span class="receipt-row-label">{label}</span>
  <span class="receipt-row-value">{monthMetric}</span>
</li>
