import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import("eslint").Linter.Config[]} */
const config = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]

export default config
