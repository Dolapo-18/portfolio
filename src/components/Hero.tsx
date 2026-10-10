import { ArrowRight } from "lucide-react";
import { profile } from "../data/profile.ts";
import { withBase } from "../lib/utils.ts";
import { Container } from "./Section.tsx";

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden">
      <div className="hero-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:py-28">
        <div className="rise max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
            Software Engineer · Application Support · Power Platform
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Building Software That Solves{" "}
            <span className="text-accent">Real Business Problems.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.summary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground"
            >
              Explore My Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink"
            >
              Let&apos;s Connect
            </a>
          </div>
          <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">{profile.credibility}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
            {profile.heroStack.map((item) => (
              <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <figure className="rise rise-delay mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_24px_70px_-36px_rgba(7,11,20,0.55)]">
          <img
            src={withBase(profile.image)}
            alt={profile.imageAlt}
            width={960}
            height={1280}
            fetchPriority="high"
            decoding="async"
            className="aspect-[3/4] w-full object-cover object-[center_18%]"
          />
          <figcaption className="border-t border-line px-5 py-4">
            <p className="font-display text-base font-semibold text-ink">{profile.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{profile.title}</p>
            <p className="mt-2 text-sm text-muted">{profile.location}</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
