import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

function normalizeBase(value: string | undefined): string {
  if (!value || value === "/") return "/";
  const withSlash = value.startsWith("/") ? value : `/${value}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (/["'<>]/.test(url.href)) return "";
    const path = url.pathname.replace(/\/$/, "");
    return `${url.origin}${path}`;
  } catch {
    return "";
  }
}

function portfolioMeta(siteUrl: string, base: string): Plugin {
  let outDir = "";

  return {
    name: "portfolio-meta",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const image = siteUrl ? `${siteUrl}/og-image.svg` : `${base}og-image.svg`;
        const tags = [
          `<meta property="og:image" content="${image}" />`,
          `<meta name="twitter:image" content="${image}" />`,
          siteUrl ? `<meta property="og:url" content="${siteUrl}/" />` : "",
          siteUrl ? `<link rel="canonical" href="${siteUrl}/" />` : "",
        ]
          .filter(Boolean)
          .join("\n    ");

        return html.replace("<!-- absolute-meta -->", tags);
      },
    },
    closeBundle() {
      if (!outDir) return;
      mkdirSync(outDir, { recursive: true });
      const robots = siteUrl
        ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
        : "User-agent: *\nAllow: /\n";
      writeFileSync(resolve(outDir, "robots.txt"), robots);

      if (!siteUrl) {
        rmSync(resolve(outDir, "sitemap.xml"), { force: true });
        return;
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`;
      writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBase(env.VITE_BASE_PATH);
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  return {
    base,
    plugins: [react(), tailwindcss(), portfolioMeta(siteUrl, base)],
  };
});
