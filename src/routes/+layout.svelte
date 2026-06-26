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

	let { children } = $props();

	onMount(() => {
		logMountInfo();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window />

{@render children()}
