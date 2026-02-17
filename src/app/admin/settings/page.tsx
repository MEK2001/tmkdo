// Site Settings Page
'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/components/admin/AdminContext';
import { SiteSettings } from '@/lib/admin/content';
import styles from './page.module.css';

export default function SettingsPage() {
  const { githubToken } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: '',
    siteDescription: '',
    siteUrl: '',
    email: '',
    socialLinks: {}
  });

  useEffect(() => {
    if (githubToken) {
      loadSettings();
    }
  }, [githubToken]);

  async function loadSettings() {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings', {
        headers: {
          'x-github-token': githubToken!
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load settings');
      }

      const data = await response.json();
      setSettings(data.settings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      setSaving(true);
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-github-token': githubToken!
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Site Settings</h1>
          <p className={styles.subtitle}>Configure your website settings</p>
        </div>

        {error && (
          <div className={styles.alert} style={{ background: '#fee', color: '#c33', borderColor: '#fcc' }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div className={styles.alert} style={{ background: '#efe', color: '#3a3', borderColor: '#cfc' }}>
            ✅ Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.section}>
            <h2>General Information</h2>

            <div className={styles.formGroup}>
              <label>Site Title</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                placeholder="Your Site Title"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                placeholder="Brief description of your site"
                rows={3}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Site URL</label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                placeholder="https://www.example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Contact Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="hello@example.com"
                required
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Social Media Links</h2>

            <div className={styles.formGroup}>
              <label>Instagram</label>
              <input
                type="url"
                value={settings.socialLinks.instagram || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Pinterest</label>
              <input
                type="url"
                value={settings.socialLinks.pinterest || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, pinterest: e.target.value }
                })}
                placeholder="https://pinterest.com/username"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Twitter / X</label>
              <input
                type="url"
                value={settings.socialLinks.twitter || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
