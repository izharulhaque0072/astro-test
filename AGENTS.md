# Repository Guide

## Project
- Astro 5 frontend using React 19 islands and Tailwind CSS 4 through Vite.
- Pages are in `src/pages/`; the homepage is `src/pages/index.astro`.
- Shared document shell and metadata are in `src/layouts/SiteLayout.astro`.
- The contact form is the React component `src/components/ContactForm.jsx`; keep other UI in Astro unless browser-side interactivity is needed.
- WordPress REST API helpers are in `src/lib/wordpress.js`. Homepage insight fetching and fallback content are in `src/pages/index.astro`.
- Global styles are in `src/styles/global.css`; responsive overrides are in `src/styles/responsive.css`.

## Commands
- Install dependencies with `npm install`.
- Start the local server with `npm run dev`.
- Verify production output with `npm run build`; inspect it locally with `npm run preview`.
- There are currently no test or lint scripts. Do not claim they passed; use the production build as the main available validation.

## Conventions
- Follow the existing Astro component and JSX styles, and keep changes scoped to the owning file.
- Prefer Astro-rendered markup; add or expand a React island only for client-side behavior.
- Keep page-wide and responsive styles in `src/styles/global.css` unless a component-specific styling pattern is introduced by the project.
- Preserve the WordPress fallback behavior so the homepage remains usable when the API is unavailable.
- Public configuration may use `PUBLIC_` environment variables. Never put WordPress admin credentials or other secrets in client-visible code.
- Update `site` in `astro.config.mjs` when configuring a deployment domain.

## Content and Assets
- The current homepage includes placeholder Unsplash images and sample brand/testimonial content; use approved production assets and verified copy when replacing them.
- The WordPress API base can be configured with `WORDPRESS_API_URL`; the contact form uses `PUBLIC_WP_CONTACT_FORM_ID`.