<script lang="ts">
	import '../app.css';
</script>

<header>
  <img src="/webhook.svg" alt="Typed webhooks" />
  <a href="/" class="home">Typed webhooks</a>
</header>

<div class="root">
  <slot />
</div>

<footer>
</footer>

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
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    opacity: .6;
    transition: all .3s;
  }
  .home:hover {
    opacity: 1;
  }

  .root {
    display: grid;
    grid-template-columns: minmax(200px, 300px) auto;
    min-height: calc(100vh - 9rem);
  }

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    height: 4rem;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
