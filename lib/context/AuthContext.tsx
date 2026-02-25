"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "@/lib/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  storeToken: (token: string) => void;
  revokeToken: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getToken();
  });

  const storeToken = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const revokeToken = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, storeToken, revokeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
