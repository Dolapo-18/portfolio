import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { capabilityStateLabel, type Project } from "../data/projects.ts";
import { isConfiguredUrl, trapTabKey } from "../lib/utils.ts";
import { GitHubIcon } from "./BrandIcons.tsx";

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      trapTabKey(event, containerRef.current);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const githubUrl = isConfiguredUrl(project.githubUrl) ? project.githubUrl : "";
  const liveUrl = isConfiguredUrl(project.liveUrl) ? project.liveUrl : "";
  const titleId = `${project.id}-dialog-title`;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-[#070b14]/75" aria-label="Close project details" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(90vh,820px)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{project.category}</p>
            <h3 id={titleId} className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">{project.status}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{project.description}</p>

        <h4 className="mt-6 text-sm font-semibold tracking-wide text-ink uppercase">Capabilities</h4>
        <ul className="mt-3 space-y-2">
          {project.capabilities.map((capability) => (
            <li key={capability.label} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2">
              <span className="text-sm text-ink">{capability.label}</span>
              <span className="rounded-full bg-canvas px-2 py-1 text-xs font-semibold text-muted">{capabilityStateLabel[capability.state]}</span>
            </li>
          ))}
        </ul>

        {project.stack.length > 0 ? (
          <>
            <h4 className="mt-6 text-sm font-semibold tracking-wide text-ink uppercase">Technology stack</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item} className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-sm text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {(githubUrl || liveUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {githubUrl ? (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink">
                <GitHubIcon />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {liveUrl ? (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink">
                Live site
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
