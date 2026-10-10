import { useCallback, useState } from "react";
import { projects, type Project } from "../data/projects.ts";
import { cn } from "../lib/utils.ts";
import { ProjectCard } from "./ProjectCard.tsx";
import { ProjectDialog } from "./ProjectDialog.tsx";
import { Section, SectionHeading } from "./Section.tsx";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects" className="band">
      <SectionHeading
        number="04"
        eyebrow="Projects"
        title="Selected software and automation work."
        description="Live products, mobile apps still in development, and Power Platform solutions. A live link is shown when the project has a public address."
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        {projects.map((project, index) => {
          const featured = index === 0;
          return (
            <li key={project.id} className={cn(featured ? "md:col-span-2 xl:col-span-6" : "xl:col-span-2")}>
              <ProjectCard project={project} featured={featured} onViewDetails={setSelected} />
            </li>
          );
        })}
      </ul>
      <ProjectDialog project={selected} onClose={close} />
    </Section>
  );
}
