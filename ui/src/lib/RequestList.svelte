<script lang="ts">
  import Loading from "$lib/Loading.svelte";
  let items = [];
</script>

<div>
  {#if items.length === 0}
    <Loading text="Waiting for requests..." />
  {:else}
    <h2>Incoming requests</h2>
    <ol>
      <li>
        <button>
          <span>#4 9:38:15am</span>
          <span class="tag">POST</span>
        </button>
      </li>

      <li class="active">
        <button>
          <span>#3 9:38:15am</span>
          <span class="tag">POST</span>
        </button>
      </li>

      <li>
        <button>
          <span>#2 9:38:15am</span>
          <span class="tag">POST</span>
        </button>
      </li>

      <li>
        <button>
          <span>#1 9:38:15am</span>
          <span class="tag">POST</span>
        </button>
      </li>

      {#each items as item}
        <li>
        </li>
      {/each}

    </ol>
  {/if}
</div>

<style>

  h2 {
    font-size: .7rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: .75rem 1rem;
    opacity: .4;
    font-weight: 600;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
  }

  button {
    font-size: .9rem;
    width: 100%;
    padding: 1rem;
    background: transparent;
    text-align: left;
    display: flex;
    justify-content: space-between;

    transition: all .2s;

    border: 0 none;
  }

  button:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  li.active button {
    background: rgba(0, 0, 0, 0.06);
    font-weight: bold;
  }

  li:last-of-type button {
  }

  .tag {
    font-family: var(--font-mono);
  }
</style>
