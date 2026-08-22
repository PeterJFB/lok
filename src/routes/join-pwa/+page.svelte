<script lang="ts">
  import Card from '$lib/components/Container/Card.svelte';
  import CopyInput from '$lib/components/Form/CopyInput.svelte';
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

<section class="content">
  <h1>Time to lok ...</h1>
  <Card>
    <section class="install-instruction">
      first
      <CopyInput text="tsetsfqwdkøaodwkawd" />

      then
      <button onclick={onInstallClicked}>Install as App</button>
    </section>
  </Card>
</section>

<button id="install" hidden={installHidden} onclick={onInstallClicked}>Install</button>

<a href="web+lokjoin://safdasdfasd" target="_blank" rel="noopener noreferrer">JUMP</a>

<style type="scss">
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }

  .install-instruction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--flex-gap-4);

    height: 100%;
    width: 100%;
  }
</style>
