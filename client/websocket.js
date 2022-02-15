let websocket = new WebSocket("ws://deb.shared:8787/ws")
if (!websocket) {
  throw new Error("Server didn't accept WebSocket")
}

websocket.addEventListener("open", () => {
  console.log("Opened websocket")
})

websocket.addEventListener("message", (message) => {
  console.log(message)
})

websocket.addEventListener("close", (message) => {
  console.log(`Closed websocket`)
})

websocket.addEventListener("error", (message) => {
  console.log(`Something went wrong with the WebSocket`)

  // Potentially reconnect the WebSocket connection, by instantiating a
  // new WebSocket as seen above, and connecting new events
  // websocket = new WebSocket(url)
  // websocket.addEventListener(...)
})

// Close WebSocket connection at a later point
const closeConnection = () => websocket.close()
