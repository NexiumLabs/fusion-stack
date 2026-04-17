"use client"

import { parseAsString, useQueryStates } from "nuqs"

export const defaultSelections = {
  name:        "my-app",
  fe:          "nextjs",
  be:          "convex",
  api_layer:   "none",
  db:          "convex",
  orm:         "none",
  db_provider: "none",
  auth:        "clerk",
  ui:          "none",
  email:       "resend",
  /** Comma-separated addon + skill IDs, e.g. "pwa,skill-careerops" */
  addons:      "none",
  /** "yes" = use src/ directory layout (default), "no" = flat root layout */
  src:         "yes",
  /** "yes" = run git init + initial commit (default), "no" = skip */
  git:         "yes",
  pm:          "pnpm",
}

export function useStackSelection() {
  return useQueryStates({
    name:        parseAsString.withDefault(defaultSelections.name),
    fe:          parseAsString.withDefault(defaultSelections.fe),
    be:          parseAsString.withDefault(defaultSelections.be),
    api_layer:   parseAsString.withDefault(defaultSelections.api_layer),
    db:          parseAsString.withDefault(defaultSelections.db),
    orm:         parseAsString.withDefault(defaultSelections.orm),
    db_provider: parseAsString.withDefault(defaultSelections.db_provider),
    auth:        parseAsString.withDefault(defaultSelections.auth),
    ui:          parseAsString.withDefault(defaultSelections.ui),
    email:       parseAsString.withDefault(defaultSelections.email),
    addons:      parseAsString.withDefault(defaultSelections.addons),
    src:         parseAsString.withDefault(defaultSelections.src),
    git:         parseAsString.withDefault(defaultSelections.git),
    pm:          parseAsString.withDefault(defaultSelections.pm),
  })
}
