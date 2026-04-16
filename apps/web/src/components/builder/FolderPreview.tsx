"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react"
import { useMemo, useState } from "react"
import { buildFolderTree, TAG_COLORS, TAG_LABELS, type TreeNode } from "@/lib/folder-tree"
import type { Selections } from "@/lib/command"

// ── File icon based on extension ──────────────────────────────────────────────
function FileIcon({ name, className }: { name: string; className?: string }) {
  const ext = name.split(".").pop() ?? ""
  if (["json", "prisma"].includes(ext)) return <FileJson size={11} className={className} />
  if (["md", "txt"].includes(ext)) return <FileText size={11} className={className} />
  return <FileCode2 size={11} className={className} />
}

// ── Single tree row ────────────────────────────────────────────────────────────
function TreeRow({
  node,
  depth,
  initialOpen,
}: {
  node: TreeNode
  depth: number
  initialOpen?: boolean
}) {
  const [open, setOpen] = useState(initialOpen ?? depth < 2)
  const indent = depth * 14 + 10
  const color = node.tag ? (TAG_COLORS[node.tag] ?? "text-white/55") : "text-white/55"

  if (node.type === "file") {
    return (
      <motion.div
        key={node.name}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.15 }}
        className="overflow-hidden"
      >
        <div
          className={`flex items-center gap-1.5 rounded py-[3px] pr-2 hover:bg-white/[0.04] ${color}`}
          style={{ paddingLeft: `${indent}px` }}
        >
          <FileIcon name={node.name} className="shrink-0 opacity-75" />
          <span className="font-mono text-[11px] leading-none truncate">{node.name}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      key={node.name}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.15 }}
      className="overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-1.5 rounded py-[3px] pr-2 hover:bg-white/[0.04] ${color}`}
        style={{ paddingLeft: `${indent}px` }}
      >
        <span className="shrink-0 opacity-60">
          {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
        </span>
        <span className="shrink-0">
          {open ? <FolderOpen size={11} /> : <Folder size={11} />}
        </span>
        <span className="font-mono text-[11px] leading-none font-medium truncate">{node.name}</span>
      </button>

      <AnimatePresence initial={false}>
        {open &&
          node.children?.map((child) => (
            <TreeRow key={`${child.name}-${child.tag ?? ""}`} node={child} depth={depth + 1} />
          ))}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Legend ─────────────────────────────────────────────────────────────────────
function Legend({ tags }: { tags: Set<string> }) {
  if (tags.size === 0) return null

  return (
    <div className="border-t border-white/[0.05] px-3 py-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
      {[...tags].map((tag) => (
        <span key={tag} className="flex items-center gap-1">
          <span className={`text-[9px] font-mono ${TAG_COLORS[tag] ?? "text-white/40"}`}>■</span>
          <span className="font-mono text-[9px] text-white/30">{TAG_LABELS[tag] ?? tag}</span>
        </span>
      ))}
    </div>
  )
}

// ── Collect all unique tags in a tree ──────────────────────────────────────────
function collectTags(node: TreeNode, acc: Set<string> = new Set()): Set<string> {
  if (node.tag) acc.add(node.tag)
  node.children?.forEach((c) => collectTags(c, acc))
  return acc
}

// ── Main export ────────────────────────────────────────────────────────────────
export function FolderPreview({ selections }: { selections: Selections }) {
  const tree = useMemo(() => buildFolderTree(selections), [selections])
  const tags = useMemo(() => collectTags(tree), [tree])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-white/[0.05] px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
          <span className="text-[rgba(0,221,212,0.40)]">/</span> File Structure
        </p>
      </div>

      {/* Tree */}
      <div className="min-h-0 flex-1 overflow-y-auto py-2 px-1">
        <AnimatePresence initial={false}>
          <TreeRow key={tree.name} node={tree} depth={0} initialOpen />
        </AnimatePresence>
      </div>

      {/* Legend */}
      <Legend tags={tags} />
    </div>
  )
}
