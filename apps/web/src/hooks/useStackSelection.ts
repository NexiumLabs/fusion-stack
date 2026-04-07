"use client"

import { parseAsString, useQueryStates } from "nuqs"

export const defaultSelections = {
  name: "my-app",
  fe: "nextjs",
  be: "convex",
  auth: "clerk",
  email: "resend",
  pm: "pnpm",
}

export function useStackSelection() {
  return useQueryStates({
    name: parseAsString.withDefault(defaultSelections.name),
    fe: parseAsString.withDefault(defaultSelections.fe),
    be: parseAsString.withDefault(defaultSelections.be),
    auth: parseAsString.withDefault(defaultSelections.auth),
    email: parseAsString.withDefault(defaultSelections.email),
    pm: parseAsString.withDefault(defaultSelections.pm),
  })
}
