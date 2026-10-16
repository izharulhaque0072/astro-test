# Dignitas Digital — Astro + React + Tailwind

A responsive homepage starter based on the supplied design. Astro renders the page, Tailwind CSS is enabled, React powers the contact form, and public WordPress content is fetched from `https://dignitas.digital/wp-json/wp/v2/`.

## Requirements
- Node.js 20.3+ (recommended)
- npm

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Open the local URL printed by Astro (usually `http://localhost:4321`).

## WordPress integration
- API helper: `src/lib/wordpress.js`
- Homepage insights query: `src/pages/index.astro`
- WordPress API base defaults to `https://dignitas.digital/wp-json/wp/v2/`.
- The homepage fetches the latest two published posts with `_embed=1` and `_fields` to reduce payload size. If the API is unavailable, fallback insight cards keep the homepage usable.
- This rebuild uses Astro components for the visual layout. Elementor's rendered layout is not automatically imported by the standard REST API; create/rebuild section layouts in Astro and fetch editable content from WordPress.

## Contact form setup (Contact Form 7)
1. In WordPress, create or identify a Contact Form 7 form with fields named `your-name`, `your-email`, and `your-message`.
2. Copy its numeric form ID.
3. Set `PUBLIC_WP_CONTACT_FORM_ID=123` in `.env` (replace `123` with your ID), restart the dev server, and test a submission.
4. If your existing CF7 form uses different field names, update `src/components/ContactForm.jsx` to match them.
5. If the browser blocks the request, configure WordPress/CORS or proxy submissions through a server endpoint. Never expose WordPress admin credentials in frontend code.

## Design notes
- Main homepage sections follow the attached reference.
- Images currently use Unsplash source URLs as replaceable placeholders. Replace these with approved Dignitas media URLs from the WordPress Media Library for production.
- The logo is recreated as text/letter styling. Replace it with the official SVG/PNG logo when available.
- Update `site` in `astro.config.mjs` before deployment.

## Production build
```bash
npm run build
npm run preview
```

This starter is intended as a frontend rebuild, not a direct conversion of Elementor's page-builder data into pixel-perfect Astro markup.
