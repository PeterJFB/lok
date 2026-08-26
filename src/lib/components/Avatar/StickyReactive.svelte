<script lang="ts">
  import { seededRandomInt } from '$lib/std/random';

  const {
    height = 100,
    name,
    seed = Math.floor(Math.random() * 10),
    color = 'var(--primary-color)'
  }: { height?: number; seed?: number; name?: string; color?: string } = $props();

  const x = 0;
  const y = 1;

  const width = $derived(height * 0.61);
  const thickness = $derived(height * 0.1);
  const margin = $derived(thickness / 2);

  /**
   * Horizontal Sections:
   * Head: 50px
   * Neck: 50px mark
   * Arms: 25px
   * Legs: 25px
   * Bottom: 25px
   */

  const randomInt = $derived(seededRandomInt(seed));

  const s = $derived({
    head: [
      randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width),
      randomInt(0.5 * 0.5 * height + 5, 0.5 * 0.5 * height)
    ],
    neck: [randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width), 0.5 * height],
    larm: [randomInt(margin, width - margin), randomInt(0.5 * height, 0.75 * height)],
    rarm: [randomInt(margin, width - margin), randomInt(0.5 * height, 0.75 * height)],
    bottom: [
      randomInt(width / 2 - 0.2 * width, width / 2 + 0.2 * width),
      randomInt(0.7 * height, 0.75 * height)
    ],
    lleg: [randomInt(margin, 0.5 * width - margin), randomInt(0.75 * height, height - margin)],
    rleg: [
      randomInt(0.5 * width + margin, width - margin),
      randomInt(0.75 * height, height - margin)
    ]
  });

  const letters = $derived(
    name
      ?.substring(0, 2)
      .split('')
      .map((l, i) => ({ l, i }))
  );
</script>

<!-- <button onclick={regenerate}> regen </button> -->

<div class="sticky" style="width: {width}; height: {height}; position: relative;">
  <div
    class="name"
    style="top: {s.head[y]}px; left: {s.head[x]}px; font-size: {width / 2 - 0.1 * width}px"
  >
    {#each letters as { l, i } (`${l}${i}`)}
      <span class="letter">{l}</span>
    {/each}
  </div>
  <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke={color}
      d="M{s.bottom[x]} {s.bottom[y]}L{s.lleg[x]} {s.lleg[y]}M{s.bottom[x]} {s.bottom[y]}L{s.rleg[
        x
      ]} {s.rleg[y]}M{s.bottom[x]} {s.bottom[y]}L{s.neck[x]} {s.neck[y]}M{s.neck[x]} {s.neck[y]}L{s
        .larm[x]} {s.larm[y]}M{s.neck[x]} {s.neck[y]}L{s.rarm[x]} {s.rarm[y]}"
      stroke-width={thickness}
      stroke-linecap="round"
    />
    <circle cx={s.head[x]} cy={s.head[y]} r={width / 2 - 0.1 * width} fill={color} />
  </svg>
</div>

<style type="scss">
  path {
    transition:
      d 0.4s ease,
      stroke 0.4s ease;
  }
  circle {
    transition: all 0.4s ease;
  }
  .name {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    font-family: serif, 'YoungSerif';
    transform: translate(-50%, -50%);
    transition: all 0.4s;
    & .letter {
      display: inline-block;
      transition: all 0.5s;
      animation: enter 0.2s ease-out forwards;
    }
  }

  @keyframes enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
