// Signup Form Component
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signupAdmin } from '@/lib/admin/auth';
import styles from './LoginForm.module.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signupAdmin(email, password, fullName);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      setLoading(false);
    }
  }

  if (success) {
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
            <h1>Account Created!</h1>
            <p>Your account has been successfully created.</p>
          </div>

          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            Please check your email to verify your account.
          </div>

          <Link href="/admin" className={styles.submitBtn}>
            Go to Login
          </Link>
        </div>
      </div>
    );
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
          <h1>Create Account</h1>
          <p>Join TMKDO CMS</p>
        </div>

        {error && (
          <div className={styles.alert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
              minLength={6}
            />
            <small className={styles.hint}>At least 6 characters</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Already have an account?</p>
          <Link href="/admin" className={styles.link}>
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
