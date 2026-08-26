<script lang="ts">
  import { stickyColor } from '../Avatar/sticky';
  import ScrollWheel from './ScrollWheel.svelte';

  let {
    initialHue,
    selectedHue = $bindable(initialHue)
  }: { selectedHue: number; initialHue: number } = $props();
  let value = $state<number>(0);
  let steps = 36;

  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const hue = (i: number) => mod((i * 360) / steps + initialHue, 360);

  $effect(() => {
    selectedHue = hue(value);
  });
</script>

{#snippet colorSnippet(i: number)}
  <span style="display: flex; width: 100%; background-color: {stickyColor(hue(i))};">&nbsp;</span>
{/snippet}

<ScrollWheel ariaControls="test" bind:value optionSnippet={colorSnippet}></ScrollWheel>
