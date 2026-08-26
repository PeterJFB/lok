<script lang="ts">
  const size = 100;
  const thickness = 10;

  const BOTTOM = [32.0009, 43.5007];
  const NECK = [27.5009, 9.00073];
  const LLEG = [27.5009, 61.5009];
  const RLEG = [57.0009, 51.5009];
  const LARM = [5.00085, 5.00085];
  const RARM = [55.0009, 9.00073];

  const x = 0;
  const y = 1;
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 {size} {size}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
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
  <circle cx="100" cy="100" r="20" />
</svg>
