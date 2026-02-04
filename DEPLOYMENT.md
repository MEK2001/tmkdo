# Deployment Guide for TMKDO

## Cloudflare Pages (Recommended)

Your site uses static export which is perfect for Cloudflare Pages!

### Configuration Steps

1. **In Cloudflare Dashboard**, go to your Pages project
2. **Settings → Build & Deployments**
3. Set these build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`
4. Add any environment variables if needed (like email credentials)
5. **Deploy**

### Why This Works
- Your `next.config.ts` has `output: 'export'` which generates `/out` folder (~114 kB)
- `.next/` folder is completely ignored (in `.gitignore`)
- Only static files deploy (no cache files)
- Fast, reliable, serverless deployment

### Clear Any Previous Builds

If you've already pushed `.next/` to git, you may need to:
```bash
git rm -r .next --cached
git commit -m "Remove .next from git"
git push
```

## Local Testing

```bash
# Clean build
rm -rf .next out

# Build locally
npm run build

# Test the static output
npm install -g serve
serve out -l 3000
```

Visit http://localhost:3000 to verify everything works.

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
