<script lang="ts">
	import Card from '$lib/components/Container/Card.svelte';
	import CopyInput from '$lib/components/Form/CopyInput.svelte';
</script>

<section class="content">
	<Card>
		<section>
			<CopyInput text="tsetsfqwdkøaodwkawd" />
		</section>
	</Card>
</section>

<style type="scss">
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>
