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
    <div
      className="relative rounded-2xl border border-[rgba(0,210,210,0.12)] p-3.5"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,210,210,0.06) 0%, rgba(0,0,0,0.3) 100%)",
        backdropFilter: "blur(20px) saturate(160%)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,220,220,0.08)",
      }}
    >
      <button
        onClick={handleCopy}
        className="absolute right-2.5 top-2.5 rounded-lg p-1.5 text-[rgba(0,210,210,0.35)] hover:text-[#00D4D4] hover:bg-[rgba(0,210,210,0.08)] transition-all duration-150"
        aria-label="Copy command"
      >
        {copied ? (
          <Check size={13} className="text-[#00D4D4]" />
        ) : (
          <Copy size={13} />
        )}
      </button>
      <pre className="overflow-x-auto pr-8 font-mono text-[11px] leading-relaxed text-[rgba(0,220,220,0.65)]">
        {command}
      </pre>
    </div>
  )
}
