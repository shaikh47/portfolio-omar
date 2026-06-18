export interface ExperienceItem {
  company: string
  role: string
  duration: string
  location: string
  current?: boolean
  bullets: string[]
}

export interface SkillCategory {
  label: string
  skills: string[]
}

export interface Project {
  name: string
  description: string
  tech: string[]
  highlights: string[]
  github?: string
  live?: string
}

export interface EducationItem {
  institution: string
  degree: string
  duration: string
  location: string
  gpa?: string
  highlights?: string[]
}

export interface Award {
  date: string
  place: string
  event: string
  venue: string
}

export interface ResumeData {
  name: string
  title: string
  location: string
  email: string
  github: string
  linkedin: string
  phone: string
  tagline: string
  summary: string
  experience: ExperienceItem[]
  skills: SkillCategory[]
  projects: Project[]
  education: EducationItem[]
  awards: Award[]
}
