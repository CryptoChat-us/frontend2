import api from './api';
import { User } from '../types/User';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  /**
   * Login de usuário
   * @param login - identificador (usuário/email)
   * @param password - senha
   * @param language - código de idioma (ex: 'pt', 'en')
   */
  async login(
    login: string,
    password: string,
    language: string = 'pt'
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      login,
      password,
      language,
    });
    return response.data;
  },

  /**
   * Registro de novo usuário
   * @param login - identificador (usuário/email)
   * @param email - email cadastrado
   * @param password - senha
   * @param name - nome completo
   * @param language - código de idioma (ex: 'pt', 'en')
   */
  async signup(
    login: string,
    email: string,
    password: string,
    name: string,
    language: string = 'pt'
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      login,
      email,
      password,
      name,
      language,
    });
    return response.data;
  },

  /**
   * Verifica disponibilidade de login
   * @param login - identificador a verificar
   */
  async verifyLogin(login: string): Promise<{ success: boolean; message: string }> {
    const response = await api.get<{ success: boolean; message: string }>(
      '/auth/verify-login',
      { params: { login } }
    );
    return response.data;
  },

  /**
   * Exclui usuário (requer token/admin)
   * @param login - identificador do usuário a excluir
   */
  async deleteUser(login: string): Promise<void> {
    await api.delete('/auth/user', { params: { login } });
  },
};
