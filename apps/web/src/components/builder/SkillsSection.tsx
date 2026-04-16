"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { SKILLS_CATALOG, parseSkills, serializeSkills } from "@/lib/skills"

type SkillsSectionProps = {
  value: string
  onChange: (serialized: string) => void
}

export function SkillsSection({ value, onChange }: SkillsSectionProps) {
  const selected = new Set(parseSkills(value))

  function toggle(skillId: string) {
    const next = new Set(selected)
    if (next.has(skillId)) {
      next.delete(skillId)
    } else {
      next.add(skillId)
    }
    onChange(serializeSkills([...next]))
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          <span className="text-[rgba(0,221,212,0.40)]">&gt;_</span>{" "}Skills
        </h2>
        <span className="rounded-full border border-[rgba(0,221,212,0.25)] bg-[rgba(0,221,212,0.08)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00DDD4]">
          New
        </span>
        <span className="text-[10px] text-white/20">
          — installed via{" "}
          <code className="text-white/35">npx skillsadd</code>
          {" "}· multi-select
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS_CATALOG.map((skill) => {
          const isSelected = selected.has(skill.id)
          return (
            <motion.button
              key={skill.id}
              onClick={() => toggle(skill.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              className={[
                "relative flex flex-col gap-1.5 rounded-xl border px-4 py-3.5 text-left transition-colors duration-150",
                isSelected
                  ? "border-[rgba(0,221,212,0.5)] bg-[rgba(0,221,212,0.06)]"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13] hover:bg-white/[0.04]",
              ].join(" ")}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span className="absolute right-3 top-3 text-[#00DDD4]">
                  <CheckCircle size={13} strokeWidth={2.5} />
                </span>
              )}

              <p className={[
                "text-sm font-medium leading-snug",
                isSelected ? "text-white" : "text-white/75",
              ].join(" ")}>
                {skill.label}
              </p>

              <p className="text-[11px] leading-relaxed text-white/35">
                {skill.description}
              </p>

              <p className="mt-0.5 font-mono text-[9px] text-white/20">
                {skill.id}
              </p>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
