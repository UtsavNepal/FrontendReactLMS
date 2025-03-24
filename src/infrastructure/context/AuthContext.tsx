import React, { createContext, useContext, useState, useEffect } from "react";
import { authRepository, LoginResponse } from "../repositories/AuthRepositories";

interface AuthContextType {
  isAuthenticated: boolean;
  users: LoginResponse[]; // Array of users
  login: (username: string, password: string, onSuccess?: () => void) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  users: [], 
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("access_token"));
  const [users, setUsers] = useState<LoginResponse[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // Save users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = async (username: string, password: string, onSuccess?: () => void) => {
    try {
      const response = await authRepository.login({ user_name: username, password: password });
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      setIsAuthenticated(true);
      setUsers([response]); // Set the logged-in user
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUsers([]); // Reset to an empty array
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("users"); // Clear users from localStorage
    setIsAuthenticated(false);
    setUsers([]); // Reset to an empty array
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, users, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};