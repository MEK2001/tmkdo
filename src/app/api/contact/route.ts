export const runtime = 'edge';

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Resend client (Edge-compatible)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email to contact@tmkdo.com via Resend
    const { data, error } = await resend.emails.send({
      from: 'TMKDO Contact <onboarding@resend.dev>', // Use verified domain in production
      to: ['contact@tmkdo.com'],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B2635;">New Contact Form Submission</h2>
          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <h3 style="color: #8B2635; margin-top: 20px;">Message:</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="color: #888; font-size: 12px;">Sent from TMKDO Contact Form</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'TMKDO <onboarding@resend.dev>', // Use verified domain in production
      to: [email],
      subject: 'We received your message - TMKDO',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B2635;">Thank you for reaching out!</h2>
          <p>Hi ${escapeHtml(name)},</p>
          <p>We've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
          <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B2635;">Your message:</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p>Best regards,<br><strong>The Minimalist Kraft & DO Team</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />
          <p style="color: #888; font-size: 12px;">TMKDO - Minimalist Home Decor & Curated Living<br>www.tmkdo.com</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML (prevent XSS)
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
