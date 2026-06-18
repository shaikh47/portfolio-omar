import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../components/icons'
import { SectionHeading } from '../components/SectionHeading'
import type { ResumeData } from '../types'

interface ProjectsProps {
  data: ResumeData
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Work"
          title="Technical Projects"
          subtitle="A selection of personal and research projects spanning web, IoT, and systems programming."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group flex flex-col p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-900/5 dark:hover:shadow-neutral-900/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                  {project.name.charAt(0)}
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub repository"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live demo"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2 leading-snug">
                {project.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mb-5 space-y-1.5">
                {project.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
