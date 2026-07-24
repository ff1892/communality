<script lang="ts">
  let {
    dates,
    selected,
    onchange,
  }: {
    dates: string[];
    selected: string;
    onchange: (date: string) => void;
  } = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onchange(target.value);
  }
</script>

<select class="receipt-select" value={selected} onchange={handleChange}>
  {#each dates as date (date)}
    <option value={date}>{date}</option>
  {/each}
</select>
