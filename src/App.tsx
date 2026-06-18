import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Education } from './sections/Education'
import { Contact } from './sections/Contact'
import { resumeData } from './data/resume'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <Navbar />
      <main>
        <Hero data={resumeData} />
        <About data={resumeData} />
        <Experience data={resumeData} />
        <Skills data={resumeData} />
        <Projects data={resumeData} />
        <Education data={resumeData} />
        <Contact data={resumeData} />
      </main>
    </div>
  )
}

export default App
