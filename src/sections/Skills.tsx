import { motion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import type { ResumeData } from '../types'

interface SkillsProps {
  data: ResumeData
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
  Backend: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30',
  Blockchain: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
  Database: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  'Tools & Infra': 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
  Languages: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
}

const DOT_COLORS: Record<string, string> = {
  Frontend: 'bg-blue-500',
  Backend: 'bg-violet-500',
  Blockchain: 'bg-amber-500',
  Database: 'bg-emerald-500',
  'Tools & Infra': 'bg-rose-500',
  Languages: 'bg-neutral-500',
}

export function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Expertise"
          title="Technical Skills"
          subtitle="A curated view of the technologies I work with daily and have used in production."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`w-2.5 h-2.5 rounded-full ${DOT_COLORS[category.label] ?? 'bg-blue-500'}`} />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
                  {category.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${CATEGORY_COLORS[category.label] ?? ''} transition-transform hover:scale-105`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
