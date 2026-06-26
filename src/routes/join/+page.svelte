<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let installHidden = $state(true);
	onMount(() => {
		if (window.installPrompt) {
			installHidden = false;
		}
		window.addEventListener('appinstalled', () => {
			installHidden = true;
		});
	});

	const onInstallClicked = async () => {
		if (!window.installPrompt) {
			return;
		}
		const result = await window.installPrompt.prompt();
		console.log(`Install prompt was:`, result.outcome);
	};
</script>

Weeee

<button id="install" hidden={installHidden} onclick={onInstallClicked}>Install</button>

<a href="web+lokjoin://safdasdfasd" target="_blank" rel="noopener noreferrer">JUMP</a>
