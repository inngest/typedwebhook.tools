<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import state, { connect } from '$lib/stores';
  import url from '$lib/url';
  import RequestList from '$lib/RequestList.svelte';
  import RequestData from '$lib/RequestData/RequestData.svelte';
  import WebhookURL from '$lib/WebhookURL.svelte';

  onMount(async () => {
    if (!$state.id) {
      connect();
    }
  });

  $: index = parseInt($url?.pathname?.replace('/', ''), 10);
  $: data = $state.requests[$state.requests.length - index] || {};
</script>

<svelte:head>
  <title>Typed Webhook Testing: a tool to test webhooks and type payloads</title>
</svelte:head>

<RequestList items={$state.requests} />
<main>
  <WebhookURL path={$state.url} />
  <RequestData headers={data.headers} body={data.body} />
</main>

<style>
  h2 {
    font-size: 1.3rem;
  }

  h2 + p {
    opacity: 0.6;
    font-size: 0.8rem;
  }

  h2 + p code {
    display: inline-block;
    margin: 0 4px;
    border: 1px solid #eee;
    padding: 0 8px;
  }
</style>
