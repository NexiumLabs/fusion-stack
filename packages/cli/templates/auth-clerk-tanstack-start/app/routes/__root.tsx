import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/start"
import { ClerkProvider } from "@clerk/tanstack-start"
import "../globals.css"

export const Route = createRootRoute({
  head() {
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "{{PROJECT_NAME}}" },
      ],
    }
  },
  component: RootDocument,
})

function RootDocument() {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  )
}
