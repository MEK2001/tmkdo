# TMKDO Custom CMS Documentation

## 🎉 Welcome to Your New Custom CMS!

Your Decap CMS has been completely replaced with a modern, custom-built headless CMS inspired by the best features of **Sanity**, **Strapi**, and **Contentful**.

---

## ✨ Features

### 🔐 **Authentication**
- Secure login via Supabase
- Session management with localStorage
- GitHub token integration for content management

### 📝 **Content Management**
- **Blog Posts**: Create, edit, and delete blog posts
- **Rich Markdown Editor**: Full markdown support with syntax highlighting
- **Metadata Management**: Title, slug, excerpt, author, category, tags, publication status
- **Image Upload**: Direct upload to GitHub repository
- **Real-time Preview**: See changes as you edit

### ⚙️ **Site Settings**
- Configure site title, description, and URL
- Manage contact email
- Update social media links (Instagram, Pinterest, Twitter)

### 🎨 **Modern UI**
- Clean, professional design
- Responsive layout (works on mobile and desktop)
- Easy navigation with sidebar
- Beautiful forms and interactions

### 🔄 **GitHub Integration**
- All content stored in your GitHub repository
- Automatic commits for every change
- Full version control
- Direct integration with your existing content structure

---

## 🚀 Getting Started

### 1. Access the CMS

Visit your CMS admin panel:
- **Local Development**: `http://localhost:3000/admin`
- **Production**: `https://www.tmkdo.com/admin`

### 2. Login

Use your Supabase credentials:
- Email: Your registered email
- Password: Your account password

### 3. Dashboard

After logging in, you'll see the dashboard with quick access to:
- **Blog Posts**: Manage all your content
- **Site Settings**: Configure your website
- **View Repository**: Direct link to GitHub
- **View Website**: Preview your live site

---

## 📖 How to Use

### Creating a New Blog Post

1. Click **"Posts"** in the sidebar
2. Click **"➕ New Post"** button
3. Fill in the metadata:
   - **Title**: Your post title
   - **Slug**: URL-friendly version (click "Generate" for automatic)
   - **Date**: Publication date
   - **Excerpt**: Brief summary
   - **Author**: Author name
   - **Category**: Select from dropdown
   - **Featured Image**: Upload an image
   - **Tags**: Add relevant tags
   - **Published**: Check to make post live
4. Switch to **"✍️ Content"** tab
5. Write your post content in Markdown
6. Click **"Save Post"**

### Editing an Existing Post

1. Go to **"Posts"**
2. Find the post you want to edit
3. Click **"Edit"** button
4. Make your changes
5. Click **"Save Post"**

### Deleting a Post

1. Go to **"Posts"**
2. Find the post you want to delete
3. Click **"Delete"** button
4. Confirm deletion

### Uploading Images

**Featured Image:**
1. In post editor, go to **"📋 Metadata"** tab
2. Click **"📤 Upload Image"** under Featured Image
3. Select image (max 5MB)
4. Image automatically uploads to GitHub

**Content Images:**
Use markdown syntax: `![Alt text](image-url)`

### Updating Site Settings

1. Click **"Settings"** in sidebar
2. Update any fields:
   - General Information
   - Social Media Links
3. Click **"Save Settings"**

---

## 📝 Markdown Guide

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](/images/blog/image.jpg)
```

### Lists
```markdown
- Item 1
- Item 2
- Item 3

1. First
2. Second
3. Third
```

### Quotes
```markdown
> This is a quote
```

### Code
```markdown
Inline `code`

```
Code block
```
```

---

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Next.js 15 with React 19
- **UI Components**: Custom React components with CSS modules
- **State Management**: React Context API
- **Authentication**: Supabase + Session storage

### Backend
- **API Routes**: Next.js API routes (`/api/admin/*`)
- **Content Storage**: GitHub repository (MEK2001/tmkdo)
- **File Format**: Markdown with YAML frontmatter
- **Authentication Server**: Cloudflare Worker (tmkdo-cms-auth.eessaa-khan.workers.dev)

### File Structure
```
src/
├── app/
│   ├── admin/                    # Admin pages
│   │   ├── page.tsx              # Dashboard
│   │   ├── posts/                # Posts management
│   │   │   ├── page.tsx          # Posts list
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Post editor
│   │   └── settings/
│   │       └── page.tsx          # Site settings
│   └── api/admin/                # API routes
│       ├── posts/                # Post CRUD
│       ├── settings/             # Settings CRUD
│       └── upload/               # Image upload
├── components/admin/             # Admin UI components
│   ├── AdminContext.tsx          # Auth context
│   ├── AdminLayout.tsx           # Layout wrapper
│   ├── AdminNav.tsx              # Navigation
│   └── LoginForm.tsx             # Login form
└── lib/admin/                    # Admin utilities
    ├── auth.ts                   # Authentication
    ├── content.ts                # Content management
    └── github.ts                 # GitHub API
```

---

## 🔧 Configuration

### Environment Variables (Cloudflare Worker)

These should already be configured in your Cloudflare Dashboard:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_KEY=<your-service-key>
GITHUB_TOKEN=<your-github-personal-access-token>
GITHUB_REPO=MEK2001/tmkdo
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### GitHub Integration

The CMS uses:
- **Repository**: MEK2001/tmkdo
- **Branch**: main
- **Content Path**: content/posts/
- **Images Path**: public/images/blog/

---

## 🎯 Best Practices

### Content Creation
- ✅ Write clear, descriptive titles
- ✅ Use meaningful slugs (auto-generated from title)
- ✅ Add excerpts for better SEO
- ✅ Upload high-quality images (optimized, < 5MB)
- ✅ Use relevant categories and tags
- ✅ Preview before publishing

### Image Management
- ✅ Use descriptive filenames
- ✅ Optimize images before upload
- ✅ Use appropriate formats (JPG for photos, PNG for graphics)
- ✅ Add alt text for accessibility

### Publishing Workflow
1. Create post as **Draft**
2. Write and format content
3. Add images and metadata
4. Preview on your site
5. Check for errors
6. Mark as **Published**
7. Verify on live site

---

## 🐛 Troubleshooting

### Can't Login
- **Issue**: Login fails
- **Solution**: Check your Supabase credentials. Ensure Worker is running.

### Images Not Uploading
- **Issue**: Image upload fails
- **Solution**: Check file size (< 5MB). Verify GitHub token has write permissions.

### Changes Not Appearing
- **Issue**: Saved changes don't show on site
- **Solution**: Wait 2-3 minutes for GitHub Actions to rebuild. Clear browser cache.

### Post Not Saving
- **Issue**: Save button doesn't work
- **Solution**: Ensure title and slug are filled. Check browser console for errors.

---

## 🔄 Deployment

### Deploy Updated Worker (If Modified)

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **tmkdo-cms-auth**
4. Click **Quick Edit**
5. Copy all content from `cloudflare-worker/worker.js`
6. Paste into editor
7. Click **Save and Deploy**
8. Wait 30 seconds for deployment

### Deploy Frontend

Your CMS is part of your Next.js app. Deploy as usual:

```bash
# Build locally
npm run build

# Or push to GitHub
git push origin main  # Cloudflare Pages auto-deploys
```

---

## 📊 Content Structure

### Blog Post Format (Markdown + YAML)

```markdown
---
title: "Your Post Title"
excerpt: "Brief description"
date: "2026-02-18"
author: "TMKDO Team"
category: "Home Decor"
tags: ["minimalist", "decor", "guide"]
image: "/images/blog/featured.jpg"
published: true
---

Your post content here in **Markdown** format...

![Image](/images/blog/content-image.jpg)

## Subheading

More content...
```

### Site Settings Format (JSON)

```json
{
  "siteTitle": "TMKDO",
  "siteDescription": "Minimalist Home Decor & Curated Living",
  "siteUrl": "https://www.tmkdo.com",
  "email": "hello@tmkdo.com",
  "socialLinks": {
    "instagram": "https://instagram.com/tmkdo",
    "pinterest": "https://pinterest.com/tmkdo",
    "twitter": "https://twitter.com/tmkdo"
  }
}
```

---

## 🎨 Customization

### Adding New Categories

Edit [src/app/admin/posts/[slug]/page.tsx](src/app/admin/posts/[slug]/page.tsx) line ~270:

```tsx
<select value={post.category} ...>
  <option value="Home Decor">Home Decor</option>
  <option value="Your New Category">Your New Category</option>
</select>
```

### Changing Color Theme

Edit CSS variables in component `.module.css` files. Primary brand color: `#8B2635`

---

## 🚀 Next Steps

1. **Login** to your CMS at `/admin`
2. **Create** your first post
3. **Upload** images
4. **Configure** site settings
5. **Publish** and enjoy!

---

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify Worker environment variables
- Ensure GitHub token has proper permissions
- Check GitHub repository for commit activity

---

## 🎉 Success!

You now have a fully functional, custom-built CMS that:
- ✅ Is faster and more reliable than Decap CMS
- ✅ Has a modern, intuitive interface
- ✅ Integrates seamlessly with your Next.js site
- ✅ Stores content in your GitHub repository
- ✅ Supports all your existing content
- ✅ Includes image upload and management
- ✅ Provides complete control over your content

**Happy content creating! 🎨✨**
