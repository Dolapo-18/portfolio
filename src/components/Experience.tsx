import { experience, experienceIntro } from "../data/experience.ts";
import { isPlaceholder } from "../lib/utils.ts";
import { PlaceholderText } from "./PlaceholderText.tsx";
import { Section, SectionHeading } from "./Section.tsx";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        number="03"
        eyebrow="Experience"
        title="Software, support, and the processes in between."
        description={experienceIntro}
      />
      <ol className="mt-12 space-y-6 border-l border-line pl-6 sm:pl-8">
        {experience.map((role) => (
          <li key={role.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-7 -left-[31px] size-3 rounded-full bg-accent ring-4 ring-canvas sm:-left-[39px]"
            />
            <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              {isPlaceholder(role.title) ? (
                <h3 className="font-display text-xl font-semibold text-ink">{role.focus}</h3>
              ) : (
                <>
                  <p className="font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">{role.focus}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">{role.title}</h3>
                </>
              )}
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <PlaceholderText value={role.employer} />
                {isPlaceholder(role.dates) ? null : (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{role.dates}</span>
                  </>
                )}
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-ink uppercase">Responsibilities</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-ink uppercase">Key achievements</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {role.achievements.map((item) => (
                      <li key={item} className="flex gap-2">
                        {isPlaceholder(item) ? null : (
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        )}
                        <PlaceholderText value={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
