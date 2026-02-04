# Cloudflare Pages Deployment Guide

## Build Configuration

This project is optimized for Cloudflare Pages deployment with static export.

### Cloudflare Dashboard Settings

Configure your Cloudflare Pages project with these settings:

1. **Framework preset**: `Next.js (Static HTML Export)`
2. **Build command**: `npm run deploy`
3. **Build output directory**: `out`
4. **Root directory**: (leave empty or `/`)
5. **Node version**: `22.16.0` (or set `NODE_VERSION` environment variable)

### Environment Variables

Add these to Cloudflare Pages environment variables:

```
NODE_ENV=production
NODE_VERSION=22.16.0
```

For email functionality, add your email service credentials:

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=contact@tmkdo.com
```

## Local Build Testing

Test the production build locally:

```bash
npm run build
```

This will:
1. Clean previous build artifacts (`.next/` and `out/`)
2. Create optimized production build
3. Generate static files in `out/` folder (approx. 1.9 MB)

## Deployment Size

- **Static output**: ~1.9 MB (well within Cloudflare's 25 MiB limit)
- **Build cache**: `.next/` folder is excluded from deployment (git ignored)

## What Gets Deployed

Only the `/out` folder is deployed, containing:
- Static HTML pages
- Optimized JavaScript bundles
- CSS files
- Image assets
- Static assets from `/public`

## What Doesn't Get Deployed

- `.next/` folder (build cache, 40+ MiB)
- `node_modules/` (only needed during build)
- Source files in `src/`
- Development configuration files

## Troubleshooting

If deployment fails with size errors:
1. Verify `.next/` is in `.gitignore`
2. Check build output directory is set to `out` in Cloudflare
3. Ensure you're pushing only the `out/` folder content

## Manual Deployment with Wrangler

If you prefer CLI deployment:

```bash
npm run build
npx wrangler pages deploy out --project-name=tmkdo
```

Note: You must be logged in with `wrangler login` first.
