# Quick Fix: Cloudflare Dashboard Settings

## Change These Settings IMMEDIATELY

Go to: **Cloudflare Dashboard → Pages → Your Project → Settings → Builds & deployments**

### BEFORE (❌ Wrong - causes errors)
```
Framework preset:        Next.js (Static HTML Export)
Build command:           npm run deploy
Build output directory:  out
```

### AFTER (✅ Correct - will work)
```
Framework preset:        Next.js
Build command:           npm run deploy  
Build output directory:  .vercel/output/static
```

## Environment Variables

Make sure you have:
```
NODE_VERSION=22
```

## After Changing Settings

1. **Clear build cache**: Settings → Build cache → Clear
2. **Deploy**: Go to Deployments → Retry deployment

## That's It!

Once you change these 3 settings, your deployment will succeed.
The key change is:
- `Next.js (Static HTML Export)` → `Next.js`
- `out` → `.vercel/output/static`

Your API routes will work as Cloudflare Functions automatically.
