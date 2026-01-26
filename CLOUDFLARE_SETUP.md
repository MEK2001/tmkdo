# Cloudflare Pages Setup Guide

## Step-by-Step Configuration

### After Clicking "Create application" → "Pages" → "Connect to Git"

#### 1. Select Repository
- Choose: `tmkdo` repository
- Click: **Begin setup**

#### 2. Project Name
```
tmkdo
```

#### 3. Production Branch
```
main
```
(Or your default branch name)

#### 4. Framework Preset
```
None
```
(Or "Static HTML" if available)

#### 5. Build Command
```
(Leave empty)
```
OR if required:
```
echo "No build required"
```

#### 6. Build Output Directory
```
.
```
(Just a period/dot)

#### 7. Root Directory
```
/
```
(Just a forward slash)

#### 8. Deploy Command
**Option A (Recommended - Simple):**
```
echo "Deploying static site"
```

**Option B (If Option A doesn't work):**
```
npx wrangler pages deploy . --project-name=tmkdo --compatibility-date=2026-01-26
```

**Option C (Original format - if others fail):**
```
npx wrangler deploy --assets=. --compatibility-date=2026-01-26
```

#### 9. Non-Production Branch Deploy Command
```
(Leave empty)
```

#### 10. Environment Variables
```
(Leave empty - not needed for static sites)
```

#### 11. Click "Save and Deploy"

---

## Troubleshooting

### If you get "Required" error on Deploy Command:
- Try Option A first (echo command)
- If that fails, try Option B
- If still failing, try Option C

### If you get "Internal error":
1. Clear browser cache
2. Try different browser
3. Check browser console (F12) for errors
4. Wait 5 minutes and try again

### If deployment fails:
1. Check build logs in Cloudflare dashboard
2. Verify `wrangler.toml` is in repository root
3. Ensure all HTML files are in root directory
4. Check that `compatibility_date` is set in `wrangler.toml`

---

## Expected Result

After successful deployment:
- Site URL: `https://tmkdo.pages.dev`
- All pages should be accessible
- No build errors in logs

---

## Files That Should Be in Repository

✅ `index.html`
✅ `about.html`
✅ `contact.html`
✅ `blog-post-1.html`
✅ `blog-post-2.html`
✅ `blog-post-3.html`
✅ `wrangler.toml`
✅ `README.md`
✅ `package.json`
✅ `.gitignore`

