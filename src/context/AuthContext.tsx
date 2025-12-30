"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "client" | "web-manager" | "it-support";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
  isCommittee: boolean;
  isItSupport: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // logout must be stable for callbacks that use it
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  // Load token from localStorage on mount and fetch profile
  useEffect(() => {
    let canceled = false;

    const doFetchProfile = async () => {
      if (!token) {
        if (!canceled) setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!canceled && data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        logout();
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    doFetchProfile();

    return () => {
      canceled = true;
    };
  }, [token, logout]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return { success: false, message: errorMessage };
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return { success: false, message: errorMessage };
    }
  };

  // (logout is defined above with useCallback)

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return { success: false, message: errorMessage };
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isMember: user?.role === "client",
    isCommittee: user?.role === "web-manager",
    isItSupport: user?.role === "it-support",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
