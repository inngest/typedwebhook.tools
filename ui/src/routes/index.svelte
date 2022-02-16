<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import state, { connect } from '$lib/stores'
  import url from '$lib/url'
	import WebhookURL from '$lib/WebhookURL.svelte';
	import RequestList from '$lib/RequestList.svelte';
	import RequestData from '$lib/RequestData/RequestData.svelte';
	import Explainer from '$lib/Explainer.svelte';

  onMount(async () => {
    connect();
  });
</script>

<svelte:head>
	<title>Typed Webhook Testing</title>
</svelte:head>

<RequestList items={$state.requests} />
<main>
  <WebhookURL path={$state.url} />
  <Explainer url={$state.url} />
  <RequestData preview={$state.requests.length === 0} />
</main>

<style>
	main {
    font-size: .85rem;
    background: #fff;
		flex: 1;
		display: flex;
		flex-direction: column;
    margin: 0 1.5rem 0 0;
    padding: 0 0 1rem;
		box-sizing: border-box;
    box-shadow: 0 0 3rem rgba(0, 0, 0, 0.04);
    border-radius: 3px;
	}

</style>
