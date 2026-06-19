import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("yatraverse_token")
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("yatraverse_user");
    return stored ? JSON.parse(stored) : null;
  });

  // Call this after a successful /login response
  const login = (newToken, userData) => {
    localStorage.setItem("yatraverse_token", newToken);
    if (userData) {
      localStorage.setItem("yatraverse_user", JSON.stringify(userData));
    }
    setToken(newToken);
    setUser(userData || null);
  };

  const logout = () => {
    localStorage.removeItem("yatraverse_token");
    localStorage.removeItem("yatraverse_user");
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}