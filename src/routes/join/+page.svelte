<script lang="ts">
	import { sleep } from '$lib/time';
	import { onMount } from 'svelte';

	let installHidden = $state(true);
	onMount(async () => {
		// Wait a stupid tiny amount since dev and production register events at
		// different timings. If this is changed, verify dev AND prod.
		await sleep(100);

		if (window.installPrompt) {
			console.debug('PWA installPrompt received');
			installHidden = false;
		} else {
			console.debug('PWA installPrompt not received');
		}

		window.addEventListener('appinstalled', () => {
			console.debug('Received `appinstalled` event');
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
