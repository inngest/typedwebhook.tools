<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import RequestData from '../lib/RequestData/RequestData.svelte';
</script>

<Meta
  title="RequestData"
  component={RequestData}
  argTypes={{
    body: { control: 'text' },
    method: { control: 'text' },
    headers: { control: 'object' },
    time: { control: 'text' }
  }}
/>

<Template let:args>
  <RequestData {...args} on:click={args.onClick} />
</Template>

<Story
  name="Data with JSON"
  args={{
    active: true,
    time: '9:46:15am',
    method: 'POST',
    body: `{"hello":"there"}`,
    headers: {
      'content-type': 'application/json',
      accept: '*/*',
      'content-length': '17'
    }
  }}
/>

<Story
  name="Inactive"
  args={{
    active: false,
    time: '9:46:15am',
    method: 'POST'
  }}
/>
