"use server"

import webpush from "web-push"
import fs from "node:fs"
import path from "node:path"

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// ---------------------------------------------------------------------------
// Subscription store
//
// Development / self-hosted: subscriptions are persisted to a local JSON file
// so they survive server restarts. For production with a real DB, replace the
// four helpers below (loadStore / saveStore / addSub / removeSub) with calls
// to your ORM of choice, for example:
//
//   Drizzle:  await db.insert(pushSubscriptions).values({ endpoint, data: JSON.stringify(sub) })
//   Prisma:   await prisma.pushSubscription.create({ data: { endpoint, data: JSON.stringify(sub) } })
// ---------------------------------------------------------------------------

type SubscriptionMap = Record<string, webpush.PushSubscription>

const STORE_PATH = path.join(process.cwd(), ".push-subscriptions.json")

function loadStore(): SubscriptionMap {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, "utf-8")) as SubscriptionMap
  } catch {
    return {}
  }
}

function saveStore(store: SubscriptionMap): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2))
}

function addSub(sub: webpush.PushSubscription): void {
  const store = loadStore()
  store[sub.endpoint] = sub
  saveStore(store)
}

function removeSub(endpoint: string): void {
  const store = loadStore()
  delete store[endpoint]
  saveStore(store)
}

// ---------------------------------------------------------------------------

export async function subscribeUser(sub: webpush.PushSubscription) {
  addSub(sub)
  return { success: true }
}

export async function unsubscribeUser(endpoint: string) {
  removeSub(endpoint)
  return { success: true }
}

export async function sendNotification(message: string) {
  const store = loadStore()
  const subscriptions = Object.values(store)

  if (subscriptions.length === 0) {
    throw new Error("No active push subscriptions")
  }

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        sub,
        JSON.stringify({
          title: "{{PROJECT_NAME}}",
          body: message,
          icon: "/icon-192x192.png",
        })
      )
    )
  )

  const failed = results.filter((r) => r.status === "rejected")
  if (failed.length > 0) {
    console.error(`${failed.length} push notification(s) failed`)
  }

  return { success: true, sent: results.length - failed.length }
}
