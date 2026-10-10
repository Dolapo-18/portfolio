import { navItems, profile } from "../data/profile.ts";
import { isConfiguredUrl } from "../lib/utils.ts";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons.tsx";

const year = new Date().getFullYear();

export function Footer() {
  const github = isConfiguredUrl(profile.githubUrl) ? profile.githubUrl : "";
  const linkedin = isConfiguredUrl(profile.linkedinUrl) ? profile.linkedinUrl : "";

  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,1.2fr)_auto_auto] md:items-start">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{profile.title}</p>
          <p className="mt-6 text-sm text-muted">© {year} {profile.name}</p>
          <p className="mt-1 text-sm text-muted">Built with React and TypeScript</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-ink">Navigate</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-muted hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-ink">Profiles</p>
          <ul className="mt-3 space-y-2">
            {github ? (
              <li>
                <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                  <GitHubIcon />
                  GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : (
              <li className="text-sm text-muted">[ADD GITHUB PROFILE URL]</li>
            )}
            {linkedin ? (
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
                  <LinkedInIcon />
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : (
              <li className="text-sm text-muted">[ADD LINKEDIN URL]</li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
