import { AppWindow, Database, LifeBuoy, Server, Workflow, type LucideIcon } from "lucide-react";
import { skillGroups, type SkillIconName } from "../data/skills.ts";
import { cn } from "../lib/utils.ts";
import { Section, SectionHeading } from "./Section.tsx";

const icons: Record<SkillIconName, LucideIcon> = {
  frontend: AppWindow,
  backend: Server,
  infrastructure: Database,
  power: Workflow,
  support: LifeBuoy,
};

export function Skills() {
  return (
    <Section id="skills" className="band">
      <SectionHeading
        number="02"
        eyebrow="Skills"
        title="Tools I use to build, integrate, and support software."
        description="Grouped by the kind of work. The projects show how these skills are used in practice."
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <li
              key={group.id}
              className={cn(
                "rounded-2xl border border-line bg-surface p-5",
                index < 3 ? "xl:col-span-2" : "xl:col-span-3",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-sm text-ink">
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
