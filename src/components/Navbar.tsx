import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "../data/profile.ts";
import { useActiveSection } from "../hooks/useActiveSection.ts";
import { cn, withBase } from "../lib/utils.ts";
import { ThemeToggle } from "./ThemeToggle.tsx";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cvHref = withBase(profile.cvPath);
  const cvFileName = profile.cvPath.split("/").pop() ?? "resume.pdf";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        scrolled
          ? "border-line bg-canvas/90"
          : "border-transparent bg-canvas/75",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3 rounded-lg">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-lg border border-line bg-surface font-display text-sm font-semibold tracking-wide text-accent"
          >
            {profile.monogram}
          </span>
          <span className="sr-only sm:not-sr-only sm:inline sm:font-display sm:text-sm sm:font-semibold sm:tracking-tight">
            {profile.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium",
                active === item.id
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={cvHref}
            download={cvFileName}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            Download Resume
          </a>
          <a
            href={cvHref}
            download={cvFileName}
            aria-label="Download Resume"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink sm:hidden"
          >
            <Download className="size-4" aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className={cn(
          "border-t border-line px-5 py-4 md:hidden",
          open ? "grid" : "hidden",
        )}
      >
        <ul className="grid gap-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3 py-3 text-base font-medium",
                  active === item.id
                    ? "bg-accent-soft text-accent"
                    : "text-ink",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={cvHref}
          download={cvFileName}
          className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground"
          onClick={() => setOpen(false)}
        >
          <Download className="size-4" aria-hidden="true" />
          Download Resume
        </a>
      </nav>
    </header>
  );
}
