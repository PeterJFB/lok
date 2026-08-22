<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { isPWA } from '$lib/pwa';
  import { onMount } from 'svelte';

  const logMountInfo = () => {
    console.debug(`
------------------------------
Mount Info:
- PWA: ${isPWA()}
------------------------------`);
  };

  let { children, data } = $props();

  onMount(() => {
    logMountInfo();
  });

  onMount(() => {});
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window />

{#if data.user || data.anonymous}
  {@render children()}
{/if}
