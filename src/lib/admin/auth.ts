// Admin Authentication Utilities
// Uses Supabase for authentication

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
}

export interface AdminSession {
  user: AdminUser;
  access_token: string;
  refresh_token: string;
}

const WORKER_URL = 'https://tmkdo-cms-auth.eessaa-khan.workers.dev';

export async function loginAdmin(email: string, password: string): Promise<AdminSession> {
  const response = await fetch(`${WORKER_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Login failed');
  }

  return await response.json();
}

export async function signupAdmin(email: string, password: string, fullName: string): Promise<void> {
  const response = await fetch(`${WORKER_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, fullName })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Signup failed');
  }
}

export async function getGitHubToken(accessToken: string): Promise<string> {
  const response = await fetch(`${WORKER_URL}/auth/github-token`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    throw new Error('Failed to get GitHub token');
  }

  const data = await response.json();
  return data.github_token || data.token;
}

// Session management (localStorage)
export function saveSession(session: AdminSession): void {
  localStorage.setItem('admin_session', JSON.stringify(session));
}

export function getSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  
  const sessionStr = localStorage.getItem('admin_session');
  if (!sessionStr) return null;

  try {
    return JSON.parse(sessionStr);
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem('admin_session');
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
