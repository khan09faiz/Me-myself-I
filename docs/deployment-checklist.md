# Deployment Checklist

## Pre-Deployment Tasks

### 1. Environment Setup ✓
- [x] All dependencies installed
- [x] Next.js 16.1.6 configured
- [x] Tailwind CSS v3 working
- [x] TypeScript strict mode enabled

### 2. Content Configuration ⏳
- [ ] Update `lib/constants.ts` with your actual information:
  - [ ] Name, title, description
  - [ ] Email, phone
  - [ ] GitHub URL
  - [ ] LinkedIn URL
  - [ ] Twitter URL (optional)
  - [ ] Site URL (your domain)

- [ ] Update `src/data/projects.json`:
  - [ ] Add your real projects
  - [ ] Update descriptions
  - [ ] Add correct GitHub/live links
  - [ ] Add project images (optional)

- [ ] Update `src/data/skills.json`:
  - [ ] Adjust proficiency levels
  - [ ] Add/remove technologies
  - [ ] Update category colors

- [ ] Update `src/data/timeline.json`:
  - [ ] Add your work experience
  - [ ] Add education details
  - [ ] Add achievements

### 3. SEO Assets ⏳
- [ ] Create favicon (32x32): `app/favicon.ico`
- [ ] Create OG image (1200x630): `public/og-image.png`
- [ ] Create Apple touch icon (180x180): `public/apple-touch-icon.png`
- [ ] See [docs/seo-assets-guide.md](./seo-assets-guide.md) for detailed instructions

### 4. EmailJS Configuration ⏳
- [ ] Sign up at [EmailJS.com](https://www.emailjs.com/)
- [ ] Create email service
- [ ] Create email template
- [ ] Get Service ID, Template ID, and Public Key
- [ ] Update `components/features/contact/ContactSection.tsx`:
  ```typescript
  const SERVICE_ID = 'your_service_id'
  const TEMPLATE_ID = 'your_template_id'
  const PUBLIC_KEY = 'your_public_key'
  ```
- [ ] See [docs/emailjs-setup.md](./emailjs-setup.md) for detailed guide

### 5. Testing ⏳
- [ ] Test all navigation links (header, footer)
- [ ] Test mobile menu functionality
- [ ] Test contact form submission
- [ ] Test project filtering
- [ ] Check responsive design on mobile
- [ ] Test smooth scrolling
- [ ] Verify animations work
- [ ] Test in different browsers (Chrome, Firefox, Safari)

### 6. Performance Check ⏳
- [ ] Run `npm run build` successfully
- [ ] Check build size
- [ ] Test production build: `npm start`
- [ ] Run Lighthouse audit (target 90+ scores)

### 7. Code Quality ⏳
- [ ] Run `npm run lint` and fix issues
- [ ] Remove console.logs
- [ ] Check TypeScript errors: `npx tsc --noEmit`

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Preview deployments
- Free for personal projects

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your repository
6. Click "Deploy" (uses default Next.js settings)
7. Done! Your site is live at `your-project.vercel.app`

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides instructions)

### Option 2: Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://www.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Option 3: GitHub Pages (Static Export)

**Setup:**
1. Update `next.config.ts`:
   ```typescript
   output: 'export',
   basePath: '/your-repo-name',
   images: { unoptimized: true },
   ```
2. Build: `npm run build`
3. Deploy `out/` folder to gh-pages branch

**Note:** GitHub Pages doesn't support:
- API routes
- Dynamic features
- Server-side rendering

### Option 4: Self-Hosted (VPS/Cloud)

**Requirements:**
- Node.js 18+
- PM2 or similar process manager

**Steps:**
1. Build: `npm run build`
2. Copy `.next/`, `public/`, `package.json`, `next.config.ts` to server
3. Install deps: `npm install --production`
4. Start: `npm start` or `pm2 start npm -- start`
5. Setup reverse proxy (nginx/Apache)
6. Configure SSL with Let's Encrypt

## Post-Deployment

### 1. Verify Deployment ✓
- [ ] Visit your live site
- [ ] Test all features
- [ ] Check console for errors
- [ ] Test on mobile device

### 2. SEO Setup ⏳
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test Open Graph with:
  - [ ] [Facebook Debugger](https://developers.facebook.com/tools/debug/)
  - [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [ ] [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Test structured data:
  - [ ] [Google Rich Results](https://search.google.com/test/rich-results)
  - [ ] [Schema Validator](https://validator.schema.org/)

### 3. Analytics (Optional) ⏳
- [ ] Add Google Analytics
- [ ] Add Vercel Analytics
- [ ] Setup Plausible (privacy-friendly alternative)

### 4. Monitoring ⏳
- [ ] Setup UptimeRobot for uptime monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Monitor Web Vitals

## Domain Setup (If Using Custom Domain)

### 1. Purchase Domain
- Namecheap, GoDaddy, Google Domains, Cloudflare

### 2. Configure DNS
For Vercel:
```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

For Netlify:
```
A Record: @ → 75.2.60.5
CNAME: www → your-site.netlify.app
```

### 3. SSL Certificate
- Automatic with Vercel/Netlify
- Let's Encrypt for self-hosted

## Performance Targets

- **Lighthouse Performance:** 90+
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3.5s

## Backup & Version Control

- [x] Code in GitHub
- [ ] Tag releases (v1.0.0, v1.1.0, etc.)
- [ ] Document major changes in CHANGELOG.md
- [ ] Keep backup of data files

## Future Enhancements

### After Initial Deployment:
1. **GitHub Stats Integration** (needs GitHub API key)
   - Real-time repository stats
   - Contribution heatmap
   - Language breakdown chart
   - Top repositories showcase

2. **Blog Section** (optional)
   - MDX blog posts
   - Syntax highlighting
   - Reading time
   - Tags/categories

3. **Analytics Dashboard** (optional)
   - Custom analytics page
   - Visitor stats
   - Popular projects

4. **Admin Panel** (optional)
   - Content management
   - Edit projects/skills
   - View contact form submissions

## Support

If you encounter issues:
1. Check [Next.js Docs](https://nextjs.org/docs)
2. Check [Vercel Docs](https://vercel.com/docs)
3. Review error logs
4. Search GitHub issues
5. Contact hosting support

---

**Current Status:** ✅ Ready for content updates and testing
**Next Step:** Update content in `lib/constants.ts` and `src/data/` files
