import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/User';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: String | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<String | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: u, token: token } = await authService.login(email, password);
      localStorage.setItem('cryptoChat.token', token);
      setUser(u);
      setToken(token);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: u, token: token } = await authService.signup(email, password);
      localStorage.setItem('cryptoChat.token', token);
      setUser(u);
      setToken(token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cryptoChat.token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
