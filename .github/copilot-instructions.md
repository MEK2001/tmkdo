# Copilot instructions

## Project overview
- Next.js 15 App Router site with static export (`output: 'export'`) for Cloudflare Pages.
- Content comes from Markdown in `content/posts` and is rendered in the blog route.
- Layout is globalized in `src/app/layout.tsx` with Google fonts, GSAP scripts, `ThemeProvider`, and `SmoothScroll`.

## Architecture and data flow
- Blog list: `src/app/blog/page.tsx` calls `getAllPosts()` from `src/lib/posts.ts` and renders `BlogContentClient`.
- Blog detail: `src/app/blog/[slug]/page.tsx` calls `getPostBySlug()` and injects HTML via `dangerouslySetInnerHTML`.
- Markdown parsing uses `gray-matter` + `remark-html` in `src/lib/posts.ts`.
- Slugs are derived from filenames by stripping `YYYY-MM-DD-` prefixes; keep that convention for new posts.
- Shortcodes are expanded in `parseShortcodes()` (Amazon, YouTube, callout boxes). Keep shortcode syntax consistent when authoring content.

## Content and CMS
- CMS configuration is in `public/admin/config.yml` (GitHub backend, posts in `content/posts`).
- Post frontmatter keys used by the app: `title`, `date`, `category`, `image`, `excerpt`, `readTime`, `status`, `featured`, `tags`.

## APIs and integrations
- Contact form posts to `src/app/api/contact/route.ts` (Nodemailer). Requires env vars: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`.
- Site metadata is centralized in `src/lib/metadata.ts` and used for Open Graph/Twitter SEO.

## Styling and assets
- CSS Modules live alongside pages/components (for example `src/app/blog/page.module.css`).
- Global styles in `src/styles/globals.css`. Public assets in `public/`.
- Next image optimization is disabled for static export; remote images are allowed for Unsplash.

## Developer workflows
- Dev server: `npm run dev`
- Production build (also cleans): `npm run build`
- Lint: `npm run lint`
- Static export output: `out/` (Cloudflare Pages). See `CLOUDFLARE_DEPLOY.md` and `DEPLOYMENT.md` for deployment constraints.
