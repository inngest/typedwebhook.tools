<script lang="ts">
  type Tab = {
    label: string;
    href: string;
  };

  export let tabs: Tab[] = [];
  export let current = '';
</script>

<ul>
  {#each tabs as tab}
    <li class:selected={current === tab.href}>
      <a href={tab.href}>{tab.label}</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    /* border-bottom: 1px solid #eee; */
    font-weight: bold;
  }

  li a {
    display: block;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    color: #c4c4c4;
    text-decoration: none;
    border-radius: var(--border-radius);
  }

  a:hover {
    background-color: var(--button-hover-bg);
  }

  li.selected a {
    color: #fff;
    background-color: var(--button-bg);
  }
</style>
