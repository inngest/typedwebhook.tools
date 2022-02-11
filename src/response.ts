const script = `
const hostname = "localhost:8787";
// TODO add channel id to URL
let websocket = new WebSocket("ws://" + hostname + "/ws/" + id + "/" + token);
if (!websocket) {
  throw new Error("Server didn't accept WebSocket")
}

const messages = document.querySelector("#js-messages");

websocket.addEventListener("open", () => {
  console.log("Opened websocket")
})

websocket.addEventListener("message", (message) => {
  console.log(message)
  const pre = document.createElement("pre");
  pre.innerText = message.data;
  const p = document.createElement("p");
  p.appendChild(pre);
  messages.appendChild(p);
})

websocket.addEventListener("close", (message) => {
  console.log("Closed websocket")
})

websocket.addEventListener("error", (message) => {
  console.log("Something went wrong with the WebSocket")

  // Potentially reconnect the WebSocket connection, by instantiating a
  // new WebSocket as seen above, and connecting new events
  // websocket = new WebSocket(url)
  // websocket.addEventListener(...)
})

// Close WebSocket connection at a later point
const closeConnection = () => websocket.close()
`

export async function buildResponse(request: Request, env: Bindings) {
  const { SESSIONS } = env
  // TODO - Generate uuid and token
  // For testing:
  const id = "fdeb8ff6-211e-40a0-b008-8579be78587f"
  const token = "918067da-a0c4-499a-ba7d-bfe25c1c06df"

  await SESSIONS.put(id, token, { expirationTtl: 1000 })

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Example</title>
        <style>
        body {
          font-family: sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 7.5rem;
        }
        p {
          color: #555555;
          font-size: 1rem;
        }
        code:not(:last-child) {
          margin-right: 2rem;
        }
        .messages {
          margin: 1em auto;
          max-width: 50rem;
          text-align: left;
        }
        .messages p {
          padding: 1em 2em;
          background-color: #000;
          color: #ACB2C2;
          border-radius: 0.5rem;
        }
        </style>
    </head>
    <body>
        <h1>Webhook typer</h1>
        <p>
          Your webhook URL: <code>/webhook/${id}</code>
        </p>
        <div id="js-messages" class="messages"></div>
        <script type="text/javascript">
          const id = "${id}"
          const token = "${token}"
          ${script}
        </script>
    </body>
    </html>
  `

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  })
}
