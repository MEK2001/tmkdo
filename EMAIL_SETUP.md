# Email Setup Guide for TMKDO Contact Form

The contact form has been configured to send emails using **Resend** - a modern, Edge-compatible email API perfect for Cloudflare Pages deployment.

## 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy your API key (starts with `re_`)

## 2. Configure Environment Variables

### Local Development (.env.local)

Create or update `.env.local`:

```env
RESEND_API_KEY=re_YourActualApiKeyHere
```

### Production (Cloudflare Pages)

Add the environment variable in Cloudflare Dashboard:

1. Go to **Pages → Your Project → Settings → Environment Variables**
2. Add variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_YourActualApiKeyHere`
3. Save and redeploy

## 3. Verify Your Domain (Optional but Recommended)

For production use, verify your domain in Resend:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `tmkdo.com`)
4. Add the DNS records provided by Resend
5. Wait for verification

Then update `src/app/api/contact/route.ts`:

```typescript
// Change from:
from: 'TMKDO Contact <onboarding@resend.dev>'

// To:
from: 'TMKDO Contact <noreply@tmkdo.com>'
```

## 4. Restart the Development Server

After configuring `.env.local`, restart:

```bash
npm run dev
```

## Features

✅ **Edge-compatible** - Works with Cloudflare Pages Edge runtime  
✅ **Email to contact@tmkdo.com** when users submit the form  
✅ **Confirmation email** sent to the user  
✅ **HTML formatted emails** with branding  
✅ **Reply-to field** set to sender's email  
✅ **Error handling** and validation  
✅ **Email validation** prevents invalid addresses  
✅ **XSS protection** via HTML escaping  

## Testing

1. Go to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit the form
4. Check emails at:
   - `contact@tmkdo.com` (admin notification)
   - Sender's email (confirmation)

## Why Resend?

**Replaced:** Nodemailer (requires Node.js runtime, not Edge-compatible)  
**With:** Resend (fully Edge-compatible, modern API)

**Benefits:**
- ✅ Works with Cloudflare Pages Edge runtime
- ✅ No Node.js core modules (stream, fs, crypto)
- ✅ Simple REST API
- ✅ Free tier: 100 emails/day, 3,000 emails/month
- ✅ Excellent deliverability
- ✅ Built-in analytics

## API Key Security

🔒 **Never commit your API key to Git**

- ✅ Use `.env.local` for local development
- ✅ Use Cloudflare environment variables for production
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Rotate keys if exposed

## Troubleshooting

### Email not sending

1. Verify `RESEND_API_KEY` is set correctly
2. Check Resend dashboard for errors
3. Ensure API key has sending permissions
4. Check email address format is valid

### "Missing API key" error

- Add `RESEND_API_KEY` to `.env.local`
- Restart dev server: `npm run dev`
- For production, add to Cloudflare environment variables

### Emails going to spam

- Verify your domain in Resend
- Add SPF, DKIM records
- Use verified sender address
- Avoid spam trigger words

## Free Tier Limits

**Resend Free Plan:**
- 100 emails per day
- 3,000 emails per month
- 1 verified domain
- Full API access

For higher volumes, upgrade to Pro plan ($20/mo for 50k emails).

## Support

- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **API Reference:** [resend.com/docs/api-reference](https://resend.com/docs/api-reference)
- **Dashboard:** [resend.com/emails](https://resend.com/emails)
