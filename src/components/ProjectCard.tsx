import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { capabilityStateLabel, type Project } from "../data/projects.ts";
import { cn, isConfiguredUrl, withBase } from "../lib/utils.ts";
import { GitHubIcon } from "./BrandIcons.tsx";

const statusClassName: Record<Project["status"], string> = {
  Completed: "bg-accent-soft text-accent",
  "In Development": "border border-line bg-canvas text-ink",
  Concept: "border border-dashed border-line bg-canvas text-muted",
};

function Cover({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();

  if (!project.image || failed) {
    return (
      <div className="grid h-full min-h-48 place-items-center bg-[#0c1424] text-4xl font-semibold text-[#7ef0dc]">
        <span aria-hidden="true">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={withBase(project.image)}
      alt={project.imageAlt}
      width={1200}
      height={750}
      loading="lazy"
      decoding="async"
      className="h-full min-h-48 w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function ProjectCard({
  project,
  featured = false,
  onViewDetails,
}: {
  project: Project;
  featured?: boolean;
  onViewDetails: (project: Project) => void;
}) {
  const githubUrl = isConfiguredUrl(project.githubUrl) ? project.githubUrl : "";
  const liveUrl = isConfiguredUrl(project.liveUrl) ? project.liveUrl : "";

  return (
    <article className={cn("card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface", featured && "md:grid md:grid-cols-2")}>
      <div className="relative min-h-48 bg-[#0c1424]">
        <Cover project={project} />
        <p className={cn("absolute top-4 left-4 rounded-full px-2.5 py-1 text-xs font-semibold", statusClassName[project.status])}>
          {project.status}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm text-muted">{project.category}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        {project.stack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technologies for ${project.title}`}>
            {project.stack.map((item) => (
              <li key={item} className="rounded-lg border border-line bg-canvas px-2 py-1 text-xs text-ink">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {project.capabilities.some((item) => item.state !== "implemented") ? (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Open details to see what is {capabilityStateLabel["in-development"].toLowerCase()} or {capabilityStateLabel.planned.toLowerCase()}. Those items are not completed features.
          </p>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground"
          >
            View details
          </button>
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink"
            >
              <GitHubIcon />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink"
            >
              Live site
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
