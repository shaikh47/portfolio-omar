import { motion } from 'framer-motion'
import { Code2, Layers, Trophy, Users } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import type { ResumeData } from '../types'

interface AboutProps {
  data: ResumeData
}

const HIGHLIGHTS = [
  {
    icon: <Code2 size={20} />,
    label: '5+ Years',
    desc: 'Professional experience',
  },
  {
    icon: <Layers size={20} />,
    label: 'Full-Stack',
    desc: 'Frontend · Blockchain · IoT',
  },
  {
    icon: <Trophy size={20} />,
    label: '3.99 / 4.0',
    desc: 'CGPA — top of class',
  },
  {
    icon: <Users size={20} />,
    label: 'Team Lead',
    desc: 'Mentoring & code reviews',
  },
]

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionHeading label="About Me" title="Building with purpose" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6"
            >
              {data.summary}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-600 dark:text-neutral-400 leading-relaxed"
            >
              Outside of software, I'm passionate about robotics and embedded systems — having won
              multiple national robotics competitions and represented Bangladesh at JENESYS 2019 in
              Tokyo, Japan.
            </motion.p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {h.icon}
                </div>
                <p className="text-lg font-bold text-neutral-900 dark:text-white mb-0.5">
                  {h.label}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
