import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Fusion Stack — Scaffold your stack",
  description:
    "Pick your frontend, backend, auth, and email. Get a pre-configured project in one command.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#090B0C] text-[#F8FAFA]" suppressHydrationWarning>
        <NuqsAdapter>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  )
}
