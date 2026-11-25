# Sijan Koirala

Independent web developer portfolio at **https://sijankoirala.com.np**.

React, Vite, and a Node.js build pipeline. The production build renders the page to static HTML, then React hydrates the interactive sculpture, project dialogs, navigation, and clipboard controls. No production server, API keys, or database is required.

## Local development

Use Node.js 24 LTS (minimum 22.12).

```sh
npm ci
npm run dev
```

## Build and check

```sh
npm run build
npx playwright install chromium
npm test
npm run preview
```

The build emits `dist/`, including prerendered HTML, local fonts, images, `CNAME`, `.nojekyll`, robots.txt, and a sitemap. Build validation checks the domain, HTML, and asset references. Browser checks cover desktop and mobile layouts, dialog keyboard behavior, services, copy email, reduced motion, and automated WCAG checks.

## Automatic GitHub Pages deployment

Every push to `main` runs `.github/workflows/deploy.yml`:

1. Install the exact lockfile with `npm ci` on Node.js 24.
2. Build and verify static output.
3. Run Chromium desktop, mobile, and accessibility checks.
4. Upload `dist/` and deploy to the `github-pages` environment.

Pull requests run the build and checks without deploying. A manual run is also available under Actions → Build and deploy portfolio.

The repository's **Settings → Pages → Source** must be **GitHub Actions**. Keep **Custom domain** set to **sijankoirala.com.np**. The existing repository was already configured this way at the time of the rebuild. The Vite base is `/` because the site uses a custom domain. With an Actions deployment, the Pages custom-domain setting is authoritative; `public/CNAME` also preserves the intended hostname in the output.

The domain is currently behind Cloudflare. Keep the existing DNS routing and TLS configuration. This build needs no DNS changes. When diagnosing stale content, compare the latest successful Actions deployment with the live page before clearing the relevant Cloudflare cache. Do not switch back to branch deployment: the React source needs the build step.

## Content and design

- `src/content.js`: project concepts, service descriptions, and social links.
- `src/App.jsx`: page sections, email address, interactive sculpture, and project views.
- `src/styles.css`: design tokens, responsive layouts, and code-built project artwork.
- `public/portrait.jpg`: Sijan's original portrait.
- `public/social-card.png`: social preview.
- `index.html`: title, description, canonical URL, and sharing metadata.

The three portfolio entries are explicitly labelled independent concept studies. Add genuine project URLs and outcomes when they are available; the site does not present the mockups as shipped client products.

Fonts are self-hosted using the OFL-licensed DM Sans and Space Grotesk packages. The artwork is rendered locally with SVG and CSS, with no external image or font requests.
