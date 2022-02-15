const host = globalThis.location?.host.replace(/:\d+/, "");
const wsProtocol = globalThis.location?.protocol === 'https:' ? 'wss:' : 'ws:';

export const createWebhookURL = async () => {
  // const res = await fetch("/new_webhook")
  const res = await fetch("/new_webhook")
  return await res.json();
}

export const createWebsocket = (id: string, token: string, url: string) => {

  const wsURL = wsProtocol + "//" + host + "/ws/" + id + "/" + token;

  console.log(wsProtocol, host, wsURL);
  const ws = new WebSocket(wsProtocol + "//" + host + "/ws/" + id + "/" + token);

  if (!ws) {
    throw new Error("Server didn't accept WebSocket")
  }

  /*
  ws.addEventListener("open", () => {
    console.log("Opened websocket")
  })
  
  ws.addEventListener("message", (message) => {
    const data = JSON.parse(message.data)
    // TODO
  })
  
  ws.addEventListener("close", (message) => {
    console.log("Closed websocket")
  })
  
  ws.addEventListener("error", (message) => {
    console.log("Something went wrong with the WebSocket")
  })
 */

  // TODO: ws.close() later.
  return { ws, id, token, url };
}

export const init = async (id?: string, token?: string, url?: string) => {
  if (!globalThis.window) {
    return;
  }

  if (!id || !token || !url) {
    let { id, token, url } = await createWebhookURL();
    return createWebsocket(id, token, url);
  }

  return createWebsocket(id, token, url);
}
