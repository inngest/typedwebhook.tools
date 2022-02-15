<script lang="ts">
  export let uuid: string = "";

  const url = `https://typedwebhookbin.com/webhook/${uuid}`;

  const onclick = async () => {
    try {
      debugger;
      console.log(url);
      await navigator?.clipboard?.writeText(url);
    } catch(e) {
      console.log(e);
    }
  };

</script>

<div on:click={onclick}>
  <p>Your unique webhook URL is</p>
  <code>{url}</code>
</div>

<style>

  div {
    padding: 1.5rem;
    margin: 0 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    background-image:
        linear-gradient(135deg, #f7f6f2 12.50%, #ffffff 12.50%, #ffffff 50%, #f7f6f2 50%, #f7f6f2 62.50%, #ffffff 62.50%, #ffffff 100%);
    background-size: 5.66px 5.66px;
  }

  div:hover code {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  p {
    opacity: 0.6;
  }

  code {
    display: inline-block;
    margin: 0.5rem 4px 0.35rem;
    border: 1px solid #eee;
    padding: 4px 12px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 3px;
    background: var(--bg-color);
    transition: all .3s;
  }
  small { opacity: .4 }

</style>

