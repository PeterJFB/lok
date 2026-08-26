<script lang="ts">
  import StickyReactive from '$lib/components/Avatar/StickyReactive.svelte';
  import { randomInt } from '$lib/std/random';
  import { onDestroy, onMount } from 'svelte';

  const randomPose = () => randomInt(1, 100000);
  let pose = $state([randomPose(), randomPose(), randomPose()] as const);
  let poseInterval = $state<ReturnType<typeof setInterval> | null>(null);
  onMount(() => {
    poseInterval = setInterval(() => {
      pose = [randomPose(), randomPose(), randomPose()];
    }, 2000);
  });
  onDestroy(() => {
    if (poseInterval) {
      clearInterval(poseInterval);
    }
  });
</script>

<section class="center">
  <div class="people">
    <StickyReactive seed={pose[0]} height={80} />
    <StickyReactive seed={pose[1]} height={80} />
    <StickyReactive seed={pose[2]} height={80} />
  </div>
  <h1>Time to lok ...</h1>
  <p>When should we meet up?</p>
</section>

<style type="scss">
  .people {
    display: flex;
    gap: var(--flex-gap-2);
  }
  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-family: 'YoungSerif';
  }
</style>
