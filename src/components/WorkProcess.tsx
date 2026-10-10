import { workSteps } from "../data/process.ts";
import { Section, SectionHeading } from "./Section.tsx";

export function WorkProcess() {
  return (
    <Section id="approach">
      <SectionHeading
        number="05"
        eyebrow="How I work"
        title="From the operational problem to software people can rely on."
      />
      <div className="relative mt-12">
        <span aria-hidden="true" className="pointer-events-none absolute top-4 right-6 left-6 hidden h-px bg-line lg:block" />
        <ol className="lg:grid lg:grid-cols-6 lg:gap-5">
        {workSteps.map((step, index) => (
          <li key={step.step} className="relative pb-8 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
            {index < workSteps.length - 1 ? (
              <span aria-hidden="true" className="absolute top-4 bottom-0 left-[15px] w-px bg-line lg:hidden" />
            ) : null}
            <div className="absolute top-0 left-0 z-10 grid size-8 place-items-center rounded-full border border-line bg-surface font-mono text-[11px] font-semibold text-accent lg:static">
              {step.step}
            </div>
            <h3 className="font-display text-base leading-snug font-semibold text-ink lg:mt-4">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
        </ol>
      </div>
    </Section>
  );
}
