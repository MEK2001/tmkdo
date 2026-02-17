 # Website Construction Prompt for LLM/AI Models

## Use this prompt when building a similar website or making major tweaks

---

## MASTER CONSTRUCTION PROMPT

```
BUILD A MINIMALIST HOME DECOR & LIFESTYLE BLOG WEBSITE WITH THE FOLLOWING SPECIFICATIONS:

### PROJECT OVERVIEW
- **Name:** The Minimalist Kraft & DO (TMKDO)
- **Type:** Next.js 15 Full-Stack Blog & Content Marketing Website
- **Purpose:** Showcase minimalist home decor, furniture styling, and lifestyle content
- **Target:** Desktop, Tablet, Mobile (fully responsive)
- **Performance Goal:** Lightning-fast builds (4-5s), smooth scroll, instant animations

### CORE TECH STACK (REQUIRED - NO SUBSTITUTIONS)
1. **Framework:** Next.js 15.1.6 with App Router
2. **Language:** TypeScript (strict mode)
3. **Runtime:** Node.js
4. **CSS:** CSS Modules (scoped styling, no global CSS except fonts/reset)
5. **Animation:** GSAP 3.12.5 (with ScrollTrigger plugin only)
6. **Smooth Scroll:** Lenis 1.3.17 (1.2s duration, custom easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)))
7. **Icons:** React-Icons 5.5.0 (FA6 Free set)
8. **Fonts:** Next.js Google Fonts (Inter, Playfair Display with font-display: swap)
9. **Image:** Next.js Image component with external image optimization

### REMOVED/NOT USED
- ❌ Framer Motion (no Framer Motion - use GSAP only)
- ❌ Three.js / @react-three/fiber / @react-three/drei (removed for performance)
- ❌ TailwindCSS (use CSS Modules instead)
- ❌ Animations on blog page (instant load only)
- ❌ Individual component animations (use global theme-animations.js only)

### DIRECTORY STRUCTURE
```
src/
├── app/
│   ├── layout.tsx (root layout with ThemeProvider, SmoothScroll, Header, Footer)
│   ├── page.tsx (homepage with Hero, featured blog grid)
│   ├── page.module.css
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx (blog listing with search/filter)
│   │   ├── page.module.css
│   │   └── [slug]/page.tsx (individual blog post)
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx (navigation, theme toggle)
│   ├── Header.module.css
│   ├── Footer.tsx (social links: TikTok, Instagram, Pinterest only)
│   ├── Footer.module.css
│   ├── Hero.tsx (typing animation with words array)
│   ├── Hero.module.css
│   ├── BlogCard.tsx (NO internal animations - relies on global)
│   ├── BlogCard.module.css
│   ├── SearchAndFilter.tsx (search + category filter)
│   ├── SearchAndFilter.module.css
│   ├── ThemeProvider.tsx (light/dark mode with CSS variables)
│   ├── SmoothScroll.tsx (Lenis initialization)
│   ├── CategoryFilter.tsx
│   ├── RelatedPosts.tsx
│   ├── SkeletonCard.tsx
│   └── *.module.css for each component
├── lib/
│   └── metadata.ts (SEO metadata)
├── styles/
│   ├── globals.css (CSS variables, fonts, base styles)
│   └── No component-level styles here - use modules only
└── types/
    └── gsap.d.ts (GSAP type definitions)

assets/
├── css/
│   ├── theme.css (CSS variables for colors)
│   ├── components.css
│   ├── about.css
│   ├── contact.css
│   └── index.css
├── js/
│   └── theme-animations.js (ALL scroll animations, GSAP + ScrollTrigger)
└── images/ (static images, logos)

public/
├── favicon.ico
├── logo.svg
└── apple-touch-icon.png
```

### CRITICAL IMPLEMENTATION DETAILS

#### 1. RESPONSIVE DESIGN BREAKPOINTS
- **Mobile:** ≤768px (primary)
- **Tablet:** 768px - 1024px (secondary)
- **Desktop:** >1024px
- **Use:** CSS media queries in all module files
- **Font:** clamp() for responsive typography (e.g., clamp(1.5rem, 4vw, 2.5rem))

#### 2. ANIMATION SYSTEM (theme-animations.js)
**Location:** assets/js/theme-animations.js
**Trigger:** Auto-loaded in layout.tsx via Script tag with onLoad

**Key Logic:**
```javascript
// On HOMEPAGE: Ultra-fast blog card animations
- Blog cards duration: 0.2-0.25s (mobile: 0.2s, desktop: 0.25s)
- Movement: 5-8px upward (mobile: 5px, desktop: 8px)
- Easing: power1.inOut (snappiest)
- Stagger: 0.005s mobile, 0.008s desktop (near-zero delay)
- Trigger: top 110% viewport (pre-loads cards before visible)
- Other cards: 0.6-0.9s duration, 20-30px movement

// On BLOG PAGE (/blog): INSTANT - no animations
- Blog cards display with opacity: 1, y: 0 immediately
- No scroll triggers, no animations = maximum performance

// Fallback (when GSAP unavailable):
- Use Intersection Observer
- Same timing as above
```

**Requirements:**
- Check for prefers-reduced-motion media query
- If true: Show all elements instantly, opacity: 1
- Use gsap.from() for animations (reverse entry)
- Use ScrollTrigger with once: true (no repeat)
- toggleActions: 'play none none none' (no reverse)

#### 3. THEME SYSTEM (Light/Dark Mode)
**CSS Variables in globals.css/theme.css:**
```css
--background: #ffffff / #1a1a1a
--text-primary: #1a1a1a / #ffffff
--text-secondary: #666666 / #cccccc
--text-tertiary: #999999 / #999999
--accent-color: #a17659 (warm tan - never changes)
--primary-color: #8B7355 (deep brown)
--gradient-primary: linear-gradient(135deg, #a17659, #8B7355)
--font-inter: 'Inter', sans-serif
--font-playfair: 'Playfair Display', serif
```

**Theme Toggle:** Header.tsx component with useEffect to set data-theme attribute
**Persistence:** localStorage for theme preference

#### 4. SMOOTH SCROLL (Lenis)
**File:** src/components/SmoothScroll.tsx
**Initialization:**
```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// raf loop with GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
```

#### 5. SOCIAL ICONS (Footer & Contact Page)
**Icons Only:** TikTok, Instagram, Pinterest
**No:** Twitter, Facebook, LinkedIn, YouTube
**Links Format:**
- TikTok: https://tiktok.com/@tmkdo
- Instagram: https://instagram.com/tmkdo
- Pinterest: https://pinterest.com/tmkdo
**Styling:** 44x44px circles, brand colors, hover effects with scale(1.12) + translateY(-4px)

#### 6. HERO SECTION (Homepage)
**Components:**
- Hero title with gradient text (brand name colored)
- Typing animation (display rotating words with cursor)
- Description paragraph
- NO container box/outline - heroContent::before display: none
- Background: subtle radial gradient

**Typing Animation:**
- Words array: ['beautiful spaces', 'organized homes', 'mindful living']
- Speed: 150ms per character
- Delete speed: 100ms per character
- Pause between words: 1500ms
- Use setInterval/setTimeout (NO external typing libraries)

#### 7. BLOG FUNCTIONALITY
**Features:**
- List of blog posts (minimum 6)
- Search by title, excerpt, category
- Filter by category (Living Room, Organization, Materials)
- Individual blog post pages with slug routing
- Related posts section (3 posts from same category)
- Read time estimation

**Card Animation:**
- Homepage: Fast animation (0.2-0.25s)
- Blog page (/blog): NO animation, instant load
- Individual post page: NO animation

#### 8. PERFORMANCE OPTIMIZATION
**Build Targets:**
- Build time: 4-5 seconds
- First Load JS: ≤114 kB (homepage)
- No unused dependencies
- CSS-in-JS only via CSS Modules (no runtime CSS)

**Removed Dependencies:**
- Framer Motion (replaced with GSAP)
- Three.js ecosystem (removed entirely)
- All unused 3D animation components

**Optimization Checklist:**
- ✅ Image optimization via Next.js Image component
- ✅ Font display: swap (instant fallback)
- ✅ Dynamic imports for heavy components
- ✅ CSS Modules for zero-runtime CSS
- ✅ GSAP ScrollTrigger only (not full GSAP features)
- ✅ Lenis for smooth scroll without jQuery
- ✅ No animations on blog list page

#### 9. METADATA & SEO
**File:** src/lib/metadata.ts
**Include:**
- Open Graph tags (og:image, og:description)
- Twitter cards (if needed)
- Canonical URLs
- JSON-LD structured data
- Robots.txt
- Sitemap.xml (dynamic generation)

#### 10. ACCESSIBILITY
- Semantic HTML (article, nav, section, main)
- ARIA labels on interactive elements
- Color contrast ≥4.5:1
- Focus visible outlines
- Keyboard navigation for all controls
- Image alt text (required on all images)
- Skip to content link

#### 11. CRITICAL CSS PATTERNS
**All components use CSS Modules:**
```css
/* Example BlogCard.module.css structure */
.blogCard {
  /* Base styles */
}

.blogCard:hover {
  /* Hover animations if needed */
}

@media (max-width: 768px) {
  .blogCard {
    /* Mobile overrides */
  }
}

[data-theme="dark"] .blogCard {
  /* Dark mode specific */
}
```

#### 12. SCRIPT LOADING (layout.tsx)
```tsx
<Script
  src="/theme-animations.js"
  strategy="afterInteractive"
  onLoad={() => {
    window.initializeThemeAnimations?.();
  }}
/>
```

#### 13. PAGE-SPECIFIC RULES
- **Homepage:** Featured blog grid (6 cards), animations enabled
- **Blog page:** All posts list, search/filter active, NO animations
- **Individual post:** Full article, related posts, no animations
- **About page:** Static content, subtle animations
- **Contact page:** Contact form, social links (TikTok/Instagram/Pinterest only)

#### 14. BUILD & DEPLOYMENT
**Commands:**
- npm run dev (development)
- npm run build (production)
- npm run start (production server)
- npm run lint (ESLint)

**Dependencies (FINAL - DO NOT ADD MORE):**
```json
{
  "gsap": "^3.12.5",
  "lenis": "^1.3.17",
  "next": "^15.1.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0"
}
```

#### 15. CRITICAL DO's AND DON'Ts

**DO:**
- ✅ Use CSS Modules for ALL component styling
- ✅ Use GSAP + ScrollTrigger for animations (only)
- ✅ Use Lenis for smooth scrolling
- ✅ Use Next.js Image component for all images
- ✅ Implement responsive design with clamp()
- ✅ Disable animations on blog list page for performance
- ✅ Use data-theme attribute for dark mode switching
- ✅ Implement accessibility (semantic HTML, ARIA labels)
- ✅ Keep animations under 250ms for UI elements
- ✅ Test on mobile, tablet, desktop devices

**DON'T:**
- ❌ Use TailwindCSS (CSS Modules only)
- ❌ Use Framer Motion (GSAP only)
- ❌ Use Three.js or 3D libraries
- ❌ Add animations to blog list page
- ❌ Use individual component animations (global system only)
- ❌ Add unused npm packages
- ❌ Use inline styles (CSS Modules only)
- ❌ Disable animations system-wide (respect prefers-reduced-motion)
- ❌ Use styled-components or Emotion
- ❌ Add more social platforms beyond TikTok/Instagram/Pinterest

#### 16. COMMON TWEAKS & MODIFICATIONS

**To add a new blog post:**
1. Add object to blogPosts array in blog/page.tsx
2. Create [slug]/page.tsx file
3. No other changes needed (filtering auto-works)

**To change colors:**
1. Edit theme.css CSS variables
2. Changes apply automatically via data-theme

**To modify animation speed:**
1. Edit theme-animations.js animateOnScroll() durations
2. Changes apply to homepage (not blog page)

**To add new social platform:**
1. Import new icon from react-icons/fa in Footer.tsx
2. Add <a> tag with href to social profile
3. Add .socialPlatform {} styles in Footer.module.css
4. Update Contact page social links similarly

**To disable animations entirely:**
1. In theme-animations.js, wrap all animations in if(false) { ... }
2. Or set all durations to 0
3. Or return early from initScrollAnimations()

---

## DEPLOYMENT INSTRUCTIONS

**For Cloudflare Pages:**
```bash
npm run build
wrangler pages deploy out --project-name=tmkdo
```

**For Vercel:**
```bash
npm run build
vercel --prod
```

**For traditional hosting:**
```bash
npm run build
npm run start
# Use output from .next/standalone
```

---

## PERFORMANCE BENCHMARKS (Target)

| Metric | Target | Actual |
|--------|--------|--------|
| Build Time | <5s | 4.5-5s |
| First Load JS | ≤114KB | 114KB |
| Lighthouse Performance | >90 | 92+ |
| Core Web Vitals | All Green | ✓ |
| Blog Page Scroll | 60fps | 60fps |
| Animation Duration | <250ms | 0.2-0.25s |

---

## FUTURE MODIFICATIONS EXAMPLES

**Example 1: Change animation speed on homepage**
Edit theme-animations.js:
```javascript
duration: isMobile ? 0.15 : 0.2, // Changed from 0.2 : 0.25
```

**Example 2: Add new page (e.g., /gallery)**
1. Create src/app/gallery/page.tsx
2. Create src/app/gallery/page.module.css
3. Add route to Header.tsx navigation
4. Animations auto-apply (no blog page exception)

**Example 3: Change primary brand color**
Edit theme.css:
```css
--primary-color: #NEW_COLOR;
--accent-color: #NEW_COLOR;
--gradient-primary: linear-gradient(135deg, #NEW_COLOR, #SECONDARY);
```

**Example 4: Disable smooth scroll**
In layout.tsx, comment out:
```tsx
{/* <SmoothScroll /> */}
```

---

## TESTING CHECKLIST BEFORE DEPLOY

- [ ] Responsive on mobile (320px), tablet (768px), desktop (1920px)
- [ ] All animations work (homepage) and disabled (blog page)
- [ ] Theme toggle works (light/dark mode)
- [ ] Search/filter works on blog page
- [ ] Images load without CLS (Cumulative Layout Shift)
- [ ] Fonts load with display: swap (no FOIT)
- [ ] Scroll is smooth (Lenis working)
- [ ] Touch interactions work on mobile
- [ ] Keyboard navigation works (tab, enter, escape)
- [ ] ARIA labels present on interactive elements
- [ ] No console errors
- [ ] Build time <5s
- [ ] First Load JS <120KB
- [ ] Lighthouse score >90

---

## FINAL NOTES

This specification captures a production-ready, performant minimalist blog with:
- Zero animation overhead on high-traffic pages (blog listing)
- Lightning-fast builds and loads
- Responsive design across all devices
- Smooth, accessible interactions
- Minimal dependencies (only essential packages)
- SEO-optimized with Next.js best practices
- Dark/light theme system
- Future-proof CSS architecture (CSS Modules)

All animations use GSAP (industry standard) and Lenis (modern smooth scroll).
No heavy 3D libraries or animation frameworks that kill performance.
Optimized for both desktop and mobile experiences.
```

---

## USAGE INSTRUCTIONS

1. **Copy this entire prompt** (or relevant sections)
2. **Paste into your AI model/LLM** (Claude, ChatGPT, etc.)
3. **Add any custom requirements** at the end
4. **Generate the code**
5. **Follow the build instructions** to start the project

**You can also modify sections like:**
- Brand name: Replace "TMKDO" with your brand
- Colors: Change CSS variable colors
- Content: Update blog post topics
- Social platforms: Add/remove as needed
- Animation speeds: Increase/decrease durations
- Deployment: Choose Cloudflare Pages, Vercel, etc.

This prompt contains enough technical detail for any AI model to rebuild the entire website with all optimizations and best practices already baked in.
