import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import type { ResumeData } from '../types'

interface ExperienceProps {
  data: ResumeData
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Career"
          title="Work Experience"
          subtitle="5+ years building production systems across AI, blockchain, and enterprise platforms."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-blue-500 via-neutral-200 to-transparent dark:via-neutral-700 hidden md:block" />

          <div className="flex flex-col gap-12">
            {data.experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:flex absolute left-0 top-1 w-10 h-10 rounded-xl items-center justify-center border-2 transition-colors ${
                    job.current
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500'
                  }`}
                >
                  <Briefcase size={16} />
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          {job.role}
                        </h3>
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-base font-semibold text-blue-500 dark:text-blue-400">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {job.duration}
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
