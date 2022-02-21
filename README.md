<p align="center">
  <img
    height="180"
    src="https://typedwebhook.tools/webhook-color.svg"
    alt="typedwebhook.tools Logo"
  />
</p>

<h1 align="center">https://typedwebhook.tools</h1>

<br />

<p align="center">
  <a href="https://www.inngest.com"><img src="https://www.inngest.com/logo-white.svg" alt="Inngest logo" height="20" /></a>
  <br />
  <small><a href="https://www.inngest.com">Sponsored by Inngest</a></small>
</p>

<hr />

A webhook testing tool which automatically creates types for incoming requests.  Any incoming
request which is valid JSON is automatically converted to:

- [TypeScript](https://github.com/microsoft/TypeScript)
- [Cue](https://github.com/cue-lang/cue)
- [JSON Schema](https://json-schema.org/)

[Here's the website.  It's free to use.  Knock yourself out!](https://typedwebhook.tools)

## Why?

Webhooks are great!  But, to use them you almost always need to generate types for the request
data.  Why not have that done automatically for you?

At [Inngest](https://www.inngest.com) we love events. And types. So much that our service allows
you to build & deploy serverless functions that run whenever events are received (like webhooks).

We hope this tool — and Inngest — is useful for you and saves you time as a developer ✨

## Example types

<table>
<tr><th>JSON</th><th>TypeScript</th><th>Cue</th><th>JSON Schema</th></tr>
<tr valign="top">
<td>

```json
{
  "name": "Test event",
  "data": {
    "id": 1,
    "name": "Tester McTestFace",
    "by": "Inngest",
    "at": "2022-02-21T21:19:05.529Z"
  },
  "user": {
    "email": "tester@example.com"
  },
  "ts": 1645478345529
}
```

</td>
<td>

```typescript
export interface Event {
  name: string;
  data: {
    by: string;
    at: string;
    id: number;
    name: string;
  };
  user: {
    email: string;
  };
  ts: number;
};
```

</td>
<td>

```cue
{
  data: {
    id:   int
    name: string
    by:   string
    at:   string
  }
  user: {
    email: string
  }
  ts:   int
  name: string
}
```

</td>
<td>

```json
{
  "properties":{
    "data":{
      "properties":{
        "at":{
          "type":"string"
        },
        "by":{
          "type":"string"
        },
        "id":{
          "type":"integer"
        },
        "name":{
          "type":"string"
        }
      },
      "required":[
        "id",
        "name",
        "by",
        "at"
      ],
      "type":"object"
    },
    "name":{
      "type":"string"
    },
    "ts":{
      "type":"integer"
    },
    "user":{
      "properties":{
        "email":{
          "type":"string"
        }
      },
      "required":[
        "email"
      ],
      "type":"object"
    }
  },
  "required":[
    "data",
    "user",
    "ts",
    "name"
  ],
  "type":"object"
}
```

</td>
</tr>
</table>

## Architecture

There are three main components to this app:

- The backend, hosted using Cloudflare workers.
- The frontend, built using SvelteKit.
- The type generator, built using Inngest's [event schema packages](https://github.com/inngest/event-schemas)
  and ran using webassembly.

The backend runs on Cloudflare workers.  It accepts requests to create webhook endpoints;  to
susbcribe to webhook results via websockets;  and accepts requests to a webhook URL to record the
webhook data.

Each webhook has it own unique UUID.  While the chance of collision is _extremely low_, webhooks
are also created with a shared secret - transmitted only once when the webhook is created.  This
secret must be supplied when connecting via websockets to receive any requests sent to the URL. This
means that:

- Webhooks are private
- Webhooks are transient (no data is stored using this service;  they're proxied directly to the
browser)
- Webhooks are secure

## Type creation

The fun stuff!  To create types from plain ol' JSON objects we use the following _pipeline_:

1. Convert the JSON to a Cue type.  We do this for you.  Cue is fantastic.  It's both type
definitions and constraints in one.
2. Use our [Cue-to-Typescript package](https://github.com/inngest/event-schemas/tree/main/events/marshalling/typescript)
we made.  This was fun.  It also properly generates enums, interfaces, etc. according to best
practices.
3. Use cue's JSON schema generation capabilities.

You might be wondering - hey, this is in go, how does this run?  If you guessed webassembly, give
yourself a lil pat on the back!  We shift this to the browser because _we dont want to see your
data_.  We believe that utilities like this should be free (this is) and should be private (hey,
this is too!).  If we ran this on a server then, well, we'd have to send your event to a backend.
And, as explained above, the current backend runs in Cloudflare and literally proxies the request
to your websocket connection.

In the future maybe we rewrite this as a go app and do this as we process the request.  Who knows.
This works, and it only took us a couple days to make.


## Hacking away & contributing

PRs are welcome!  As are issues.  If you're interested in hacking on the type creation stuff,
that repo is here: https://github.com/inngest/event-schemas.  PRs also welcome to that repo.

## Development

```shell
# Install dependencies
$ npm install
# Start local development server with live reload
$ npm run dev
# Run tests
$ npm test
# Run type checking
$ npm run types:check
```

## License

GPL, my friend.  It's open-source, and should stay that way.
