<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import '$lib/styles/normalize.css';
  import '$lib/styles/global.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Коммунальные услуги</title>
</svelte:head>

{@render children()}
