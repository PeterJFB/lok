<script lang="ts">
  const props = $props();
</script>

<section class="card">
  {@render props.children?.()}
</section>

<style type="scss">
  .card {
    display: flex;
    justify-content: center;
    align-items: center;

    height: fit-content;
    padding: var(--padding-5);

    background-color: var(--bg);

    border-radius: var(--border-radius-4);
    overflow: hidden;

    /* box-shadow:; */
    /* 1. Subtle ambient outer glow */
    /* 		0 10px 30px rgba(0, 0, 0, 0.5),
 */ /* 2. Top-left external rim catching light */
    /* 		 0px -1px 0px 0px rgba(255, 255, 255, 0.2),
 */ /* 3. Intense top-left internal rim highlight */
    /* 		inset 0px 1px 0px 0px	rgba(255, 255, 255, 0.1),
 */ /* 4. Deep inner shadow for contrast */
    /* 		inset -5px -5px 15px 0px rgba(0, 0, 0, 0.8);
 */
  }
</style>
