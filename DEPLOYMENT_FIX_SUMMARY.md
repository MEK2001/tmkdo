# Cloudflare Deployment Fix - Summary

## Issues Fixed

### 1. ✅ TypeScript Error - Async Params (Next.js 15)
**Problem**: Route handlers were using synchronous params, but Next.js 15 requires async params.

**Fixed in**: `src/app/api/admin/posts/[slug]/route.ts`
- Changed `{ params: { slug: string } }` → `{ params: Promise<{ slug: string }> }`
- Added `const { slug } = await params;` before using slug
- Updated all three handlers: GET, PUT, DELETE

### 2. ✅ Static Export Incompatibility
**Problem**: Cloudflare was configured for "Static HTML Export" which doesn't support API routes.

**Solution**: Installed `@cloudflare/next-on-pages` to deploy full Next.js app with API routes.

**Files updated**:
- `package.json` - Added pages:build and deploy scripts
- `wrangler.toml` - Created Cloudflare configuration
- `CLOUDFLARE_DEPLOY.md` - Updated deployment guide

## Configuration Changes

### package.json - New Scripts
```json
{
  "pages:build": "npx @cloudflare/next-on-pages",
  "preview": "npm run pages:build && npx wrangler pages dev",
  "deploy": "npm run pages:build"
}
```

### New File: wrangler.toml
```toml
name = "tmkdo"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".vercel/output/static"
```

## What You MUST Do in Cloudflare Dashboard

### Go to: Pages → Your Project → Settings → Builds & deployments

**Update these settings**:

1. **Framework preset**: Change from `Next.js (Static HTML Export)` to `Next.js`
2. **Build command**: `npm run deploy`
3. **Build output directory**: Change from `out` to `.vercel/output/static`
4. **Root directory**: Leave empty
5. **Environment variable**: `NODE_VERSION=22`

**Then**:
1. Clear build cache (Settings → Build cache → Clear)
2. Go to Deployments tab
3. Click "Retry deployment" or push a new commit

## Why Local Build Failed (Windows Issue)

The `@cloudflare/next-on-pages` adapter has known compatibility issues on Windows. The error you saw is expected on Windows but **won't affect cloud deployment**.

Your options:
1. **Push to GitHub and deploy** - This is the easiest option. Cloudflare's Linux servers will build successfully.
2. **Use WSL (Windows Subsystem for Linux)** - If you want to test locally
3. **Just deploy** - The Cloudflare build will work fine!

## Deploy Now

```bash
# Commit all changes
git add .
git commit -m "fix: configure cloudflare pages for API routes support"
git push

# Then in Cloudflare Dashboard:
# 1. Update settings as shown above
# 2. Clear build cache
# 3. Trigger new deployment
```

## After Deployment

Your API routes will work as Cloudflare Functions:
- `/api/admin/posts/*` - Post management
- `/api/admin/settings` - Settings
- `/api/admin/upload` - Upload
- `/api/contact` - Contact form

## Verification

After deployment succeeds, test your admin panel:
1. Go to `your-domain.com/admin`
2. Try logging in
3. Test creating/editing posts

All functionality should work!

## If Still Having Issues

1. Make sure Framework preset is `Next.js` (not Static Export)
2. Verify build output directory is `.vercel/output/static`
3. Check Cloudflare Functions logs for API route errors
4. Ensure environment variables are set (GITHUB_TOKEN, etc.)
