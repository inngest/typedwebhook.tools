import { v4 as uuid } from "uuid"

import { buildResponse } from "./response"
import {
  parseWebhookPath,
  parseWebsocketPath,
  isStartSessionPath,
} from "./urls"

const DurableObjectIdName = "WebSocketSessions"
const SessionTtl = 5 * 60 // TTL in seconds

export async function handleRequest(request: Request, env: Bindings) {
  const { SESSIONS, WEBSOCKETS } = env

  // Handle any webhook endpoint requests checking
  const webhookURLParams = parseWebhookPath(request.url)
  if (webhookURLParams) {
    // Check if the webhook is active
    const { id } = webhookURLParams
    const value = await SESSIONS.get(id, { cacheTtl: SessionTtl })
    if (!value) {
      return new Response("Not Found", { status: 404 })
    }
    const objId = WEBSOCKETS.idFromName(DurableObjectIdName)
    const stub = WEBSOCKETS.get(objId)
    return await stub.fetch(request)
  }

  // Handle websocket connection requests
  const upgradeHeader = request.headers.get("Upgrade")
  if (upgradeHeader === "websocket") {
    const websocketURLParams = parseWebsocketPath(request.url)
    if (!websocketURLParams) {
      return new Response("Bad request", { status: 400 })
    }
    const { id, token } = websocketURLParams

    const value = await SESSIONS.get(id, { cacheTtl: SessionTtl })
    if (value !== token) {
      return new Response("Unauthorized", { status: 401 })
    }

    const objId = WEBSOCKETS.idFromName(DurableObjectIdName)
    const stub = WEBSOCKETS.get(objId)
    return await stub.fetch(request)
  }

  // Handle get new webhook URL
  if (isStartSessionPath(request.url)) {
    const id: string = uuid()
    const token: string = uuid()
    await SESSIONS.put(id, token, { expirationTtl: SessionTtl })
    return new Response(JSON.stringify({ id, token, url: `/webhook/${id}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  return await buildResponse(request)
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest }

// Make sure we export the Counter Durable Object class
export { WebSocketStore } from "./webSocketStore"
export default worker
