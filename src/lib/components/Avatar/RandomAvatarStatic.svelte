<script lang="ts">
  import { randomInt } from '$lib/std/random';

  const height = 100;
  const width = 61;
  const thickness = 10;
  const margin = thickness / 2;

  /**
   * Horizontal Sections:
   * Head: 50px
   * Neck: 50px mark
   * Arms: 25px
   * Legs: 25px
   * Bottom: 25px
   */

  const x = 0;
  const y = 1;

  let HEAD = [
    randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width),
    randomInt(0.5 * 0.5 * height + 5, 0.5 * 0.5 * height)
  ];
  let NECK = [randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width), 0.5 * height];

  let LARM = [randomInt(margin, 0.5 * width - margin), randomInt(0.5 * height, 0.7 * height)];
  let RARM = [
    randomInt(0.5 * width + margin, width - margin),
    randomInt(0.5 * height, 0.7 * height)
  ];

  let BOTTOM = [
    randomInt(width / 2 - 0.1 * width, width / 2 + 0.1 * width),
    randomInt(0.7 * height, 0.75 * height)
  ];

  let LLEG = [randomInt(margin, 0.5 * width - margin), randomInt(0.75 * height, height - margin)];
  let RLEG = [
    randomInt(0.5 * width + margin, width - margin),
    randomInt(0.75 * height, height - margin)
  ];
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M{BOTTOM[x]} {BOTTOM[y]}L{LLEG[x]} {LLEG[y]}M{BOTTOM[x]} {BOTTOM[y]}L{RLEG[x]} {RLEG[
      y
    ]}M{BOTTOM[x]} {BOTTOM[y]}L{NECK[x]} {NECK[y]}M{NECK[x]} {NECK[y]}L{LARM[x]} {LARM[y]}M{NECK[
      x
    ]} {NECK[y]}L{RARM[x]} {RARM[y]}"
    stroke="#D9D9D9"
    stroke-width={thickness}
    stroke-linecap="round"
  />
  <circle cx={HEAD[x]} cy={HEAD[y]} r={width / 2 - 0.1 * width} />
</svg>

<style type="scss">
  path {
    transition: d 0.4s ease;
  }
  circle {
    fill: var(--primary-color);
  }
</style>
