# ⚠️ CRITICAL: Cloudflare Pages Deployment Fix

## The Problem Was
`.next/cache/webpack/` folder (40+ MiB) was being deployed to Cloudflare Pages, exceeding the 25 MiB limit.

## The Solution (Applied)
✅ Completely eradicated `.next/` from deployment
✅ Updated `.gitignore` to prevent `.next/` commits
✅ Configured to deploy only `/out` folder (static export)

## What You Must Do NOW

### 1. In Cloudflare Dashboard
**Go to: Pages Project → Settings → Build & Deployments**

Set EXACTLY these values:
```
Build command:            npm run build
Build output directory:   out
Root directory:           /
```

**DO NOT** use any other configuration!

### 2. Clear Build Cache (if stuck)
In Cloudflare Dashboard:
- **Settings → Build & Deployments → Build cache**
- Click **Clear build cache**
- Trigger a new deployment

### 3. Commit These Changes Locally
```bash
git add .
git commit -m "brutal-fix: completely eradicate .next deployment issue"
git push
```

## Verification

Your deployment should show:
```
✓ Build successful
✓ Exporting (2/2)
✓ Site deployed successfully
Size: ~114 kB (only /out folder)
```

**NOT:**
```
✘ .next/cache/webpack/client-production/0.pack is 40 MiB in size
```

## Why This Works
- `next.config.ts` has `output: 'export'` → generates `/out` folder only
- `.gitignore` now has `*.next/**/*` → never committed
- Cloudflare deploys `/out` → small static files only
- NO `.next/cache` = NO size limit errors

## If Still Failing

1. **Hard reset to remote:**
   ```bash
   git fetch origin
   git reset --hard origin/main
   git push -f
   ```

2. **Clear Cloudflare cache:**
   - Go to Cloudflare Dashboard
   - Purge all cache
   - Trigger deploy again

## Vercel (Alternative)

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
