import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { navigationRef } from "@/navigation/navigationRef";

export type UserRole = "owner" | "tenant" | "manager" | null;

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

const STORAGE_KEY = "@fraktal_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    hasOnboarded: false,
    isLoggedIn: false,
    role: null,
    isNewUser: false,
    userName: "",
  });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        setState({ ...saved, loading: false, isNewUser: false });
      } else {
        setState((s) => ({ ...s, loading: false }));
      }
    }).catch(() => {
      setState((s) => ({ ...s, loading: false }));
    });
  }, []);

  const save = async (updates: Partial<AuthState>) => {
    const next = { ...state, ...updates, loading: false };
    setState(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
      hasOnboarded: next.hasOnboarded,
      isLoggedIn: next.isLoggedIn,
      role: next.role,
      userName: next.userName,
    }));
  };

  const nav = (name: string) => {
    if (navigationRef.isReady()) {
      navigationRef.reset({ index: 0, routes: [{ name: name as any }] });
    }
  };

  const completeOnboarding = async () => {
    await save({ hasOnboarded: true });
    nav("Login");
  };

  const login = async (name: string, _email: string) => {
    await save({ isLoggedIn: true, userName: name });
    nav("RoleSelect");
  };

  const selectRole = async (role: UserRole) => {
    await save({ role, isNewUser: true });
    nav("App");
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setState({ loading: false, hasOnboarded: false, isLoggedIn: false, role: null, isNewUser: false, userName: "" });
    nav("Onboarding");
  };

  return (
    <AuthContext.Provider value={{ ...state, completeOnboarding, login, selectRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
