<script lang="ts">
  import { randomInt, seededRandomInt } from '$lib/std/random';

  const { height = 100 }: { height: number } = $props();

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

  let HEAD = $derived([
    randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width),
    randomInt(0.5 * 0.5 * height + 5, 0.5 * 0.5 * height)
  ]);
  let NECK = $derived([randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width), 0.5 * height]);

  let LARM = $derived([
    randomInt(margin, 0.5 * width - margin),
    randomInt(0.5 * height, 0.7 * height)
  ]);
  let RARM = $derived([
    randomInt(0.5 * width + margin, width - margin),
    randomInt(0.5 * height, 0.7 * height)
  ]);

  let BOTTOM = $derived([
    randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width),
    randomInt(0.7 * height, 0.75 * height)
  ]);

  let LLEG = $derived([
    randomInt(margin, 0.5 * width - margin),
    randomInt(0.75 * height, height - margin)
  ]);
  let RLEG = $derived([
    randomInt(0.5 * width + margin, width - margin),
    randomInt(0.75 * height, height - margin)
  ]);

  const regenerate = () => {
    const randomInt = seededRandomInt(Math.floor(Math.random() * 10000));

    HEAD = [
      randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width),
      randomInt(0.5 * 0.5 * height + 5, 0.5 * 0.5 * height)
    ];
    NECK = [randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width), 0.5 * height];

    LARM = [randomInt(margin, width - margin), randomInt(0.5 * height, 0.75 * height)];
    RARM = [randomInt(margin, width - margin), randomInt(0.5 * height, 0.75 * height)];

    BOTTOM = [
      randomInt(width / 2 - 0.2 * width, width / 2 + 0.2 * width),
      randomInt(0.7 * height, 0.75 * height)
    ];

    LLEG = [randomInt(margin, 0.5 * width - margin), randomInt(0.75 * height, height - margin)];
    RLEG = [
      randomInt(0.5 * width + margin, width - margin),
      randomInt(0.75 * height, height - margin)
    ];
  };
</script>

<!-- <button onclick={regenerate}> regen </button> -->

<div style="width: {width}; height: {height}; position: relative;">
  <div
    class="name"
    style="top: {HEAD[y]}px; left: {HEAD[x]}px; font-size: {width / 2 - 0.1 * width}px"
  >
    Xx
  </div>
  <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M{BOTTOM[x]} {BOTTOM[y]}L{LLEG[x]} {LLEG[y]}M{BOTTOM[x]} {BOTTOM[y]}L{RLEG[x]} {RLEG[
        y
      ]}M{BOTTOM[x]} {BOTTOM[y]}L{NECK[x]} {NECK[y]}M{NECK[x]} {NECK[y]}L{LARM[x]} {LARM[y]}M{NECK[
        x
      ]} {NECK[y]}L{RARM[x]} {RARM[y]}"
      stroke-width={thickness}
      stroke-linecap="round"
    />
    <circle cx={HEAD[x]} cy={HEAD[y]} r={width / 2 - 0.1 * width} />
  </svg>
</div>

<style type="scss">
  path {
    transition: d 0.4s ease;
    stroke: var(--primary-color);
  }
  circle {
    fill: var(--primary-color);
    transition: all 0.4s ease;
  }
  .name {
    position: absolute;
    font-family: serif, 'YoungSerif';
    color: var(--secondary-color);
    transform: translate(-50%, -50%);
  }
</style>
