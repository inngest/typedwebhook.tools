import { writable } from 'svelte/store'
import { init } from "$lib/websocket";

type Request = {
  body: string;
  headers: { [key: string]: string },
  method: string;
  url: string;
  ts: number;
}

type State = {
  id: string;
  token: string;
  url: string;
  requests: Array<Request>;
  ws?: WebSocket;
  error?: string;
}

const state = writable<State>({
  id: "",
  token: "",
  url: "",
  requests: [],
});

export const connect = async () => {
  let ws: WebSocket;

  try {
    const data = JSON.parse(window.localStorage.getItem("wh") || "{}");

    let resp = await init(data.id, data.token, data.url);

    // Store this in localstorage
    // window.localStorage.setItem("wh", JSON.stringify({ id: resp.id, url: resp.url, token: resp.token }));

    // For connecting and managing events
    ws = resp.ws
    state.update((state: State) => {
      const { id, ws, url, token } = resp;
      return { ...state, id, ws, url, token };
    });
  } catch(e) {
    state.update(state => {
      state.error = "There was an error connecting websockets";
      return state;
    });
    return;
  }

  if (!ws) {
    state.update(state => {
      state.error = "There was an error connecting websockets";
      return state;
    });
    return;
  }

  ws.addEventListener("open", () => {
    console.log("Opened websocket")
  })
  
  ws.addEventListener("message", (message: any) => {
    const data: Request = JSON.parse(message.data)
    console.log("request received", data);
    state.update(state => ({ ...state, requests: [data].concat(state.requests) }));
  })
  
  ws.addEventListener("close", (_message: any) => {
    state.update(s => {
      s.error = "The websocket has closed";
      return s;
    });
  })
  
  ws.addEventListener("error", (_message: any) => {
    console.log(_message);
    console.log("Something went wrong with the WebSocket")
  })
}

export default state;
