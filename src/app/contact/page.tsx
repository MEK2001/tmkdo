'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className={styles.pageHero}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Let's start a conversation about creating your perfect minimalist space.</p>
      </section>

      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <div>
            <h2>Let's Connect</h2>
            <p>Whether you have a question about our content, need design advice, or want to collaborate, we're here to help. Fill out the form or reach out through any of our channels below.</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📧</div>
            <div className={styles.infoContent}>
              <h3>Email Us</h3>
              <p>hello@theminimalistkraft.com</p>
              <p>We typically respond within 24-48 hours</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <div className={styles.infoContent}>
              <h3>Location</h3>
              <p>Based in Portland, Oregon</p>
              <p>Serving home decor enthusiasts worldwide</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>⏰</div>
            <div className={styles.infoContent}>
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM PST</p>
              <p>Weekend inquiries answered on Monday</p>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Select a topic</option>
                <option value="design-advice">Design Advice</option>
                <option value="collaboration">Collaboration Inquiry</option>
                <option value="blog-question">Blog Question</option>
                <option value="product-recommendation">Product Recommendation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <section className={styles.socialConnect}>
        <h2>Follow Our Journey</h2>
        <p>Join our community on social media for daily inspiration, behind-the-scenes content, and exclusive design tips.</p>
        <div className={styles.socialGrid}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
            <span className={styles.socialIcon}>📷</span>
            <h3>Instagram</h3>
            <p>@theminimalistkraft</p>
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
            <span className={styles.socialIcon}>📌</span>
            <h3>Pinterest</h3>
            <p>Design Boards & Inspiration</p>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
            <span className={styles.socialIcon}>🐦</span>
            <h3>Twitter</h3>
            <p>@minimalistkraft</p>
          </a>
        </div>
      </section>
    </>
  );
}
