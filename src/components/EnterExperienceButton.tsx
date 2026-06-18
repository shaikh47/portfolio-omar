import { motion } from 'framer-motion'
import { Boxes } from 'lucide-react'

export function EnterExperienceButton({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onEnter}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-colors"
    >
      <Boxes size={18} />
      Enter 3D Experience
      <span className="absolute -inset-px rounded-2xl ring-1 ring-white/20" />
    </motion.button>
  )
}
