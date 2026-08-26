<script lang="ts">
  import { page } from '$app/state';
  import { getOrCreateDeviceIdentifier } from '$lib/client/auth';
  import { stickyColor } from '$lib/components/Avatar/sticky';
  import StickyReactive from '$lib/components/Avatar/StickyReactive.svelte';
  import ColorWheel from '$lib/components/Form/ColorWheel.svelte';
  import { randomInt } from '$lib/std/random';
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();
  let url = new URL(page.url);
  const joinCode = url.searchParams.get('code');
  let name = $derived(form?.name?.value?.toString() ?? data.user?.name ?? '');
  let selectedHue = $state(0);

  const randomPose = () => randomInt(0, 1000000);
  let avatarPoses = $state([randomPose()]);
  let avatarPose = $state(0);
  let nextAvatarPose = $derived(() => {
    if (avatarPose >= avatarPoses.length - 1) {
      avatarPoses = [...avatarPoses, randomPose()];
    }
    avatarPose += 1;
  });
  let prevAvatarPose = $derived(() => {
    if (avatarPose <= 0) {
      avatarPoses = [randomPose(), ...avatarPoses];
      avatarPose = 0;
    } else {
      avatarPose -= 1;
    }
  });
</script>

<section class="content">
  <h1 class="join-heading">
    {#if data.group}
      <u>
        {data.group.name}
      </u>
    {:else}
      Someone
    {/if}
    wants you on lok ...
  </h1>
  {#if !data.group || data.expired}
    <p>But your invite link is not valid :(</p>
  {/if}
  {#if !data.expired && !!joinCode && !!data.group}
    <div class="select-avatar">
      <button onclick={prevAvatarPose}>&lt;</button>
      <StickyReactive
        seed={avatarPoses[avatarPose]}
        name={name ?? ''}
        color={stickyColor(selectedHue)}
      />
      <button onclick={nextAvatarPose}>&gt;</button>
      <ColorWheel initialHue={10} bind:selectedHue />
    </div>
    <form method="POST" action="?/register&code={joinCode}">
      <input type="text" hidden name="joinCode" id="joinCode" value={joinCode} />
      <input
        type="text"
        hidden
        name="deviceIdentifierType"
        id="deviceIdentifierType"
        value="LOCAL_STORAGE"
      />
      <input
        type="text"
        hidden
        name="deviceIdentifierValue"
        id="deviceIdentifierValue"
        value={getOrCreateDeviceIdentifier()}
      />
      <label for="name">Set a Nickname:</label>
      <input
        class="inset name"
        type="text"
        name="name"
        id="name"
        placeholder="JohnD"
        readonly={!!data.user?.name}
        bind:value={name}
      />
      <div>
        and
        <button type="submit">Jump in</button>
      </div>
    </form>
  {/if}
</section>

<style type="scss">
  .join-heading {
    text-align: center;
    font-family: 'YoungSerif', serif;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--flex-gap-7);

    height: 100%;
    width: 100%;
  }
  .name {
    width: 150px;
  }

  .select-avatar {
    display: flex;
    align-items: center;
    gap: var(--flex-gap-6);
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--flex-gap-3);
    flex-wrap: wrap;
    padding: var(--padding-1);
  }
</style>
