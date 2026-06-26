<script lang="ts">
	import Calendar from '$lib/components/Calendar/Calendar.svelte';
	import { isPWA } from '$lib/pwa';
	import { onMount } from 'svelte';

	let session: 'unknown' | 'browser' | 'pwa' = $state('unknown');

	onMount(() => {
		session = isPWA() ? 'pwa' : 'browser';

		switch (session) {
			case 'browser':
				break;
			case 'pwa':
				break;

			default:
				break;
		}
	});
</script>

{#if session === 'pwa'}
	<Calendar />
{:else if session === 'browser'}
	Install PWA
{:else}
	Loading
{/if}
