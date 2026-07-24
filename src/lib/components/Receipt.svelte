<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, subtitle, children }: { title: string; subtitle?: string; children: Snippet } =
    $props();
</script>

<div class="receipt">
  <h1 class="receipt-title">{title}</h1>
  {#if subtitle}
    <p class="receipt-subtitle">{subtitle}</p>
  {/if}
  <hr class="receipt-divider" />
  {@render children()}
</div>
