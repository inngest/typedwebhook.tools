import { buildResponse } from "./response"
import { parseWebhookPath, parseWebsocketPath } from "./urls"

const DurableObjectIdName = "WebSocketSessions"

export async function handleRequest(request: Request, env: Bindings) {
  const { SESSIONS, WEBSOCKETS } = env

  // Handle any webhook endpoint requests checking
  const webhookURLParams = parseWebhookPath(request.url)
  if (webhookURLParams) {
    // Check if the webhook is active
    const { id } = webhookURLParams
    const value = await SESSIONS.get(id)
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

    const value = await SESSIONS.get(id)
    if (value !== token) {
      return new Response("Unauthorized", { status: 401 })
    }

    const objId = WEBSOCKETS.idFromName(DurableObjectIdName)
    const stub = WEBSOCKETS.get(objId)
    return await stub.fetch(request)
  }

  return await buildResponse(request, env)
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest }

// Make sure we export the Counter Durable Object class
export { WebSocketStore } from "./webSocketStore"
export default worker
