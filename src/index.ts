import { v4 as uuid } from "uuid"

import {
  parseWebhookPath,
  parseWebsocketPath,
  isStartSessionPath,
} from "./urls"

const DurableObjectIdName = "WebSocketSessions"
const SessionTtl = 30 * 60 // TTL in seconds

export async function handleRequest(request: Request, env: Bindings) {
  const { SESSIONS, WEBSOCKETS } = env

  // Handle any webhook endpoint requests checking
  const webhookURLParams = parseWebhookPath(request.url)
  if (webhookURLParams && !!webhookURLParams.id) {
    return await handleWebhook(request, env, webhookURLParams as { id: string });
  }

  // Handle websocket connection requests
  const upgradeHeader = request.headers.get("Upgrade")
  if (upgradeHeader === "websocket") {
    const websocketURLParams = parseWebsocketPath(request.url)
    if (!websocketURLParams) {
      return new Response("Bad request", { status: 400 })
    }

    const { id, token } = websocketURLParams;

    // Ensure that the shared secret matches.  This keeps webhooks private and secure
    // for their lifetime.
    const value = await SESSIONS.get(id, { cacheTtl: SessionTtl })
    if (value !== token) {
      return new Response("Unauthorized", { status: 401 })
    }

    const objId = WEBSOCKETS.idFromName(DurableObjectIdName)
    const stub = WEBSOCKETS.get(objId)
    return await stub.fetch(request)
  }

  if (isStartSessionPath(request.url)) {
    // Create a new webhook with a shared secret.  This secret must be used to
    // retrieve webhook payloads for the webhook's lifetime.
    const id: string = uuid();
    const token: string = uuid();
    await SESSIONS.put(id, token, { expirationTtl: SessionTtl })
    await notify("typedwebhook.webhook.created");
    return new Response(JSON.stringify({ id, token, url: `/webhook/${id}` }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  return new Response("Not found", { status: 404 });
}

const handleWebhook = async (request: Request, env: Bindings, params: { id: string }) => {
  const { SESSIONS, WEBSOCKETS } = env;
  const { id } = params

  // Ensure that the webhook is active
  const value = await SESSIONS.get(id, { cacheTtl: SessionTtl })
  if (!value) {
    return new Response("Not Found", { status: 404 })
  }

  const objId = WEBSOCKETS.idFromName(DurableObjectIdName)
  const stub = WEBSOCKETS.get(objId)
  await notify("typedwebhook.event.created");
  return await stub.fetch(request)
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest }

// notify sends an event with zero data except for a ref method (no IP, no UUIDs)
// to notify that a webhook has been created.
const notify = async (name: string) => {
  const body = JSON.stringify({
    name,
    // We don't want to store any data here in our notification.
    //  We're only signalling that something happened;  nothing
    // personal must ever be sent.
    data: {
      at: new Date().toISOString(),
    },
    ts: new Date().valueOf(),
    v: "2022-02-21.01",
  });

  try {
    const url = "https://inn.gs/e/" + (process.env.INNGEST_KEY);
    await fetch(url, {
      method: "POST",
      body,
    });
  } catch(e) {}
}

// Make sure we export the Counter Durable Object class
export { WebSocketStore } from "./webSocketStore"
export default worker
