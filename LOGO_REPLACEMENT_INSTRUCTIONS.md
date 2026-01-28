# Logo Replacement Instructions

## Overview
The beautiful wooden carved TMKDO logo image you provided needs to be saved and integrated into the website.

## Current Logo Setup
- **Location**: `public/logo.svg`
- **Display Size**: 45x45 pixels (35px on mobile)
- **Used In**: Header component (`src/components/Header.tsx`)

## Steps to Replace Logo

### Option 1: Convert to PNG (Recommended)
1. Save the wooden carved TMKDO logo image as `logo.png` in the `public/` directory
2. Resize the image to at least 200x200 pixels (for retina displays)
3. Update the Header component:
   - Open `src/components/Header.tsx`
   - Change line 27 from:
     ```tsx
     <Image 
       src="/logo.svg" 
       alt="TMKDO Logo" 
       width={45} 
       height={45} 
       className={styles.logo}
       priority
     />
     ```
   - To:
     ```tsx
     <Image 
       src="/logo.png" 
       alt="TMKDO Logo" 
       width={45} 
       height={45} 
       className={styles.logo}
       priority
     />
     ```

### Option 2: Keep SVG and Update
1. Keep using SVG format for scalability
2. Convert the wooden carved logo to SVG format using an image-to-SVG converter
3. Replace the contents of `public/logo.svg` with the new SVG code
4. No code changes needed

### Option 3: Use Both Formats
1. Save the PNG version as `public/logo.png`
2. Keep the SVG as fallback
3. Use PNG for the header, SVG for other uses

## After Replacement

### Test the logo:
1. Run the development server: `npm run dev`
2. Open http://localhost:3000
3. Verify the logo appears in the header
4. Test both light and dark themes
5. Check mobile responsiveness (logo should be 35px at <768px)
6. Verify logo loads quickly (uses priority loading)

### Build for production:
```powershell
npm run build
```

## Image Specifications

### Recommended Specifications:
- **Format**: PNG with transparency OR SVG
- **Size**: At least 200x200 pixels (for retina displays)
- **Aspect Ratio**: Square (1:1)
- **File Size**: Under 50KB for fast loading
- **Background**: Transparent (works in both light/dark modes)

### Current Display Sizes:
- Desktop: 45x45 pixels
- Mobile (<768px): 35x35 pixels
- Retina displays: Use 2x resolution (90x90 or 200x200)

## Troubleshooting

### Logo doesn't appear:
1. Check file path: Must be in `public/` directory
2. Verify file name matches the src in Header.tsx
3. Clear Next.js cache: Delete `.next` folder and rebuild

### Logo looks blurry:
1. Ensure image is at least 200x200 pixels (2x the display size)
2. Use PNG format with high resolution
3. Consider using SVG for perfect scaling

### Logo doesn't work in dark mode:
1. Ensure image has transparent background
2. Consider creating two versions: logo-light.png and logo-dark.png
3. Update Header to conditionally load based on theme

## Current Logo Features
The current SVG logo has:
- Geometric house frame design
- TM monogram integrated
- Minimalist chair element
- Works in both light and dark themes
- Stroke-based line art

The new wooden carved logo brings a more authentic, handcrafted aesthetic that aligns with the brand's natural materials focus.
