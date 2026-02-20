// Admin Login Form Component
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { loginAdmin } from '@/lib/admin/auth';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onLoginSuccess: (session: any) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await loginAdmin(email, password);
      onLoginSuccess(session);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Image 
            src="/logo.svg" 
            alt="TMKDO Logo" 
            width={60} 
            height={60}
            className={styles.logoImage}
          />
          <h1>TMKDO CMS</h1>
          <p>Content Management System</p>
        </div>

        <div className={styles.homeLink}>
          <Link href="/" className={styles.backBtn}>
            ← Back to Website
          </Link>
        </div>

        {error && (
          <div className={styles.alert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account?</p>
          <a href="/admin/signup" className={styles.link}>
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
}
