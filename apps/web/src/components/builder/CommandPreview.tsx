"use client"

import { buildCommand, type Selections } from "@/lib/command"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function CommandPreview({ selections }: { selections: Selections }) {
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
      className="relative rounded-2xl border border-white/[0.07] p-3.5"
      style={{
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <button
        onClick={handleCopy}
        className="absolute right-2.5 top-2.5 rounded-lg p-1.5 text-white/20 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
        aria-label="Copy command"
      >
        {/* Cyan only on the success tick — a reward moment */}
        {copied ? <Check size={13} className="text-[#00DDD4]" /> : <Copy size={13} />}
      </button>
      {/* Pure white/gray text — no cyan in the command output */}
      <pre className="overflow-x-auto pr-8 font-mono text-[11px] leading-relaxed text-white/55">
        {command}
      </pre>
    </div>
  )
}
