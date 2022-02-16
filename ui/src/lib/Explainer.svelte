<script>
  import url from '$lib/url'

  export let path = "";
  $: link = `${$url?.origin || ""}${path}`;

  let now = new Date();
  let at = now.toISOString();
  let ts = now.valueOf();

  const data = {
    name: "Test event",
    data: {
      id: "1",
      name: "Tester McTestFace",
      by: "Inngest",
      at,
    },
    user: {
      email: "tester@example.com",
    },
    ts,
  }
</script>

<hgroup>
  <h1>Typed webhook testing</h1>
  <h2>A webhook testing tool for checking payloads, with automatic type generation</h2>
</hgroup>
<div class="explainer">
  <p>Any requests sent to this URL will be logged instantly for <strong>testing webhooks and HTTP requests</strong>.  You can inspect the request headers and body, and <strong>automatically generate typescript types</strong>, cue schemas, and a JSON schema for the body.</p>
  {#if link === ""}
    <p>When you send your first webhook we'll show your data here.</p>
  {:else}
    <p>When you send your first webhook we'll show your data here. Get started now:</p>
    <code class="pre">curl {link} -X POST --data '{JSON.stringify(data)}'</code>
  {/if}
</div>

<style>
  hgroup {
    text-align: center;
    padding: 3rem 0 2rem;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: normal;
    font-family: var(--font);
    opacity: .65;
  }

  .explainer {
    margin: 0 auto;
    text-align: center;
    padding: 0 0 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    max-width: 70%;
  }

  .explainer p {
    max-width: 50rem;
    text-align: center;
  }

  code {
    font-size: .9rem;
  }

  .explainer strong {
    font-weight: 600;
  }

  p + p {
    margin: 1rem 0;
  }
</style>
