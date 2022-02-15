<script lang="ts">
	import { JsonView } from '@zerodevx/svelte-json-view'
  import * as wasm from '$lib/wasm'

  export let body = '';

  // Initialize wasm
  const promise = wasm.init(() => {
    const cue = fromJSON(body);
    const ts = toTS("#Event: " + cue);

    let schema = "{}";
    const schemas = toJSONSchema("#Event: " + cue);
    if (schemas.indexOf("error") === -1) {
      schema = JSON.parse(schemas).All.Event
    }

    return { cue, ts, schema };
  });

  console.log(promise);
</script>

<div class="wrapper">
  {#await promise}
    <p>Generating types...</p>
  {:then result}
    <div>
      <span>Typescript</span>
      <div class="type">
        <pre><code>{result.ts}</code></pre>
      </div>
    </div>
    <div>
      <span>Cue type</span>
      <div class="type">
        <pre><code>{result.cue}</code></pre>
      </div>
    </div>
    <div>
      <span>JSON Schema</span>
      <div class="type">
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

  .wrapper, pre {
    font-size: .8rem;
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
    font-size: .7rem;
    margin: .5rem 0 .35rem;
  }

</style>
