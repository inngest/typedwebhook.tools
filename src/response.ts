const script = `
;(function () {
  const host = window.location.host;
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const messagesEl = document.querySelector("#js-messages");
  const webhookURLEl = document.querySelector("#js-webhook-url");

  function getWebhookInfo() {
    return fetch("/new_webhook").then(res => res.json())
  }

  function createPreEl(text) {
    const pre = document.createElement("pre");
    pre.innerText = JSON.stringify(text);
    return pre;
  }

  function initWebhook(id, token) {
    let websocket = new WebSocket(wsProtocol + "//" + host + "/ws/" + id + "/" + token);
    if (!websocket) {
      throw new Error("Server didn't accept WebSocket")
    }

    websocket.addEventListener("open", () => {
      console.log("Opened websocket")
    })
    
    websocket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data)

      const children = Object.keys(data).map(key => {
        return createPreEl(data[key]);
      })
      
      const p = document.createElement("p");
      children.forEach(child => {
        p.appendChild(child);
      });
      messagesEl.appendChild(p);
    })
    
    websocket.addEventListener("close", (message) => {
      console.log("Closed websocket")
    })
    
    websocket.addEventListener("error", (message) => {
      console.log("Something went wrong with the WebSocket")
    })
    
    // Close WebSocket connection at a later point
    const closeConnection = () => websocket.close()
  }

  function init() {
    getWebhookInfo().then(({ id, token, url }) => {
      webhookURLEl.innerText = url;
      initWebhook(id, token);
    })
  }

  init();
})();
`

export async function buildResponse(request: Request) {
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
        .messages pre {
          white-space: pre-wrap;
        }
        </style>
    </head>
    <body>
        <h1>Webhook typer</h1>
        <p>
          Your webhook URL: <code id="js-webhook-url">...</code>
        </p>
        <div id="js-messages" class="messages"></div>
        <script type="text/javascript">
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
