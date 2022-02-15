<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import RequestList from '$lib/RequestList.svelte';
	import RequestData from '$lib/RequestData/RequestData.svelte';
	import WebhookURL from '$lib/WebhookURL.svelte';

  let body = JSON.stringify({
    "_id": "620bd6f90e4f151040cbb464",
    "index": 0,
    "guid": "50248c9a-1e66-4a0d-a241-e7f9ff2246fa",
    "isActive": false,
    "balance": "$2,229.49",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "green",
    "name": "Farrell Sampson",
    "gender": "male",
    "company": "MANGLO",
    "email": "farrellsampson@manglo.com",
    "phone": "+1 (846) 475-2829",
    "address": "385 Roosevelt Place, Escondida, Maryland, 9796",
    "about": "Dolor labore incididunt nostrud quis minim reprehenderit eu proident qui fugiat et ullamco. Aliquip deserunt in sit eiusmod tempor. Sint occaecat duis incididunt non consectetur labore quis non veniam amet consequat exercitation cupidatat. Lorem qui ex in nisi. Cupidatat reprehenderit occaecat mollit est adipisicing do ex eiusmod sunt et mollit. Ipsum officia exercitation dolore nulla irure quis adipisicing quis.\r\n",
    "registered": "2017-06-03T06:10:54 +04:00",
    "latitude": -44.097363,
    "longitude": -132.339119,
    "tags": [
      "do",
      "deserunt",
      "quis",
      "elit",
      "cillum",
      "veniam",
      "magna"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Harrington Mcintosh"
      },
      {
        "id": 1,
        "name": "Munoz Velasquez"
      },
      {
        "id": 2,
        "name": "Benjamin Cruz"
      }
    ],
    "greeting": "Hello, Farrell Sampson! You have 10 unread messages.",
    "favoriteFruit": "banana"
  })
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
    body={body}
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
