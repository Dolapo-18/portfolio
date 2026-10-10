const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(" ");
}

export function withBase(path: string): string {
  if (!path) return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("mailto:")) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  if (path.startsWith(base)) return path;
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${trimmed}`;
}

export function isConfiguredUrl(url?: string): url is string {
  if (!url || url.includes("[") || url.toLowerCase().includes("add ")) return false;

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function isConfiguredEmail(value?: string): value is string {
  if (!value) return false;
  if (value.includes("[") || value.toLowerCase().includes("add ")) return false;
  return EMAIL_PATTERN.test(value.trim());
}

export function isPlaceholder(value: string): boolean {
  return /^\s*\[/.test(value);
}

export function trapTabKey(event: KeyboardEvent, container: HTMLElement | null): void {
  if (event.key !== "Tab" || !container) return;

  const focusable = [...container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])")].filter(
    (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1,
  );

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
