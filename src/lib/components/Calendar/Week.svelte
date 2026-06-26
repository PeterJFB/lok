<script lang="ts">
	import type { LokAsWeek } from '$lib/lok';
	import { Temporal } from '@js-temporal/polyfill';

	const { weekData }: { weekData?: LokAsWeek } = $props();
</script>

<div class="row">
	{#each weekData as dayData}
		<div class="cell">
			{dayData.day.toZonedDateTimeISO(Temporal.Now.timeZoneId()).day}
			{dayData.available.length}
		</div>
	{/each}
</div>

<style lang="scss">
	.row {
		display: flex;
		height: var(--calendar-row-height);
		gap: var(--flex-gap-3);
	}
	:global(.row) + :global(.row) {
		margin-top: var(--margin-3);
	}

	.cell {
		height: 100%;
		flex: 1;
		padding: var(--calendar-cell-padding);
		background-color: var(--secondary-color);
		border-radius: var(--border-radius-4);
		overflow: hidden;
	}
</style>
