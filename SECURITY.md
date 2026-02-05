# Security & Environment Variables Guide

## 🔒 Security Status: SECURED ✅

### What's Protected:
1. **Environment Variables**: `.env.local` is in `.gitignore` - will NOT be committed to GitHub
2. **Server-Side Only**: GitHub token used only in Server Components (Next.js 13+ App Router)
3. **Rate Limiting**: 
   - Cached for 1 hour (`revalidate: 3600`)
   - Handles 403 rate limit errors gracefully
   - Falls back to static data if API fails
4. **No Client Exposure**: Token never sent to browser

### Current Setup:
```
✅ .env.local in .gitignore
✅ Server Component (async function)
✅ 1-hour cache (reduces API calls)
✅ Rate limit error handling
✅ Fallback data on errors
```

---

## ⚠️ IMPORTANT: Before Deploying to Vercel/Production

### 1. Regenerate GitHub Token
Your current token has been shown in this chat session. Before deploying:

1. Go to: https://github.com/settings/tokens
2. Delete the old token (starts with `ghp_...`)
3. Create a new token with these scopes:
   - `read:user`
   - `public_repo`
4. Update `.env.local` with the new token

### 2. Vercel Environment Variables
When deploying to Vercel, add these in **Settings > Environment Variables**:

```bash
GITHUB_TOKEN=your_new_token_here
GITHUB_USERNAME=khan09faiz
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_jugpf9y
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_leq7iys
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=dALDPj8WV_A--sT6O
```

### 3. Email Keys Security
EmailJS keys starting with `NEXT_PUBLIC_` are safe to expose in the browser (they're public by design). They're protected by EmailJS's domain restrictions.

---

## 📊 Rate Limits

### GitHub GraphQL API Limits:
- **With Token**: 5,000 requests/hour
- **Without Token**: 60 requests/hour

### Your Protection:
- **Cache**: Data cached for 1 hour
- **Max Requests**: ~24 requests/day (once per hour)
- **Usage**: ~0.5% of daily limit

### If Rate Limited:
Page automatically falls back to static data until limit resets.

---

## 🔐 Token Permissions Required

Your GitHub token needs these permissions:
- ✅ `read:user` - Read user profile
- ✅ `public_repo` - Read public repositories

**DO NOT** give additional permissions like:
- ❌ `repo` (full private repo access)
- ❌ `delete_repo`
- ❌ `admin:org`

---

## 🚨 Emergency: Token Leaked?

If you accidentally commit `.env.local` or expose your token:

1. **Immediately revoke** at: https://github.com/settings/tokens
2. Generate new token
3. Update `.env.local` locally
4. Update Vercel environment variables
5. Redeploy

---

## ✅ Security Checklist

Before pushing to GitHub:
- [x] `.env.local` in `.gitignore`
- [x] No hardcoded tokens in code
- [x] Server-side API calls only
- [ ] Regenerated token before production deploy
- [ ] Configured Vercel environment variables

---

## 📝 Notes

- Local development is secure as-is
- Before deploying, regenerate the GitHub token
- EmailJS keys are meant to be public (domain-restricted)
- Rate limiting is handled automatically
