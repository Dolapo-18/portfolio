# Dolapo Ogunyemi — Portfolio

Personal portfolio for Dolapo Ogunyemi, a software engineer and application support specialist. The site is a static React application. It does not need a backend to render.

## Before you publish

Replace the placeholders below. The site is built to show them clearly rather than invent missing details.

- [x] `src/data/profile.ts` — email, LinkedIn, GitHub, and Lagos, Nigeria
- [x] Profile photograph — `src/assets/profile_image.png`, shown in the hero
- [x] Resume — `public/Resume-Dolapo-Ezekiel-Ogunyemi.pdf`, linked from Download Resume
- [ ] `src/data/experience.ts` — job titles and employment dates. They stay hidden until you replace the placeholder text. Employer is Linkage Assurance Plc
- [ ] `src/data/projects.ts` — live demo and GitHub links, and screenshots that contain no private data
- [ ] ITIL certification — confirm the exact certificate title before quoting it formally
- [ ] `.env.local` — site URL, and EmailJS only if you want the form to send without an email app

Empty or bracketed links are shown as text. They are not rendered as real links.

## Requirements

- Node.js 20 or newer (developed with Node.js 24)
- npm

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and create the production site in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |

## Where to edit content

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, summary, photo, email, LinkedIn, GitHub, CV path, biography, education, certifications |
| `src/data/skills.ts` | Skill groups and badges |
| `src/data/experience.ts` | Experience timeline |
| `src/data/projects.ts` | Project cards. Copy the commented example at the bottom of the file to add a project |
| `src/data/process.ts` | “How I work” steps |

Project cards support a title, category, description, technology stack, image, GitHub URL, live demo URL, and a status of `Completed`, `In Development`, or `Concept`. Leave `githubUrl` or `liveUrl` unset when you do not have a public URL. Do not link private company repositories or upload confidential screenshots, customer data, or API keys.

The hero portrait is `src/assets/profile_image.png`. To replace it, swap that file or change the import in `src/data/profile.ts`, and keep `imageAlt` as a short description of the picture.

## Contact form

By default the form validates the fields and opens the visitor’s email app with the message filled in. The page does not claim the message was sent. The visitor still has to send it from their email app.

That path needs a real address in `profile.email`. Until then, submitting the form explains that delivery is not configured.

To send from the page with [EmailJS](https://www.emailjs.com/):

1. Create an EmailJS service, template, and public key.
2. In the template, use these variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, and `{{message}}`.
3. Copy `.env.example` to `.env.local` and set:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Restart `npm run dev`.

The public key is visible in the built site. That is how EmailJS browser sending works. Do not put private API secrets in any `VITE_` variable.

A success message is shown only after EmailJS accepts the message.

## Theme

The first visit follows the operating system’s light or dark setting, and otherwise uses the dark theme. The header control stores the choice in `localStorage`.

## Production build

```bash
npm run build
npm run preview
```

`dist/` is a static site. Any static host can serve it.

Set `VITE_SITE_URL` before building if you want an absolute canonical URL, Open Graph image URL, and `sitemap.xml`. Example:

```bash
VITE_SITE_URL=https://yourname.github.io/portfolio npm run build
```

Without that variable, the build still succeeds. `robots.txt` is included either way. The sitemap is added only when the site URL is set.

## Deploy on Render

The repository includes `render.yaml` for a Render static site named `dolapo-ogunyemi-portfolio`.

1. Push this repository to GitHub.
2. In the [Render dashboard](https://dashboard.render.com), choose **New → Blueprint** and select the repository.
3. Render builds with `npm ci && npm run build` and publishes `dist/`.
4. The public URL is `https://dolapo-ogunyemi-portfolio.onrender.com` unless that name is already taken.

`VITE_BASE_PATH` is `/` on Render. Leave it that way. The GitHub Pages workflow is separate and uses `/portfolio/`.

Optional EmailJS variables can be added in the Render service environment. They are read when the site is built, so change them and redeploy.

## Deploy on Vercel

Vercel is the simplest host for this project.

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Leave `VITE_BASE_PATH` empty.
7. Optional environment variables: `VITE_SITE_URL` and the EmailJS variables.

## Deploy on GitHub Pages

These steps match a repository named `portfolio`, published at `https://USERNAME.github.io/portfolio/`.

1. Create a public GitHub repository named `portfolio`.
2. In the repository, open **Settings → Pages → Build and deployment**, and set **Source** to **GitHub Actions**.
3. Optional: add repository **variables** (Settings → Secrets and variables → Actions → Variables):
   - `SITE_URL` = `https://USERNAME.github.io/portfolio`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Push the `main` branch. `.github/workflows/pages.yml` builds with `VITE_BASE_PATH=/portfolio/` and deploys `dist/`.

From your machine:

```bash
git init
git add .
git commit -m "Add personal portfolio site"
git branch -M main
git remote add origin git@github.com:USERNAME/portfolio.git
git push -u origin main
```

If the repository name is not `portfolio`, change `VITE_BASE_PATH` in `.github/workflows/pages.yml` to `/your-repository-name/`. A user site published at `https://USERNAME.github.io/` should use `VITE_BASE_PATH=/`.

A blank page on GitHub Pages usually means the base path does not match the repository name, so the CSS and JavaScript files 404.

To build that GitHub Pages version locally:

```bash
VITE_BASE_PATH=/portfolio/ VITE_SITE_URL=https://USERNAME.github.io/portfolio npm run build
npm run preview
```

## Resume

Download Resume uses `public/Resume-Dolapo-Ezekiel-Ogunyemi.pdf`. Replace that file to update the download, and keep the same filename or change `cvPath` in `src/data/profile.ts`.

`scripts/generate-placeholder-cv.mjs` only rebuilds the old one-page starter, `public/dolapo-ogunyemi-cv.pdf`. It is not the resume linked on the site.

## Accessibility

The page uses semantic regions, keyboard-reachable controls, visible focus, labelled form fields, and a skip link. Animations are reduced when the visitor asks the operating system for reduced motion.
