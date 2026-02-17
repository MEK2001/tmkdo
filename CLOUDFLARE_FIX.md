# Fix Cloudflare Deployment - API Routes Support

## The Issue
Your app has API routes (`/api/admin/*`, `/api/contact`) but Cloudflare is configured for static export which doesn't support API routes.

## Solution: Use @cloudflare/next-on-pages

### Step 1: Install Dependencies
```bash
npm install --save-dev @cloudflare/next-on-pages
```

### Step 2: Update package.json Scripts
Change the build script to:
```json
"build": "next build",
"pages:build": "npx @cloudflare/next-on-pages",
"deploy": "npm run pages:build"
```

### Step 3: Update Cloudflare Pages Settings

In Cloudflare Dashboard → Your Project → Settings → Builds:

**Build command**: `npm run deploy`
**Build output directory**: `.vercel/output/static`
**Root directory**: `/`

**Add Environment Variable**:
```
NODE_VERSION=22
```

### Step 4: Add Wrangler Config (Optional but Recommended)

Create `wrangler.toml` in root:
```toml
name = "tmkdo"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".vercel/output/static"
```

### Step 5: Update .gitignore

Add these lines:
```
# Cloudflare
.vercel/
wrangler.toml
```

### Step 6: Deploy
```bash
git add .
git commit -m "fix: configure for cloudflare pages with API routes"
git push
```

## What This Does
- `@cloudflare/next-on-pages` converts your Next.js app to run on Cloudflare Pages
- API routes will work as Cloudflare Functions
- No need to remove any functionality
- Supports all Next.js features

## Alternative: Static Export Only (Remove API Routes)
If you want pure static site, you'd need to:
1. Remove all `/api` routes
2. Use external API service for admin/contact forms
3. Add `output: 'export'` to next.config.ts

But the first option is much better for your use case!
