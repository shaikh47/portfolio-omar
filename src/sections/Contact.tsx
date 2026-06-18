import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import type { ResumeData } from '../types'

interface ContactProps {
  data: ResumeData
}

export function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400 mb-3"
        >
          Get in Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-5"
        >
          Let's work together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed max-w-xl mx-auto"
        >
          I'm currently open to new opportunities — whether it's a full-time role, collaboration, or
          just a conversation about tech. My inbox is always open.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200 hover:-translate-y-1"
          >
            <Mail size={18} />
            Say Hello
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Links row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {[
            {
              href: `https://github.com/${data.github}`,
              icon: <GithubIcon size={16} />,
              label: `github.com/${data.github}`,
            },
            {
              href: `https://linkedin.com/in/${data.linkedin}`,
              icon: <LinkedinIcon size={16} />,
              label: `linkedin.com/in/${data.linkedin}`,
            },
            {
              href: '#',
              icon: <MapPin size={16} />,
              label: data.location,
              noLink: true,
            },
          ].map(({ href, icon, label, noLink }) =>
            noLink ? (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-neutral-500 dark:text-neutral-400"
              >
                {icon}
                {label}
              </span>
            ) : (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-200"
              >
                {icon}
                {label}
              </a>
            )
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-xs text-neutral-400 dark:text-neutral-600"
        >
          Designed &amp; built by Omar Shaikh · {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  )
}
