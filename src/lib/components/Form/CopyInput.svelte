<script lang="ts">
  const { text }: { text: string } = $props();
</script>

<div class="copy-input">
  <div>{text}</div>
  <button class="copy-button">Copy</button>
</div>

<style type="scss">
  .copy-input {
    display: flex;
    align-items: center;
    gap: var(--flex-gap-3);

    padding: var(--padding-3);

    border-radius: var(--border-radius-2);
    border: 1px solid var(--text-muted);
    overflow: hidden;
  }
</style>
