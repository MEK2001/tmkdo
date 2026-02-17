# Cloudflare Pages Deployment Guide

## Build Configuration

This project uses `@cloudflare/next-on-pages` to deploy a **full Next.js application** (including API routes) to Cloudflare Pages.

### Cloudflare Dashboard Settings

Configure your Cloudflare Pages project with these settings:

1. **Framework preset**: `Next.js`
2. **Build command**: `npm run deploy`
3. **Build output directory**: `.vercel/output/static`
4. **Root directory**: (leave empty or `/`)
5. **Node version**: `22` (or set `NODE_VERSION` environment variable)

### Environment Variables

Add these to Cloudflare Pages environment variables:

```
NODE_VERSION=22
```

For email functionality, add your email service credentials:

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=contact@tmkdo.com
```

For GitHub admin functionality, add:

```
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_username
GITHUB_REPO=tmkdo
```

## Local Build Testing

Test the production build locally:

```bash
# Standard Next.js build
npm run build

# Cloudflare Pages build  
npm run deploy

# Preview locally with Wrangler
npm run preview
```

## What Gets Deployed

The `.vercel/output/static` folder contains:
- Static HTML pages
- Optimized JavaScript bundles
- CSS files
- Image assets
- API routes as Cloudflare Functions

## API Routes Support

All your API routes will work as Cloudflare Functions:
- `/api/admin/posts/*` - Admin post management
- `/api/admin/settings` - Settings management
- `/api/contact` - Contact form

## Troubleshooting

### Build fails with "output: export" error
- Make sure Framework preset is `Next.js` (NOT "Next.js (Static HTML Export)")
- Build output directory must be `.vercel/output/static`
- Build command must be `npm run deploy`

### API routes not working
- Verify environment variables are set in Cloudflare Dashboard
- Check Functions logs in Cloudflare Pages deployment

### Type errors during build
- All route handlers must use async params: `{ params: Promise<{ slug: string }> }`
- Run `npx tsc --noEmit` locally to check for type errors

## Manual Deployment with Wrangler

If you prefer CLI deployment:

```bash
npm run deploy
npx wrangler pages deploy .vercel/output/static --project-name=tmkdo
```

Note: You must be logged in with `wrangler login` first.

## Deploy to Cloudflare Pages

1. Push your changes to GitHub:
```bash
git add .
git commit -m "fix: configure for cloudflare pages with API routes support"
git push
```

2. In Cloudflare Dashboard → Pages → Your Project → Settings → Builds & deployments:
   - Update the settings as shown above
   - Clear build cache
   - Trigger a new deployment

Your deployment should now succeed with all API routes working!
