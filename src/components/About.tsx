import { Award, GraduationCap } from "lucide-react";
import { about } from "../data/profile.ts";
import { Section, SectionHeading } from "./Section.tsx";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.75fr)] lg:gap-16">
        <div>
          <SectionHeading
            number="01"
            eyebrow="About"
            title="Technical work, grounded in how the business actually runs."
            description="From IT support to software engineering and process automation, the through-line is practical systems for real users."
          />
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 content-start">
          <article className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">Education</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {about.education.map((item) => (
                <li key={item.credential} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-ink">{item.credential}</p>
                    {item.status ? (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                        {item.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-ink">{item.school}</p>
                  {item.detail ? <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p> : null}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <Award className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">Certifications</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {about.certifications.map((item) => (
                <li key={item.name} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                  <p className="font-semibold text-ink">{item.name}</p>
                  {item.note ? <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p> : null}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </Section>
  );
}
