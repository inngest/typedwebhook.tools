<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import state, { connect } from '$lib/stores';
  import url from '$lib/url';
  import WebhookURL from '$lib/WebhookURL.svelte';
  import RequestList from '$lib/RequestList.svelte';
  import RequestData from '$lib/RequestData/RequestData.svelte';
  import Explainer from '$lib/Explainer.svelte';

  onMount(async () => {
    connect();
  });
</script>

<RequestList items={$state.requests} />
<main>
  <WebhookURL path={$state.url} />
  <Explainer path={$state.url} />
  <RequestData preview={$state.requests.length === 0} />
</main>

<style>
</style>
