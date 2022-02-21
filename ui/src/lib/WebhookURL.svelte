<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast';
  import url from '$lib/url';
  import state from '$lib/stores';

  export let path = '';

  $: link = `${$url?.origin || ''}${path}`;

  const onclick = async () => {
    try {
      await navigator?.clipboard?.writeText(link);
      toast.push('URL copied to clipboard');
    } catch (e) {}
  };
</script>

{#if link === ''}
  <div>
    <p>Generating a fresh, unique webhook URL for you.</p>
    <code>A new webhook testing URL is being created for you...</code>
  </div>
{:else}
  <div on:click={onclick}>
    <p>Your unique webhook URL is (click to copy):</p>
    <code class="url">{link}</code>
  </div>
{/if}

<style>
  div {
    padding: 1.5rem;
    margin: 0 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    background-image: linear-gradient(
      135deg,
      var(--bg-color) 12.5%,
      var(--main-bg) 12.5%,
      var(--main-bg) 50%,
      var(--bg-color) 50%,
      var(--bg-color) 62.5%,
      var(--main-bg) 62.5%,
      var(--main-bg) 100%
    );
    background-size: 5.66px 5.66px;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  div:hover code {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  code {
    display: inline-block;
    margin: 0.5rem 4px 0;
    /* border: 1px solid #eee; */
    padding: 4px 12px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 3px;
    background: var(--bg-color);
    transition: all 0.3s;
  }

  .url {
    background: var(--primary-color);
    color: var(--color-white);
  }
</style>
