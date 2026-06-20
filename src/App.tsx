import { Suspense, lazy, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience as ExperienceSection } from "./sections/Experience";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";
import { EnterExperienceButton } from "./components/EnterExperienceButton";
import { resumeData } from "./data/resume";

// The 3D bundle (three / R3F / drei) is only fetched when the user opts in.
const Experience3D = lazy(() =>
  import("./experience/Experience").then((m) => ({ default: m.Experience })),
);

function App() {
  const [immersive, setImmersive] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <Navbar />
      <main>
        <Hero data={resumeData} />
        <About data={resumeData} />
        <ExperienceSection data={resumeData} />
        <Skills data={resumeData} />
        <Projects data={resumeData} />
        <Education data={resumeData} />
        <Contact data={resumeData} />
      </main>

      {!immersive && (
        <EnterExperienceButton onEnter={() => setImmersive(true)} />
      )}

      <AnimatePresence>
        {immersive && (
          <Suspense fallback={null}>
            <Experience3D onExit={() => setImmersive(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
