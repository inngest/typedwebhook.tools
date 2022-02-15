<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import WebhookURL from '$lib/WebhookURL.svelte';
	import RequestList from '$lib/RequestList.svelte';
	import RequestData from '$lib/RequestData/RequestData.svelte';
	import Explainer from '$lib/Explainer.svelte';

  // TODO: Create a new webhook URL.
  const id = async () => {
    return "";
  }
</script>

<svelte:head>
	<title>Typed Webhook Testing</title>
</svelte:head>

<RequestList />
<main>
  <WebhookURL />
  <Explainer />
  <RequestData preview={true} />
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

  hgroup {
    text-align: center;
    padding: 4rem 0;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: normal;
    font-family: var(--font);
    opacity: .65;
  }

  .explainer {
    max-width: 50rem;
    margin: 0 auto;
    text-align: center;
  }

  .explainer strong {
    font-weight: 600;
  }
</style>
