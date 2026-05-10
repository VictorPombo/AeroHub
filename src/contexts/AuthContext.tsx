'use client';

// ═══════════════════════════════════════════════════════
// AeroGest — Simulated Auth Context (Local-First MVP)
// ═══════════════════════════════════════════════════════

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '@/types/models';
import { mockUser } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with null to match SSR — avoids hydration mismatch
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage after mount (client-only)
  useEffect(() => {
    const stored = localStorage.getItem('aerogest_auth_mvp');
    if (stored === 'true') {
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser(mockUser);
    localStorage.setItem('aerogest_auth_mvp', 'true');
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('aerogest_auth_mvp');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
