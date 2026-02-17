# Decap CMS Setup Guide for Cloudflare Pages

## Overview

This CMS uses **Cloudflare Worker authentication** with Supabase for user management, providing a custom authentication solution that doesn't require third-party services.

## Setup Steps

### 1. Create GitHub OAuth App

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `TMKDO CMS`
   - **Homepage URL**: `https://www.tmkdo.com`
   - **Authorization callback URL**: `https://www.tmkdo.com/admin/`
4. Click **"Register application"**
5. **Copy the Client ID** (you'll need this)
6. Click **"Generate a new client secret"** and **copy the secret**

### 2. Add Client ID to config.yml

After creating the GitHub OAuth App, add your **Client ID** to `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: MEK2001/tmkdo
  branch: main
  base_url: https://www.tmkdo.com
  auth_type: implicit
  app_id: YOUR_GITHUB_CLIENT_ID_HERE  # Replace with your actual Client ID
  auth_scope: repo
```

**Note**: The Client ID is safe to include in public config files. Only the Client Secret needs to be kept private, and with `implicit` auth flow, you don't need the secret.

### 3. Access the CMS

1. Visit `https://www.tmkdo.com/admin`
2. Click **"Login with GitHub"**
3. Authorize the application
4. You'll be redirected back to the CMS dashboard

### 4. Permissions Required

The GitHub OAuth app needs these permissions:
- ✅ **Read repository contents**
- ✅ **Write repository contents** (to create/edit posts)
- ✅ **Read user email** (optional, for author info)

These are automatically requested during OAuth flow.

## Troubleshooting

### Error: "Unable to access identity settings"

- ✅ **Fixed**: Changed backend from `git-gateway` to `github`
- Make sure GitHub OAuth App is configured correctly
- Verify callback URL matches exactly: `https://www.tmkdo.com/admin/`

### Error: "Repository not found"

- Verify `repo: MEK2001/tmkdo` matches your GitHub username/repo
- Ensure the OAuth app has access to the repository

### CMS loads but can't save

- Check that GitHub OAuth app has write permissions
- Verify you're logged in with a GitHub account that has write access to the repo

## Security Notes

- Never commit `GITHUB_CLIENT_SECRET` to your repository
- Use Cloudflare Pages environment variables for secrets
- Keep your GitHub OAuth app credentials secure
