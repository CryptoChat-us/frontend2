import api from './api';
import { User } from '../types/User';

interface AuthResponse {
  user: User;
  token: string;
  success: boolean;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/v1/auth/login', {
      login: email,
      password,
      language: 'pt'
    },
    {
      headers : {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },

  async loginWithGoogle(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/v1/auth/google');
    return response.data;
  },

  async signup(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/v1/auth/register', {
      email,
      password,
      login: email,
      language: 'pt'
    },
    {
      headers : {
         
        'Content-Type': 'application/json',
      }
    });
    localStorage.setItem('cryptoChat.login', email);
    return response.data;
  },

  async validateToken(token: string): Promise<User> {
    const response = await api.post<User>('/api/v1/auth/validate', { token });
    return response.data;
  },
};