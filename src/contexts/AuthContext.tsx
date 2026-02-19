import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'lecturer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate login
    await new Promise(r => setTimeout(r, 800));
    setUser({
      id: '1',
      name: role === 'lecturer' ? 'Dr. Sarah Johnson' : 'Alex Thompson',
      email,
      role,
    });
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({ id: '1', name, email, role });
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
