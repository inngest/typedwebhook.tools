<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from '@zerodevx/svelte-toast';
  import Highlight from 'svelte-highlight';
  import typescript from 'svelte-highlight/src/languages/typescript';
  import json from 'svelte-highlight/src/languages/json';
  import { githubDark } from 'svelte-highlight/src/styles';

  import * as wasm from '$lib/wasm';

  export let body = '';
  // multiple allows for multiple bodies to be added, which will be merged.
  export let multiple = [];

  $: result = [];

  $: promise = wasm.init(() => {

    if (multiple.length === 1) {
      const cue = fromJSON(body);
      const ts: string = toTS('#Event: ' + cue);

      let schema = '{}';
      const schemas = toJSONSchema('#Event: ' + cue);
      if (schemas.indexOf('error') === -1) {
        schema = JSON.parse(schemas).All.Event;
      }

      return { cue, ts, schema: JSON.stringify(schema, null, '  ') };
    }

    // iterate through all cuedefs, creating definitions for each item.
    const cuedefs = multiple.map(item => {
      return fromJSON(item);
    });

    // merge all definitions together.
    const cue = cuedefs.reduce((acc, item) => {
      return merge(acc, item);
    }, cuedefs[0]);

    const ts: string = toTS('#Event: ' + cue);

    let schema = '{}';
    const schemas = toJSONSchema('#Event: ' + cue);
    if (schemas.indexOf('error') === -1) {
      schema = JSON.parse(schemas).All.Event;
    }

    return { cue, ts, schema: JSON.stringify(schema, null, '  ') };
  });

  const copy = async (e) => {
    try {
      await navigator?.clipboard?.writeText(e.target.innerText);
      toast.push('Type copied to clipboard');
    } catch (e) {}
  };
</script>

<svelte:head>
  {@html githubDark}
</svelte:head>

<div class="wrapper">
  {#await promise}
    <p>Generating types...</p>
  {:then { cue, ts, schema }}
    <div>
      <span>Typescript</span>
      <div class="type" on:click={copy}>
        <Highlight language={typescript} code={ts} />
      </div>
    </div>
    <div>
      <span><a href="https://cuelang.org/" target="_blank">Cue type</a></span>
      <div class="type" on:click={copy}>
        <Highlight language={typescript} code={cue} />
      </div>
    </div>
    <div>
      <span>JSON Schema</span>
      <div class="type" on:click={copy}>
        <Highlight language={json} code={schema} />
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
    height: calc(100% - 2rem);
  }

  .wrapper div + div .type {
    border-left: 1px solid #ddd;
  }

  a,
  a:visited {
    color: var(--text-color);
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
