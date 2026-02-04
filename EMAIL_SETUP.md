# Email Setup Guide for TMKDO Contact Form

The contact form has been configured to send emails to `contact@tmkdo.com`. Follow these steps to set it up:

## 1. Create `.env.local` file

Copy `.env.local.example` to `.env.local` and configure your email service.

## 2. Choose Your Email Service

### Option A: Cloudflare Email Routing (Currently Beta - Waiting List)
⚠️ **Status**: Email Sending feature is in Beta. If you're on the waiting list, use Option B instead until the feature becomes available.

When available:
1. Go to Email Service → Email Sending
2. Create SMTP Credentials
3. Update `.env.local`:
```
EMAIL_HOST=smtp.cloudflare.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=contact@tmkdo.com
EMAIL_PASSWORD=your-cloudflare-smtp-password
EMAIL_FROM=contact@tmkdo.com
```

### Option B: Gmail (Recommended for Immediate Setup)
1. Enable 2-Factor Authentication in your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Update `.env.local`:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Option C: SendGrid
1. Create a SendGrid account: https://sendgrid.com
2. Generate an API Key
3. Update `.env.local`:
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@tmkdo.com
```

### Option C: SendGrid
1. Create a SendGrid account: https://sendgrid.com
2. Generate an API Key
3. Update `.env.local`:
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@tmkdo.com
```

### Option D: Other SMTP Services (Gmail, Outlook, etc.)
Get your SMTP credentials from your email provider and update `.env.local` accordingly.

## 3. Restart the Development Server

After configuring `.env.local`, restart the Next.js development server:
```bash
npm run dev
```

## Features

✅ Emails sent to `contact@tmkdo.com` when users submit the form
✅ Confirmation email sent to the user who submitted the form
✅ HTML formatted emails with message preview
✅ Reply-to field set to sender's email
✅ Error handling and validation

## Testing

1. Go to http://localhost:3000/contact
2. Fill out the contact form
3. Submit the form
4. Check your email (contact@tmkdo.com) and the sender's email for confirmation

## Production Deployment

For production (Vercel, Netlify, etc.), set the environment variables in your hosting platform's settings:
- EMAIL_HOST
- EMAIL_PORT
- EMAIL_SECURE
- EMAIL_USER
- EMAIL_PASSWORD
- EMAIL_FROM
