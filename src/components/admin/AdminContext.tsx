// Admin Context Provider
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminSession, getSession, saveSession, clearSession, getGitHubToken } from '@/lib/admin/auth';

interface AdminContextType {
  session: AdminSession | null;
  githubToken: string | null;
  loading: boolean;
  setSession: (session: AdminSession) => Promise<void>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<AdminSession | null>(null);
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load session on mount
    const savedSession = getSession();
    if (savedSession) {
      setSessionState(savedSession);
      loadGithubToken(savedSession.access_token);
    } else {
      setLoading(false);
    }
  }, []);

  async function loadGithubToken(accessToken: string) {
    try {
      const token = await getGitHubToken(accessToken);
      setGithubToken(token);
    } catch (error) {
      console.error('Failed to get GitHub token:', error);
    } finally {
      setLoading(false);
    }
  }

  async function setSessionAndSave(newSession: AdminSession) {
    setSessionState(newSession);
    saveSession(newSession);
    await loadGithubToken(newSession.access_token);
  }

  function logout() {
    setSessionState(null);
    setGithubToken(null);
    clearSession();
  }

  return (
    <AdminContext.Provider
      value={{
        session,
        githubToken,
        loading,
        setSession: setSessionAndSave,
        logout
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
