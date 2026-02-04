# SEO Assets Setup Guide

## Required Images

### 1. Favicon (app/favicon.ico)
- **Size:** 32x32 pixels
- **Format:** ICO or PNG
- **Purpose:** Browser tab icon
- **How to create:**
  1. Use [Favicon.io](https://favicon.io/) or [RealFaviconGenerator](https://realfavicongenerator.net/)
  2. Upload your logo or use text-based generator
  3. Download and place in `app/favicon.ico`

### 2. Open Graph Image (public/og-image.png)
- **Size:** 1200x630 pixels
- **Format:** PNG or JPG
- **Purpose:** Social media previews (Twitter, LinkedIn, Facebook)
- **Content suggestions:**
  - Your name in large text
  - Job title: "AI/ML Engineer & Full-Stack Developer"
  - Background with code theme or gradient
  - Your photo (optional)
- **Tools:**
  - [Canva](https://www.canva.com/) - use "Facebook Post" template
  - [Figma](https://www.figma.com/)
  - [OG Image Generator](https://og-image.vercel.app/)

### 3. Apple Touch Icon (public/apple-touch-icon.png)
- **Size:** 180x180 pixels
- **Format:** PNG
- **Purpose:** iOS home screen icon
- **Copy from:** Use same design as favicon, just larger

## Current Status

✅ Sitemap configured (app/sitemap.ts)
✅ Robots.txt configured (app/robots.ts)
✅ JSON-LD structured data added (Person, Website, ProfilePage schemas)
✅ Metadata in layout.tsx (OpenGraph, Twitter cards)

⏳ Pending: Create and add these image files:
- [ ] app/favicon.ico (32x32)
- [ ] public/og-image.png (1200x630)
- [ ] public/apple-touch-icon.png (180x180)

## Quick Image Creation

### Using Canva (Recommended):
1. Go to [Canva.com](https://www.canva.com/)
2. Search for "Facebook Post" template (1200x630)
3. Customize with your info:
   - Background: Dark (#0A0E27) with cyan accents (#00D9FF)
   - Text: Your name + title
   - Add code patterns or tech icons
4. Download as PNG
5. Place in `public/og-image.png`

### For Favicon:
1. Take your OG image or logo
2. Go to [Favicon.io](https://favicon.io/)
3. Upload image or use text generator
4. Download all sizes
5. Place `favicon.ico` in `app/` directory

## Testing

After adding images, test with:

### Open Graph:
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Structured Data:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

## Notes

- All image paths are already configured in metadata
- Once you add the images, they'll work automatically
- For now, the site works fine without images (graceful fallback)
- You can generate them before deployment
