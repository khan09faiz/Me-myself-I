# Vercel Deployment & Rollback Guide

## 🔄 How to Rollback in Vercel

Vercel automatically saves every deployment, making rollbacks easy:

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/khan09faiz/portfolio-faiz-nu/deployments
2. Find the deployment you want to rollback to
3. Click the **three dots (...)** next to it
4. Click **"Promote to Production"**
5. Confirm the promotion

✅ Your site instantly rolls back to that version!

### Method 2: Via Git Revert

If you need to revert code changes:

```bash
# See commit history
git log --oneline

# Revert to a specific commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

---

## 📋 Deployment Best Practices

### 1. Preview Deployments
- Every pull request gets a preview URL
- Test changes before merging to `main`

### 2. Production Deployments
- Only `main` branch deploys to production
- Auto-deploys on every push to `main`

### 3. Environment Variables
Current variables set in Vercel:
- `GITHUB_TOKEN`
- `GITHUB_USERNAME`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

To update:
1. Go to: https://vercel.com/khan09faiz/portfolio-faiz-nu/settings/environment-variables
2. Edit or add variables
3. Redeploy for changes to take effect

---

## 🚨 Emergency Rollback

If your site breaks:

1. **Instant Fix**: Promote previous working deployment (Method 1 above)
2. **Code Fix**: Fix locally and push (triggers new deployment)
3. **Git Revert**: Use `git revert` to undo commits

---

## 📊 Monitoring

- **Analytics**: https://vercel.com/khan09faiz/portfolio-faiz-nu/analytics
- **Deployments**: https://vercel.com/khan09faiz/portfolio-faiz-nu/deployments
- **Logs**: Click any deployment → View Function Logs

---

## 🎯 Quick Links

- Production Site: https://portfolio-faiz-nu.vercel.app/
- Vercel Dashboard: https://vercel.com/khan09faiz/portfolio-faiz-nu
- GitHub Repo: https://github.com/khan09faiz/portfolio_faiz

---

## 💡 Pro Tips

1. **Test Locally First**: Run `npm run build` before pushing
2. **Check Preview Deployments**: Review preview URLs before merging
3. **Keep Commits Small**: Easier to rollback specific changes
4. **Monitor Build Times**: Typical build: 2-3 minutes
5. **Version Your APIs**: Never break existing endpoints

---

**Remember**: Every deployment is saved. You can always rollback to any previous version with one click!
