<script lang="ts">
	import type { LokAsWeek } from '$lib/lok';
	import Week from './Week.svelte';
	import { generateLokWeek } from '$lib/lok.helper';

	const allWeekData: LokAsWeek[] = [
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek(),
		generateLokWeek()
	];
</script>

{#each allWeekData as weekData}
	<Week {weekData} />
{/each}
