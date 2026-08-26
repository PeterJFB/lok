<script lang="ts">
  import StickyReactive from '$lib/components/Avatar/StickyReactive.svelte';
  import Card from '$lib/components/Container/Card.svelte';
  import CopyInput from '$lib/components/Form/CopyInput.svelte';
</script>

<section class="content">
  <Card>
    <section>
      <CopyInput text="tsetsfqwdkøaodwkawd" />
    </section>
  </Card>
  <Card>
    <StickyReactive height={10} />
    <StickyReactive height={20} />
    <StickyReactive height={40} />
    <StickyReactive height={50} />
    <StickyReactive height={60} />
    <StickyReactive height={70} />
    <StickyReactive height={80} />
    <StickyReactive height={90} />
    <StickyReactive height={100} />
  </Card>
</section>

<style type="scss">
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    height: 100%;
    width: 100%;
  }
</style>
