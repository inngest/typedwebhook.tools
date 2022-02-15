<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import RequestList from '$lib/RequestList.svelte';
	import RequestData from '$lib/RequestData/RequestData.svelte';
	import WebhookURL from '$lib/WebhookURL.svelte';
</script>

<svelte:head>
	<title>Typed Webhook Testing</title>
</svelte:head>

<RequestList />

<main>

  <WebhookURL uuid="fdeb8ff6-211e-40a0-b008-8579be78587f" />

  <RequestData
    headers={{
      "content-type": "application/json",
      "accept": "*/*",
      "user-agent": "curl/7.81.0",
    }}
    body={`{"hello":"there"}`}
  />
</main>

<style>
	main {
    font-size: .85rem;
    background: #fff;
		flex: 1;
		display: flex;
		flex-direction: column;
    margin: 0 1.5rem 0 0;
		box-sizing: border-box;
    box-shadow: 0 0 3rem rgba(0, 0, 0, 0.04);
    border-radius: 3px;
	}

  h2 {
    font-size: 1.3rem;
  }

  h2 + p {
    opacity: .6;
    font-size: .8rem;
  }

  h2 + p code {
    display: inline-block;
    margin: 0 4px;
    border: 1px solid #eee;
    padding: 0 8px;
  }
</style>
