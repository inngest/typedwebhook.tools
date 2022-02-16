<script lang="ts">
	import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<svelte:head>
  <title>Typed Webhook Testing:  a tool to test webhooks and generate payload types</title>
  <meta name="description" content="Instantly generate a free URL to test webhooks.  Inspect payloads, headers, and generate types from request data." />
  <meta property="og:description" content="A tool to test webhooks and generate payload types.  Instantly test and inspect webhooks with a free, unique URL." />
</svelte:head>


<header>
  <a href="/" class="home">
    <img src="/webhook.svg" alt="Typed webhooks" />
    <b>Typed webhooks:</b>
    <span>Test &amp; type webhooks</span>
  </a>
</header>

<div class="root">
  <slot />
</div>

<footer>
  <div>
  </div>

  <div class="by">
    <span>a tool from</span>
    <a href="https://www.inngest.com/?utm_source=hooks" class="inngest" target="_blank">
      <img src="/inngest-blue.svg" alt="Inngest" height="25" />
      Event-driven serverless functions
    </a>
  </div>
</footer>

<SvelteToast />

<style>
  header {
    height: 4rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
  }

  header img {
    height: 2rem;
    margin: 0 .5rem 0 0;
  }

  .home {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    opacity: .6;
    transition: all .3s;
  }
  .home:hover {
    opacity: 1;
  }
  .home span {
    margin-left: .75rem;
    opacity: .7;
  }

  .root {
    display: grid;
    grid-template-columns: 270px auto;
    min-height: calc(100vh - 11rem);
  }

	footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
    height: 7rem;
    padding: 0 2rem;
	}

	footer a, footer {
    color: #2d3a59;
	}

  .by {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .by span, .inngest {
    font-size: .75rem;
  }
  .by span {
    opacity: .6;
  }

  .inngest {
    display: flex;
    text-decoration: none;
    flex-direction: column;
    font-size: .75rem;
    align-items: center;
  }
  .inngest img {
    margin: .35rem 1rem 0;
  }
</style>
