import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/start"
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
    <html lang="en" className="h-full antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="flex h-full flex-col bg-brand-bg text-brand-text">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
