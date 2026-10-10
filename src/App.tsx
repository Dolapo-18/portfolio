import { About } from "./components/About.tsx";
import { Contact } from "./components/Contact.tsx";
import { Experience } from "./components/Experience.tsx";
import { Footer } from "./components/Footer.tsx";
import { Hero } from "./components/Hero.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Projects } from "./components/Projects.tsx";
import { Skills } from "./components/Skills.tsx";
import { SkipLink } from "./components/SkipLink.tsx";
import { WorkProcess } from "./components/WorkProcess.tsx";

export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <WorkProcess />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
