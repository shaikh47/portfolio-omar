import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import type { ResumeData } from '../types'

interface EducationProps {
  data: ResumeData
}

export function Education({ data }: EducationProps) {
  return (
    <section id="education" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Academic"
          title="Education"
          subtitle="A strong academic foundation with a near-perfect GPA and merit scholarships."
        />

        {/* Education cards */}
        <div className="flex flex-col gap-6 mb-20">
          {data.education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex gap-5 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">{edu.institution}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{edu.degree}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{edu.duration}</p>
                    {edu.gpa && (
                      <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 mt-0.5">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                </div>
                {edu.highlights && (
                  <ul className="mt-3 space-y-1.5">
                    {edu.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-neutral-500 dark:text-neutral-500">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3"
          >
            <Award size={20} className="text-amber-500" />
            Honors &amp; Awards
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.awards.map((award, i) => (
              <motion.div
                key={`${award.date}-${award.event}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-amber-200 dark:hover:border-amber-700/50 transition-all duration-200"
              >
                <span className="mt-0.5 text-lg">🏆</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    <span className="text-amber-600 dark:text-amber-400">{award.place}</span>
                    {' — '}
                    {award.event}
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {award.venue} · {award.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
