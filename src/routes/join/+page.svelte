<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import type { Pathname } from '$app/types';
  import Card from '$lib/components/Container/Card.svelte';
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();
  let url = new URL(page.url);
  const joinCode = url.searchParams.get('code');
</script>

<section class="content">
  <h1>Time to lok ...</h1>
  {#if !!joinCode}
    <Card>
      <form
        method="POST"
        action="?/register&code={joinCode}"
        use:enhance={() => {
          return async ({ result, update }) => {
            // 2. RUNS AFTER SERVER RESPONDS: But before the redirect happens
            if (result.type === 'redirect') {
              // Run your custom client-side code here
              await update();
              // 3. TRIGGER THE REDIRECT: Hand over control to SvelteKit's router
              await goto(resolve(result.location as Pathname));
            } else {
              // Handle success, failure, or error types normally
              await update();
            }
          };
        }}
      >
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
          value=""
        />
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="JohnD"
          disabled={!!data.user?.name}
          value={form?.name ?? data.user?.name ?? ''}
        />
        <button>JUMP IN</button>
      </form>
    </Card>
  {/if}
</section>

<style type="scss">
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }
</style>
