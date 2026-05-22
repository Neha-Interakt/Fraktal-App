import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { loadAuthCredentials, saveAuthCredentials, clearAuthCredentials, type AuthCredentials } from '@services/keychain';

export type UserRole = 'owner' | 'tenant' | 'manager' | null;

interface AuthState {
  loading: boolean;
  hasOnboarded: boolean;
  isLoggedIn: boolean;
  role: UserRole;
  isNewUser: boolean;
  userName: string;
}

interface AuthContextType extends AuthState {
  completeOnboarding: () => Promise<void>;
  login: (name: string, email: string) => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    hasOnboarded: false,
    isLoggedIn: false,
    role: null,
    isNewUser: false,
    userName: '',
  });

  useEffect(() => {
    loadAuthCredentials()
      .then((creds: AuthCredentials) => {
        setState(prev => ({ ...prev, ...creds, loading: false, isNewUser: false }));
      })
      .catch(() => {
        setState(prev => ({ ...prev, loading: false }));
      });
  }, []);

  const persist = useCallback(async (updates: Partial<AuthState>) => {
    setState(prev => {
      const next = { ...prev, ...updates, loading: false };
      saveAuthCredentials({
        hasOnboarded: next.hasOnboarded,
        isLoggedIn: next.isLoggedIn,
        role: next.role,
        userName: next.userName,
      }).catch(console.error);
      return next;
    });
  }, []);

  const completeOnboarding = useCallback(async () => {
    await persist({ hasOnboarded: true });
  }, [persist]);

  const login = useCallback(async (name: string, _email: string) => {
    await persist({ isLoggedIn: true, userName: name });
  }, [persist]);

  const selectRole = useCallback(async (role: UserRole) => {
    await persist({ role, isNewUser: true });
  }, [persist]);

  const logout = useCallback(async () => {
    await clearAuthCredentials();
    setState({
      loading: false,
      hasOnboarded: false,
      isLoggedIn: false,
      role: null,
      isNewUser: false,
      userName: '',
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, completeOnboarding, login, selectRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
