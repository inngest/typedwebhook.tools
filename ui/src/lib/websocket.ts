const host = globalThis.location?.host.replace(/:\d+/, '');
const wsProtocol = globalThis.location?.protocol === 'https:' ? 'wss:' : 'ws:';

export const createWebhookURL = async () => {
  const res = await fetch('/new_webhook');
  return await res.json();
};

export const createWebsocket = (id: string, token: string, url: string) => {
  const wsURL = wsProtocol + '//' + host + '/ws/' + id + '/' + token;
  const ws = new WebSocket(wsURL);
  if (!ws) {
    throw new Error("Server didn't accept WebSocket");
  }
  return { ws, id, token, url };
};

export const init = async (id?: string, token?: string, url?: string) => {
  if (!globalThis.window) {
    return;
  }

  if (!id || !token || !url) {
    let { id, token, url } = await createWebhookURL();
    return createWebsocket(id, token, url);
  }

  return createWebsocket(id, token, url);
};
