import { motion } from 'framer-motion'
import { DoorOpen } from 'lucide-react'

export function Hud({ onExit }: { onExit: () => void }) {
  return (
    <>
      {/* title + controls hint (top-left) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="pointer-events-none absolute top-4 left-4 z-[110] max-w-xs"
      >
        <div className="rounded-2xl border border-white/15 bg-neutral-900/60 backdrop-blur-xl px-4 py-3 text-white shadow-xl">
          <p className="text-sm font-bold tracking-tight">The Portfolio Gallery</p>
          <p className="text-xs text-neutral-400 mt-1">
            <span className="inline-flex gap-1">
              {['W', 'A', 'S', 'D'].map((k) => (
                <kbd key={k} className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-semibold">
                  {k}
                </kbd>
              ))}
            </span>{' '}
            to walk · click exhibits to inspect
          </p>
        </div>
      </motion.div>

      {/* exit button (top-right) */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onExit}
        className="absolute top-4 right-4 z-[110] inline-flex items-center gap-2 rounded-xl border border-white/15 bg-neutral-900/60 backdrop-blur-xl px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-neutral-800/70 transition-colors"
      >
        <DoorOpen size={16} /> Exit to site
      </motion.button>
    </>
  )
}
