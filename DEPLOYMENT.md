# Deployment Guide for TMKDO

## Cloudflare Pages

The `.next/cache` folder is exceeding Cloudflare's 25 MiB size limit. Here are two solutions:

### Solution 1: Use Static Export (Recommended for Cloudflare)

Your site is already configured with `output: 'export'` in `next.config.ts`, which generates a static `out/` folder.

In your Cloudflare Pages settings:
1. **Build command**: `npm run build`
2. **Build output directory**: `out`
3. **Root directory**: `/`

This will deploy the static files without the `.next/cache` folder.

### Solution 2: Exclude Cache from Deployment

Make sure `.next/` is in your `.gitignore`:
```
.next/
```

Then commit and push your changes.

## Netlify (Alternative)

If you prefer Netlify for deployment:
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`
4. (Netlify automatically uses the `netlify.toml` configuration)

## Vercel (Alternative - Recommended for Next.js)

1. Go to vercel.com
2. Connect your GitHub repository
3. Vercel will automatically detect Next.js
4. Deploy with default settings

## Local Testing Before Deployment

```bash
npm run build
npm run start
```

## Troubleshooting

**Error: Pages only supports files up to 25 MiB**
- Solution: Ensure `out/` folder is used (not `.next/`)
- Make sure `.next/` is in `.gitignore`
- Clear build cache: `rm -rf .next out`

**Build fails**
- Check Node.js version matches (22.x)
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npm run build`
