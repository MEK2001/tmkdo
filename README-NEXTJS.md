# The Minimalist Kraft & DO - Next.js

A modern, minimalist home decor blog built with Next.js 15, featuring a comprehensive theme system, GSAP animations, and optimized performance.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Theme System**: Light/Dark mode with persistent user preference and system detection
- **Smooth Animations**: GSAP ScrollTrigger animations throughout
- **Fully Responsive**: Mobile-first design with optimized layouts
- **SEO Optimized**: Static generation with proper metadata
- **Blog System**: Dynamic routing for blog posts with full content
- **Performance**: Optimized bundle size and First Load JS under 110KB
- **Clean Architecture**: Component-based structure with CSS Modules

## 📦 Tech Stack

- **Framework**: Next.js 15.5.10
- **UI Library**: React 19
- **Language**: TypeScript 5.7
- **Styling**: CSS Modules with CSS Variables
- **Animations**: GSAP 3.12.5 with ScrollTrigger
- **Deployment**: Static export ready for Cloudflare Pages

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the site.

## 📁 Project Structure

```
tmkdo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog posts (dynamic routing)
│   │   ├── contact/            # Contact page
│   │   ├── layout.tsx          # Root layout with theme provider
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable React components
│   │   ├── BlogCard.tsx        # Blog card with hover effects
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Header.tsx          # Navigation header
│   │   └── ThemeProvider.tsx   # Theme context and logic
│   ├── styles/                 # Global styles
│   │   └── globals.css         # CSS variables and base styles
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Theme System

The site features a comprehensive theme system with:

- **Light Theme**: Warm beige palette (#f5f0e8)
- **Dark Theme**: Charcoal with blue undertones (#1e2329)
- **Semantic Variables**: `--text-primary`, `--bg-primary`, etc.
- **Smooth Transitions**: 0.3s transitions on theme change
- **LocalStorage**: Persists user preference
- **System Detection**: Respects `prefers-color-scheme`

## 🎬 Animations

GSAP ScrollTrigger animations include:

- Fade-in effects on scroll
- Blog card hover states with smooth transforms
- Header transparency on scroll
- Mobile menu slide animations

## 📝 Blog Posts

Blog posts are stored as objects with full HTML content. Current posts:

1. **5 Essential Pieces for a Minimalist Living Room**
2. **The Art of Decluttering: A Room-by-Room Guide**
3. **Natural Materials in Modern Homes: Wood, Stone & Clay**

Add new posts by editing `src/app/blog/[slug]/page.tsx`.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Deploy to Cloudflare Pages

```bash
npm run deploy
```

Or manually:

```bash
wrangler pages deploy out --project-name=tmkdo
```

## 🔧 Configuration

### Next.js Config

Static export configured in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

## 🎯 Performance

- First Load JS: ~102-108 KB
- All pages statically generated
- Images lazy loaded
- CSS extracted and optimized
- Minimal runtime overhead

## 📱 Responsive Design

Breakpoints:

- Mobile: < 640px
- Tablet: 640px - 968px  
- Desktop: > 968px

## ✨ What's New in v2.0

### Migration to Next.js

The site has been completely migrated from static HTML to Next.js with the following improvements:

1. **Fixed Blog Card Interactivity**
   - Removed inline onclick handlers that broke hover states
   - Implemented proper Link components with CSS-only hover effects
   - Smooth image zoom on hover with proper transitions

2. **Consistent Theme System**
   - Unified theme implementation across all pages
   - Blog post pages now properly respect light/dark mode
   - Removed duplicate inline styles from old HTML files
   - Theme persistence with localStorage

3. **Optimized Performance**
   - Reduced bundle size with proper code splitting
   - Static generation for all pages
   - Lazy loading for images
   - Optimized CSS with CSS Modules

4. **Clean Architecture**
   - Component-based structure
   - Reusable Header and Footer
   - Centralized theme management
   - Type-safe with TypeScript

## 🤝 Contributing

This is a personal blog project, but suggestions are welcome via issues.

## 📄 License

MIT License - feel free to use this as a template for your own projects.

## 🙏 Credits

- Design inspiration: Minimalist aesthetic principles
- Images: Unsplash
- Fonts: Google Fonts (Inter, Playfair Display)
- Animations: GSAP by GreenSock

---

Built with ❤️ using Next.js
