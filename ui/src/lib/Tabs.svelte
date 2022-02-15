<script lang="ts">
  type Tab = {
    label: string;
    href: string;
    onClick: () => void;
  };

  export let tabs: Tab[] = [];
  const current = globalThis?.location?.hash || '';
</script>

<ul>

    {#each tabs as tab}
      <li class:selected="{current === tab.href}">
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
    border-bottom: 1px solid #eee;
  }

  li a {
    display: block;
    padding: 0.5rem 1rem;
    color: inherit;
    text-decoration: none;
  }

  li.selected {
    font-weight: bold;
  }

</style>
