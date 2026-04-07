"use client"

import { parseAsString, useQueryStates } from "nuqs"

export const defaultSelections = {
  name: "my-app",
  fe: "nextjs",
  be: "convex",
  db: "convex",
  auth: "clerk",
  ui: "none",
  email: "resend",
  pm: "pnpm",
}

export function useStackSelection() {
  return useQueryStates({
    name: parseAsString.withDefault(defaultSelections.name),
    fe: parseAsString.withDefault(defaultSelections.fe),
    be: parseAsString.withDefault(defaultSelections.be),
    db: parseAsString.withDefault(defaultSelections.db),
    auth: parseAsString.withDefault(defaultSelections.auth),
    ui: parseAsString.withDefault(defaultSelections.ui),
    email: parseAsString.withDefault(defaultSelections.email),
    pm: parseAsString.withDefault(defaultSelections.pm),
  })
}
