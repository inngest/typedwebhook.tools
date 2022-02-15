<script lang="ts">
	import { JsonView } from '@zerodevx/svelte-json-view'
	import Tabs from '$lib/Tabs.svelte';
	import Types from './Types.svelte';
  import url from '$lib/url'
  import * as wasm from '$lib/wasm'

  export let preview = false;
  export let method = 'POST';
  export let body = '';
  export let size = -1;
  export let headers = {};
  export let time = '';

  // Which view we have enabled, based off of the hash.
  let currentView = $url?.hash || '#body';

  wasm.init();

  // Extract all headers from 
  const headerKeys = Object.keys(headers).sort((a, b) => a.localeCompare(b));

  const [json, isJSON] = (() => {
    try {
      return [JSON.parse(body), true];
    } catch(e) {
      console.log(body, e);
      return [undefined, false];
    };
  })(body);

  if (size === -1) {
    size = body.length;
  }
</script>

<div class="request-data" class:preview={preview}>
  <h2>Request data</h2>
  {#if preview}
    <p>Waiting for your first request...</p>
  {:else}
    <p>Request received at 9:38am from <code>10.123.18.199</code></p>
  {/if}

  <div class="header-table">
    <div class="th">Header</div>
    <div class="th">Value</div>
    {#each headerKeys as header}
      <div class="header-name">{header}</div>
      <div>{headers[header]}</div>
    {/each}
  </div>

  <div class="body">
    <Tabs
      current={$url?.hash || "#body"}
      tabs={[
        { label: "Body", href: "#body", onClick: () => {} },
        { label: "JSON", href: "#json", onClick: () => {} },
        { label: "Types", href: "#types", onClick: () => {} },
      ]}
    />

    {#if ($url?.hash || "#body") === "#body"}
      <code class="pre">{body || "No data"}</code>
    {/if}

    {#if $url?.hash === "#json"}
      {#if !isJSON}
        <p class="no-json">This request is not valid JSON 😢</p>
      {:else}
        <div class="json">
          <JsonView {json} />
        </div>
      {/if}
    {/if}

    {#if $url?.hash === "#types"}
      {#if !isJSON}
        <p class="no-json">This request is not valid JSON, so we can't make types for this body 😢</p>
      {:else}
        <div class="json">
          <Types {body} />
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .preview {
    opacity: .6;
  }

  .request-data {
		padding: 1.5rem 5rem;
    background: #fff;
  }

  .header-table {
    display: grid;
    grid-template-columns: auto 3fr;
    grid-template-rows: auto;
    margin: 2rem 0 2rem;
    font-family: var(--font-mono);
    position: relative;
  }

  .header-table:before, .body:before {
    font-family: var(--font-mono);
    display: block;
    position: absolute;
    left: -67px;
    top: 8px;
    font-size: .65rem;
    text-transform: uppercase;
    opacity: .3;
  }

  .body {
    position: relative;
  }

  .header-table:before {
    content: "Headers";
  }

  .body:before {
    content: "Body";
    top: 10px;
  }

  .header-table div {
    padding: .35rem 0;
    border-bottom: 1px solid #f6f6f6;
    display: flex;
    align-items: center;
  }

  .header-name {
    /* We use this instead of grid gap so that the border extends across the row */
    padding-right: 40px !important;
    font-family: var(--font);
    font-size: .75rem;
    opacity: .8;
  }

  .header-table .th {
    border-bottom: 1px solid #eee;
    margin-bottom: .25rem;
    opacity: .5;
  }

  .body code {
    display: block;
    margin-top: 2rem;
  }

  .json {
    font-family: var(--font-mono);
    padding: 1rem 0;
  }

  .th:first-of-type {
    min-width: 120px;
  }

  .no-json {
    margin: 2rem 0;
    text-align: center;
  }
</style>
