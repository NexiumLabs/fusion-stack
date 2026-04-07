"use client"

import { buildCommand, type Selections } from "@/lib/command"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

type CommandPreviewProps = {
  selections: Selections
}

export function CommandPreview({ selections }: CommandPreviewProps) {
  const [copied, setCopied] = useState(false)
  const command = buildCommand(selections)

  function handleCopy() {
    navigator.clipboard.writeText(command.replace(/\s*\\\n\s*/g, " ")).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative rounded-md border border-white/10 bg-black/40 p-3">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded p-1 text-white/30 hover:text-white transition-colors"
        aria-label="Copy command"
      >
        {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
      </button>
      <pre className="overflow-x-auto pr-6 font-mono text-[11px] leading-relaxed text-white/70">
        {command}
      </pre>
    </div>
  )
}
