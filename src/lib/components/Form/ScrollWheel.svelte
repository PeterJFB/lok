<script lang="ts">
  import { onMount } from 'svelte';

  let {
    ariaControls,
    value = $bindable(0),
    optionSnippet = defaultOption
  }: {
    /**  */
    ariaControls: string;
    value: number;
    /**
     * Rendered component inside each scrollwheen option
     * @param i
     */
    optionSnippet: (i: number) => ReturnType<import('svelte').Snippet>;
  } = $props();

  // Prerender initial values
  let options = $state([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
  const optionSize = 20;
  const visible = 5;
  const pad = 3;

  // Actions
  const increment = () => {
    if (value >= options[options.length - 1] - pad) {
      options = [...options, options[options.length - 1] + 1];
    }
    value += 1;
  };

  const decrement = () => {
    if (value < options[0] + pad) {
      options = [options[0] - 1, ...options];
    }
    value -= 1;
  };

  const jumpTo = (newValue: number) => {
    while (newValue >= options[options.length - 1] - pad) {
      options = [...options, options[options.length - 1] + 1];
    }

    while (newValue < options[0] + pad) {
      options = [options[0] - 1, ...options];
    }
    value = newValue;
  };

  // Key handles
  const keydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      increment();
    }
    if (event.key === 'ArrowDown') {
      decrement();
    }
  };

  // Drag handles
  let startY = $state<number | null>(null);
  let startValue = $state(0);
  let isDragging = $state(false);
  const startDrag = (event: MouseEvent | TouchEvent) => {
    startY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    startValue = value;
  };
  const mouseMove = (event: MouseEvent | TouchEvent) => {
    if (startY === null) {
      return;
    }
    isDragging = true;
    const distance =
      (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - startY;
    let newValue = startValue + Math.round(distance / optionSize);
    if (value != newValue) {
      jumpTo(newValue);
    }
  };
  const stopDrag = async () => {
    setTimeout(() => {
      isDragging = false;
      startY = null;
    }, 100);
  };

  onMount(() => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', mouseMove);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', mouseMove);
      window.removeEventListener('touchend', stopDrag);
    };
  });
</script>

{#snippet defaultOption(i: number)}
  <span>{i}</span>
{/snippet}

<div
  tabindex="0"
  role="scrollbar"
  aria-controls={ariaControls}
  aria-valuenow={value}
  onkeydown={keydown}
  class="scroll"
  style="height: {visible * optionSize}px;"
  onmousedown={startDrag}
  ontouchstart={startDrag}
>
  <div
    class="scroll-options"
    style="top: {(-options.length + options.indexOf(value) + Math.ceil(visible / 2)) *
      optionSize}px; height: {options.length * optionSize}px; {options.indexOf(value) >=
    options.length - 2 - pad
      ? 'transition: height 0.3s ease, top 0.3s ease;'
      : 'transition: top 0.3s ease;'}"
  >
    {#each options as option (option)}
      <!-- svelte-ignore a11y_interactive_supports_focus -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <span
        style="height: {optionSize}px; width: 100%; opacity: {Math.max(
          100 - Math.abs(value - option) * 20,
          50
        )}%; transition: opacity 0.3s ease;"
        role="button"
        onclick={() => {
          if (!isDragging) {
            jumpTo(option);
          }
        }}>{@render optionSnippet(option)}</span
      >
    {/each}
  </div>
  <div class="selected-outline" style="height: {optionSize}px;"></div>
</div>

<style type="scss">
  .scroll {
    min-height: 100px;
    min-width: 39px;
    position: relative;
    overflow: hidden;
    user-select: none;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-3);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    &:focus-visible {
      outline: 3px solid var(--focus);
    }

    & .scroll-options {
      position: absolute;
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
    }
  }
  .selected-outline {
    outline: 3px solid var(--focus);
    user-select: none;
    pointer-events: none;
    width: 100%;
    z-index: 10;
    position: relative;
  }
</style>
