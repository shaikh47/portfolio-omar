import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GraduationCap, FolderGit2, Cpu, ExternalLink, Award } from 'lucide-react'
import { resumeData } from '../../data/resume'
import type { ActivePanel } from '../types'

// Deterministic pseudo proficiency so skill bars stay stable across renders.
function levelFor(skill: string) {
  let h = 0
  for (let i = 0; i < skill.length; i++) h = (h * 31 + skill.charCodeAt(i)) >>> 0
  return 72 + (h % 24) // 72–95
}

const glass =
  'rounded-2xl border border-white/15 bg-neutral-900/70 backdrop-blur-xl shadow-2xl shadow-black/50'

function Panel({ title, icon, accent, children }: { title: string; icon: ReactNode; accent: string; children: ReactNode }) {
  return (
    <div className={`${glass} w-full max-w-lg max-h-[80vh] overflow-y-auto text-white`}>
      <div className="flex items-center gap-3 p-5 border-b border-white/10 sticky top-0 bg-neutral-900/80 backdrop-blur-xl rounded-t-2xl">
        <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background: `${accent}22`, color: accent }}>
          {icon}
        </span>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function content(active: ActivePanel) {
  if (active.kind === 'education') {
    const e = resumeData.education[active.index]
    return (
      <Panel title={e.institution} icon={<GraduationCap size={20} />} accent="#3b82f6">
        <p className="text-base font-semibold text-white">{e.degree}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-neutral-400">
          <span>{e.duration}</span>
          <span>{e.location}</span>
          {e.gpa && <span className="text-blue-400 font-semibold">GPA {e.gpa}</span>}
        </div>
        {e.highlights && (
          <ul className="mt-4 space-y-2">
            {e.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-neutral-300">
                <Award size={16} className="mt-0.5 shrink-0 text-amber-400" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    )
  }

  if (active.kind === 'project') {
    const p = resumeData.projects[active.index]
    return (
      <Panel title={p.name} icon={<FolderGit2 size={20} />} accent="#a855f7">
        <p className="text-sm text-neutral-300">{p.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {p.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/20">
              {t}
            </span>
          ))}
        </div>
        <ul className="mt-4 space-y-2">
          {p.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-neutral-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-purple-300 hover:text-purple-200"
          >
            View on GitHub <ExternalLink size={14} />
          </a>
        )}
      </Panel>
    )
  }

  // skills
  return (
    <Panel title="Skills & Proficiency" icon={<Cpu size={20} />} accent="#10b981">
      <div className="space-y-5">
        {resumeData.skills.map((cat) => (
          <div key={cat.label}>
            <p className="text-sm font-semibold text-white mb-2">{cat.label}</p>
            <div className="space-y-2">
              {cat.skills.map((s) => {
                const lvl = levelFor(s)
                return (
                  <div key={s}>
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>{s}</span>
                      <span>{lvl}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${lvl}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function InfoModal({ active, onClose }: { active: ActivePanel | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            className="relative"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 grid place-items-center w-9 h-9 rounded-full bg-neutral-800 border border-white/15 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <X size={18} />
            </button>
            {content(active)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
