// This service worker exists solely to unregister any previously installed SW
// and let the browser fetch fresh assets directly from the network.
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", async () => {
  await self.registration.unregister()
  const clients = await self.clients.matchAll({ type: "window" })
  for (const client of clients) client.navigate(client.url)
})
