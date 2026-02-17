# Cloudflare Pages Deployment Guide (OpenNext)

## Overview

This project uses **OpenNext for Cloudflare** to deploy a full Next.js application (including API routes) to Cloudflare Pages.

## Build Configuration

### Cloudflare Dashboard Settings

Go to **Pages → Your Project → Settings → Builds & deployments** and configure:

1. **Framework preset**: `Next.js`
2. **Build command**: `npm run deploy`
3. **Build output directory**: `.cloudflare`
4. **Root directory**: (leave empty or `/`)
5. **Node version**: Set environment variable `NODE_VERSION=22`

### Environment Variables

Add these to Cloudflare Pages environment variables:

**Required**:
```
NODE_VERSION=22
```

**Optional** (for email functionality):
```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=contact@tmkdo.com
```

**Optional** (for GitHub CMS functionality):
```
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_username
GITHUB_REPO=tmkdo
```

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Production Build
```bash
# Build for Cloudflare
npm run pages:build

# Preview locally with Wrangler
npm run preview
```

## Deployment Process

### 1. Push Changes to GitHub

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 2. Cloudflare Auto-Deploy

Cloudflare Pages will automatically:
- Clone your repository
- Install dependencies
- Run `npm run deploy`
- Build with OpenNext
- Restructure output for Cloudflare Pages
- Deploy to production

### 3. Manual Deploy (Optional)

Using Wrangler CLI:

```bash
# Build locally
npm run pages:build

# Deploy to Cloudflare
npx wrangler pages deploy .cloudflare --project-name=tmkdo
```

Note: You must login first with `wrangler login`

## What's Deployed

The `.cloudflare` folder contains:
- **Server-rendered pages** - Dynamic content generation
- **Static pages** - Pre-rendered at build time
- **API routes as Cloudflare Functions**:
  - `/api/admin/posts/*` - Post management
  - `/api/admin/settings` - Settings API
  - `/api/admin/upload` - Image upload
  - `/api/contact` - Contact form
- **Static assets** - Images, CSS, JavaScript
- **Middleware** - Edge middleware for authentication

## API Routes Support

All Next.js API routes work natively on Cloudflare Pages with OpenNext:

✅ Server-side rendering (SSR)  
✅ API routes with dynamic parameters  
✅ Environment variables  
✅ Form submissions  
✅ File uploads  
✅ Database connections  
✅ External API calls  

## Configuration Files

### `open-next.config.ts`
Configures OpenNext adapter behavior:
```typescript
{
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
    },
  },
}
```

### `wrangler.toml`
Cloudflare Workers configuration:
```toml
name = "tmkdo"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".cloudflare"
```

### `next.config.ts`
Next.js configuration (no special Cloudflare setup needed)

### `scripts/postbuild.js`
Post-build script that restructures OpenNext output for Cloudflare Pages:
- Renames `worker.js` to `_worker.js` (Cloudflare Pages requirement)
- Moves static assets from `assets/` to root level
- Creates the `.cloudflare` directory with proper structure

This script runs automatically after OpenNext build via `npm run pages:build`.

## Troubleshooting

### Build fails on Windows

**Issue**: OpenNext shows warnings about Windows compatibility.

**Solution**: This is expected. The build may work but could encounter issues. For production builds, rely on Cloudflare's Linux servers which will build successfully.

### API routes return 404

**Issue**: API routes not found after deployment.

**Solution**: 
1. Verify build output directory is `.cloudflare`
2. Check API routes are listed in build output with ƒ symbol
3. Ensure environment variables are set in Cloudflare Dashboard

### Build succeeds but deployment fails

**Issue**: Cloudflare Pages deployment error.

**Solution**:
1. Clear build cache in Cloudflare Dashboard
2. Verify `wrangler.toml` has correct `pages_build_output_dir`
3. Check build logs for specific errors

### Type errors during build

**Issue**: TypeScript errors in API routes.

**Solution**: Ensure async params are properly typed:
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // ... use slug
}
```

## Migration from Old Adapter

If you previously used `@cloudflare/next-on-pages`:

1. ✅ Uninstalled deprecated adapter
2. ✅ Installed `@opennextjs/cloudflare`
3. ✅ Updated build scripts in package.json
4. ✅ Created `open-next.config.ts`
5. ✅ Updated `wrangler.toml`
6. ✅ Build output directory changed: `.vercel/output/static` → `.cloudflare`
7. ✅ Added post-build script to restructure output

## Additional Resources

- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Docs](https://nextjs.org/docs)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## Support

For issues with:
- **Next.js**: https://github.com/vercel/next.js/discussions
- **OpenNext**: https://github.com/opennextjs/opennextjs-cloudflare/issues
- **Cloudflare Pages**: https://community.cloudflare.com/

## Summary

Your Next.js app is now fully compatible with Cloudflare Pages using OpenNext! 🎉

Key benefits:
- ✅ Full Next.js 15 support
- ✅ API routes work as Cloudflare Functions
- ✅ Server-side rendering (SSR)
- ✅ Automatic deployments from GitHub
- ✅ Edge runtime for fast global delivery
- ✅ No code changes needed for routes
