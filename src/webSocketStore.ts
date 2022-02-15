import { parseWebhookPath, parseWebsocketPath } from "./urls"

type RequestMessage = {
  url: string;
  method: string;
  headers: { [key: string]: string };
  body: string;
  ts: number;
}

export class WebSocketStore implements DurableObject {
  // Store all active sessions in a map
  #activeSockets: Map<string, WebSocket>

  // Store this.state for later access
  constructor(
    private readonly state: DurableObjectState,
    private readonly env: Bindings
  ) {
    this.#activeSockets = new Map<string, WebSocket>()
  }

  // All authorization checks happen in the Worker request handler
  async fetch(request: Request) {
    // Handle webhook requests to send messages to the websocket
    const webhookURLParams = parseWebhookPath(request.url)
    if (webhookURLParams) {
      const { id } = webhookURLParams
      const webSocket = this.#activeSockets.get(id)
      if (webSocket) {
        await this.forwardRequestToClient(request, webSocket)
        return new Response("OK", { status: 200 })
      }
      return new Response("Bad Request", { status: 400 })
    }

    // Handle websocket connections and storage in the map
    const websocketURLParams = parseWebsocketPath(request.url)
    if (websocketURLParams) {
      const { id } = websocketURLParams
      const [client, server] = Object.values(new WebSocketPair())
      await this.handleSession(id, server)
      return new Response(null, { status: 101, webSocket: client })
    }

    return new Response(null, { status: 400 })
  }

  async forwardRequestToClient(request: Request, server: WebSocket) {
    const body = await request.text()
    const message: RequestMessage = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body,
      ts: new Date().valueOf(),
    }
    console.log(request.headers)
    server.send(JSON.stringify(message))
  }

  async handleSession(id: string, server: WebSocket) {
    server.accept()

    // Store the WebSocket connection for later use
    this.#activeSockets.set(id, server)

    let closeOrErrorHandler = (evt: any) => {
      console.log("Closed websocket connection:", evt)
      this.#activeSockets.delete(id)
      this.env.SESSIONS.delete(id)
    }
    server.addEventListener("close", closeOrErrorHandler)
    // server.addEventListener("error", closeOrErrorHandler)
  }
}
