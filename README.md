# Webhook Typer

This app runs on [Cloudflare Workers](https://workers.cloudflare.com/) to allow a user to visit
the website and get a unique webhook URL to which they can send events. We then push each event
to the browser immediately parsing the payload structure and providing various language types
and schemas for that given payload.

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
