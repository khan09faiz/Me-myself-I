# EmailJS Setup Guide

## Overview
The contact form uses EmailJS to send emails without requiring a backend server. This guide will help you configure EmailJS for your portfolio.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service

1. After logging in, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** as your email provider
4. Follow the Gmail authentication process
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

### Template Content:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Body:**
```html
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>

<p><strong>Message:</strong></p>
<p>{{message}}</p>

---
<p>This message was sent via the portfolio contact form.</p>
```

4. Click **Save**
5. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcdefghijk123456`)
3. This key is safe to use in client-side code

## Step 5: Update the Code

Open `components/features/contact/ContactSection.tsx` and replace these values:

```typescript
const SERVICE_ID = 'service_abc123'      // Your Service ID
const TEMPLATE_ID = 'template_xyz789'    // Your Template ID
const PUBLIC_KEY = 'abcdefghijk123456'   // Your Public Key
```

## Step 6: Test the Form

1. Run your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Security Notes

✅ **Safe to commit:**
- Public Key (client-side only)
- Service ID
- Template ID

❌ **Never commit:**
- Your EmailJS account password
- Private API keys (if using advanced features)

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email templates
- 1 email service
- Basic email validation

For production portfolios with high traffic, consider upgrading to a paid plan.

## Troubleshooting

### Form submission fails
- Check that all IDs are correct
- Verify email service is connected
- Check browser console for errors
- Ensure template variables match code

### Emails not received
- Check spam/junk folder
- Verify email service authentication
- Test with EmailJS dashboard's "Test" feature
- Check EmailJS logs for delivery status

### Rate limiting
- Free tier: 200 emails/month
- Implement client-side rate limiting (done in code)
- Consider upgrading plan for production

## Demo Mode

The current implementation runs in **demo mode** with placeholder IDs. It will:
- Simulate form submission (1.5s delay)
- Show success toast notification
- Reset the form
- **Not actually send emails**

Once you configure EmailJS with real IDs, it will send actual emails!

## Alternative: Using Backend

If you prefer a backend solution instead of EmailJS:

1. Remove EmailJS dependency
2. Create an API route: `app/api/contact/route.ts`
3. Use Nodemailer or SendGrid
4. Update ContactSection to call your API

Example API route structure:
```typescript
export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()
  // Send email using Nodemailer/SendGrid
  return Response.json({ success: true })
}
```

## Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/)
- [Template Variables Guide](https://www.emailjs.com/docs/user-guide/template-variables/)
