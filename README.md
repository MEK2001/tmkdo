# The Minimalist Kraft & DO

A beautiful, minimalist home decor blog website built with pure HTML and CSS.

## 🚀 Cloudflare Pages Deployment Guide

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**
   - Navigate to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click on "Workers & Pages" in the sidebar
   - Click "Create application" → "Pages" → "Connect to Git"

2. **Connect Your GitHub Repository**
   - Select your GitHub account
   - Choose the `tmkdo` repository
   - Click "Begin setup"

3. **Configure Build Settings**
   - **Project name**: `tmkdo`
   - **Production branch**: `main` (or your default branch)
   - **Build command**: Leave empty (or use: `echo "No build required"`)
   - **Build output directory**: `.` (current directory)
   - **Root directory**: `/` (root)

4. **Save and Deploy**
   - Click "Save and Deploy"
   - Your site will be live at `https://tmkdo.pages.dev`

### Option 2: Deploy via Wrangler CLI

If you prefer using the command line:

```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Pages
wrangler pages deploy . --project-name=tmkdo
```

### Important Configuration Notes

- **Build Command**: Leave empty for static HTML sites
- **Output Directory**: `.` (all HTML files are in root)
- **Framework Preset**: None (or Static HTML)
- **Node Version**: Not required for static sites

### Troubleshooting

If you encounter the "compatibility_date" error:
- Ensure `wrangler.toml` exists in your repository root
- The file should contain `compatibility_date = "2026-01-26"`
- The `name` field should match your project name: `tmkdo`

### Custom Domain Setup

1. In Cloudflare Pages dashboard, go to your project
2. Click "Custom domains"
3. Add your domain
4. Follow DNS configuration instructions

## 📁 Project Structure

```
tmkdo/
├── index.html          # Homepage
├── about.html          # About page
├── contact.html        # Contact page
├── blog-post-1.html    # Blog post 1
├── blog-post-2.html    # Blog post 2
├── blog-post-3.html    # Blog post 3
├── wrangler.toml       # Cloudflare configuration
└── README.md          # This file
```

## 🎨 Features

- Fully responsive design
- Modern, minimalist aesthetic
- Smooth animations and transitions
- SEO-friendly structure
- Fast loading static pages

## 📝 Notes

- All styling is embedded in each HTML file for simplicity
- No build process required - pure HTML/CSS
- Images use Unsplash CDN (can be replaced with local images)

## 🔧 Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

