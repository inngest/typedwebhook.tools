// Parse the URL to return an object with the id property if it's a webhook url,
// or else return undefined
export const parseWebhookPath = (
  url: string
): { [key: string]: string } | undefined => {
  const u: URL = new URL(url)
  const match = /\/webhook\/(?<id>.+)/.exec(u.pathname)
  return match?.groups
}

// Parse the URL to return an object with id and token properties if it's a websocket url,
// or else return undefined
export const parseWebsocketPath = (
  url: string
): { [key: string]: string } | undefined => {
  const u: URL = new URL(url)
  const match = /\/ws\/(?<id>.+)\/(?<token>.+)/.exec(u.pathname)
  return match?.groups
}
