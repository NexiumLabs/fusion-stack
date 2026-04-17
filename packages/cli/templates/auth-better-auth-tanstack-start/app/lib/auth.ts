import { betterAuth } from "better-auth"

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET,
  // Configure your database adapter and providers here.
  // See https://www.better-auth.com/docs/installation
})
