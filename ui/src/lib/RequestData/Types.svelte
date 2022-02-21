<script lang="ts">
  import { onMount } from 'svelte';
  import { JsonView } from '@zerodevx/svelte-json-view';
  import { toast } from '@zerodevx/svelte-toast';
  import * as wasm from '$lib/wasm';

  export let body = '';

  $: promise = wasm.init(() => {
    const cue = fromJSON(body);
    const ts = toTS('#Event: ' + cue);

    let schema = '{}';
    const schemas = toJSONSchema('#Event: ' + cue);
    if (schemas.indexOf('error') === -1) {
      schema = JSON.parse(schemas).All.Event;
    }

    return { cue, ts, schema };
  });

  const copy = async (e) => {
    try {
      await navigator?.clipboard?.writeText(e.target.innerText);
      toast.push('Type copied to clipboard');
    } catch (e) {}
  };
</script>

<div class="wrapper">
  {#await promise}
    <p>Generating types...</p>
  {:then result}
    <div>
      <span>Typescript</span>
      <div class="type" on:click={copy}>
        <pre><code>{result.ts}</code></pre>
      </div>
    </div>
    <div>
      <span><a href="https://cuelang.org/" target="_blank">Cue type</a></span>
      <div class="type" on:click={copy}>
        <pre><code>{result.cue}</code></pre>
      </div>
    </div>
    <div>
      <span>JSON Schema</span>
      <div class="type" on:click={copy}>
        <JsonView json={result.schema} />
      </div>
    </div>
  {/await}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .wrapper .type {
    background: rgba(0, 0, 0, 0.03);
    padding: 1rem;
    align-self: stretch;
    height: 100%;
  }

  .wrapper div + div .type {
    border-left: 1px solid #ddd;
  }

  .wrapper,
  pre {
    font-size: 0.8rem;
  }

  pre {
    background: transparent;
    margin-top: 2rem;
    margin: 0;
    border-radius: 0;
    border: 0 none;
  }

  .wrapper > div > span {
    display: block;
    text-transform: uppercase;
    font-size: 0.7rem;
    margin: 0.5rem 0 0.35rem;
  }
</style>
