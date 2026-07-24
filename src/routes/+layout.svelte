<script lang="ts">
  import '$lib/styles/normalize.css';
  import '$lib/styles/global.css';
  import Header from '$lib/components/Header.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <title>Коммунальные услуги</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<Header />

<div class="page-wrapper">
  {@render children()}
</div>
