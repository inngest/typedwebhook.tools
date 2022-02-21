<script lang="ts">
  import { afterUpdate } from 'svelte';
  import url from '$lib/url';
  import Loading from '$lib/Loading.svelte';
  import { goto } from '$app/navigation';

  export let items = [];

  $: index = parseInt($url?.pathname?.replace('/', ''), 10);

  const onclick = (e) => {
    const data = e.target.getAttribute('data-n');
    e.preventDefault();
    goto('/' + data + $url?.hash);
  };

  afterUpdate(() => {
    // If we only have one request, select it.
    if (items.length === 0 && $url.pathname !== '/') {
      goto('/');
    }
    if (items.length === 1 && $url.pathname !== '/1') {
      goto('/1');
    }
  });
</script>

<div>
  {#if items.length === 0}
    <Loading text="Waiting for requests..." />
  {:else}
    <h2>Incoming requests</h2>
    <ol>
      {#each items as item, n}
        <li class:active={items.length - n === index}>
          <a href="/{items.length - n}" on:click={onclick} data-n={items.length - n}>
            <span class="request-timestamp"
              >#{items.length - n} {new Date(item.ts).toLocaleString().split(', ')[1] || ''}</span
            >
            <span class="tag">{item.method}</span>
          </a>
        </li>
      {/each}
    </ol>
  {/if}
</div>

<style>
  h2 {
    font-size: 0.7rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0.75rem 1rem;
    color: var(--text-color-light);
    font-weight: 600;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    font-size: 0.8rem;
    width: 100%;
    padding: 1rem;
    background: transparent;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
    text-decoration: none;

    transition: all 0.2s;

    border: 0 none;
  }

  a:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  li.active a {
    background: rgba(255, 255, 255, 0.15);
    font-weight: bold;
  }
  /* @media (prefers-color-scheme: light) {
    a:hover {
      background: rgba(0, 0, 0, 0.03);
    }
    li.active a {
      background: rgba(0, 0, 0, 0.03);
    }
  } */

  .request-timestamp {
    text-decoration: underline;
  }

  .tag {
    font-family: var(--font-mono);
    border: 1px solid #ddd;
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
  }
</style>
