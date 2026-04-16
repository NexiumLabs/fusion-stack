import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local")
}

// Cache connection across hot reloads in development
const cached = globalThis as typeof globalThis & {
  mongooseConn: typeof mongoose | null
  mongoosePromise: Promise<typeof mongoose> | null
}

cached.mongooseConn = cached.mongooseConn ?? null
cached.mongoosePromise = cached.mongoosePromise ?? null

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.mongooseConn) return cached.mongooseConn

  if (!cached.mongoosePromise) {
    cached.mongoosePromise = mongoose.connect(MONGODB_URI)
  }

  cached.mongooseConn = await cached.mongoosePromise
  return cached.mongooseConn
}
