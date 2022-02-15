<script lang="ts">
	import Tabs from '$lib/Tabs.svelte';
/*
type Request struct {
        Method string `json:"method"`
        // Path represents the path that was hit.
        Path string `json:"path"`
        // Data represents the data sent in the request body
        Data []byte `json:"data"`
        // Size is the length of the HTTP request body.
        Size int `json:"size"`
        // Protocol is the HTTP protocol used, eg. HTTP/1.0 or HTTP/2
        Protocol string `json:"protocol"`
        // Headers represent all headers sent within the request
        Headers http.Header `json:"headers"`
        // QueryParams represent any query params included in the request URI
        QueryParams url.Values `json:"queryParams"`
        // FormValues represents any decoded form values sent wihtin the request
        FormValues url.Values `json:"formValues"`
        // Cookies stores all cookies received alongisde the request
        Cookies []*http.Cookie `json:"cookies"`
        // IP stores the origin IP
        IP string `json:"ip"`
        // Time stores at time in which the request was received
        Time time.Time `json:"time"`
}
 */

  export let method = 'POST';
  export let body = '';
  export let size = -1;
  export let headers = {};
  export let time = '';

  // Extract all headers from 
  const headerKeys = Object.keys(headers).sort((a, b) => a.localeCompare(b));

  const [json, isJSON] = (() => {
    try {
      return [JSON.parse(body), true];
    } catch(e) {
      return [undefined, false];
    };
  })(body);

  if (size === -1) {
    size = body.length;
  }
</script>

<div class="request-data">
  <h2>Request data</h2>
  <p>Request received at 9:38am from <code>10.123.18.199</code></p>

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
      tabs={[
        { label: "Body", href: "#body", onClick: () => {} },
        { label: "JSON", href: "#json", onClick: () => {} },
        { label: "Types", href: "#types", onClick: () => {} },
      ]}
    />
    <pre><code>{body}</code></pre>
  </div>
</div>

<style>
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
  }

  .header-name {
    /* We use this instead of grid gap so that the border extends across the row */
    padding-right: 40px !important
  }

  .header-table .th {
    border-bottom: 1px solid #eee;
    margin-bottom: .25rem;
    opacity: .5;
  }

  pre {
    margin-top: 2rem;
  }
</style>
