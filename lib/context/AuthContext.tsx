"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "@/lib/utils/auth";
import { User } from "@/types/auth.types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  storeToken: (token: string) => void;
  revokeToken: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setIsAuthReady(true);
  }, []);

  const storeToken = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const revokeToken = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isAuthReady,
        storeToken,
        revokeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
