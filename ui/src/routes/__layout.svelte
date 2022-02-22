<script lang="ts">
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<svelte:head>
  <title>TypedWebhook.tools: a tool to test webhooks and generate payload types</title>
  <meta
    name="description"
    content="Instantly generate a free URL to test webhooks.  Inspect payloads, headers, and generate types from request data."
  />
  <meta
    property="og:description"
    content="A tool to test webhooks and generate payload types.  Instantly test and inspect webhooks with a free, unique URL."
  />
  <meta property="og:image" content="/social-preview.png" />
</svelte:head>

<header>
  <a href="/" class="home">
    <img src="/webhook.svg" alt="Typed webhooks" aria-label="Typed webhooks logo" />
    <b>TypedWebhook.tools</b>
    <span>Test &amp; type webhooks</span>
  </a>

  <div class="header-buttons">
    <div>
      <a
        class="github-button"
        href="https://github.com/inngest/typedwebhook.tools"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star inngest/typedwebhook.tools on GitHub">
        <svg viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-star" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
        Star on GitHub
        </a
      >
    </div>
    <a href="https://www.producthunt.com/posts/typedwebhook-tools?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-typedwebhook-tools" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=332915&theme=light" alt="TypedWebhook.tools - Inspect webhook payloads with automatic type generation | Product Hunt" style="width: 164px; height: 35px;" width="164" height="35" /></a>
  </div>
</header>

<div class="root">
  <slot />
</div>

<footer>
  <div class="disclaimer">
    <p>
      <b>Only this browser tab can read webhooks sent to your URL</b>. No personal data is stored or
      used in this service. Your webhook endpoint lasts for 30m, is secure, and unique to you.
    </p>
  </div>

  <div class="by">
    <span>a tool from</span>
    <a href="https://www.inngest.com/?utm_source=typedwebhook.tools&utm_medium=footer" class="inngest" target="_blank">
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
    justify-content: space-between;
  }

  header img {
    height: 2rem;
    margin: 0 0.5rem 0 0;
  }

  .header-buttons {
    display: flex;
    align-items: center;
    line-height: 0;
  }
  .header-buttons > * {
    margin-left: 1.5rem;
  }

  /* style fallback if js doesn't load */
  .github-button {
    display: inline-flex;
    height: 28px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 16px;

    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
    font-weight: 600;
    
    color: #24292f;
    background-color: #ebf0f4;
    background-repeat: repeat-x;
    background-position: -1px -1px;
    background-size: 110% 110%;
    border: 1px solid;
    border-color: #ccd1d5;
    border-color: rgba(27,31,36,.15);
    border-radius: 0.25em;
    background-image: linear-gradient(180deg, #f6f8fa, #ebf0f4 90%);
    text-decoration: none;
  }
  .github-button .octicon-star {
    margin-right: 3px;
  }

  .home {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s;
  }
  .home:hover {
    opacity: 1;
  }
  .home span {
    margin-left: 0.75rem;
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
    min-height: 7rem;
    padding: 0 2rem;
  }

  footer a,
  footer {
    color: var(--footer-text-color);
  }

  .by {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .by span,
  .inngest {
    font-size: 0.75rem;
  }
  .by span {
    opacity: 0.6;
  }

  .inngest {
    display: flex;
    text-decoration: none;
    flex-direction: column;
    font-size: 0.75rem;
    align-items: center;
  }
  .inngest img {
    margin: 0.35rem 1rem 0;
  }

  .disclaimer {
    padding: 1rem 0;
    font-size: 0.8rem;
    max-width: 35vw;
    opacity: 0.5;
  }
</style>
