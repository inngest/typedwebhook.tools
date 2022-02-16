<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast'
  import url from '$lib/url'
  import state from '$lib/stores'

  export let path = "";

  $: link = `${$url?.origin || ""}${path}`;

  const onclick = async () => {
    try {
      await navigator?.clipboard?.writeText(link);
      toast.push('URL copied to clipboard');
    } catch(e) {
    }
  };

</script>

{#if link === ""}
  <div>
    <p>Generating a fresh, unique webhook URL for you.</p>
    <code>A new webhook testing URL is being created for you...</code>
  </div>
{:else}
  <div on:click={onclick}>
    <p>Your unique webhook URL is (click to copy):</p>
    <code class="green">{link}</code>
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

    background-image: linear-gradient(135deg, #f7f6f2 12.50%, #ffffff 12.50%, #ffffff 50%, #f7f6f2 50%, #f7f6f2 62.50%, #ffffff 62.50%, #ffffff 100%);
    background-size: 5.66px 5.66px;
  }

  div:hover code {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  p {
    opacity: 0.6;
  }

  code {
    display: inline-block;
    margin: 0.5rem 4px 0.35rem;
    border: 1px solid #eee;
    padding: 4px 12px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 3px;
    background: var(--bg-color);
    transition: all .3s;
  }
  small { opacity: .4 }
  .green {
    background: #daf4da;
  }

</style>

