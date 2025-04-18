import api from './api';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  created_at: string;
  user_id?: string;
}

interface ChatMessageResponse {
  answer: string;
  timestamp?: string;
  id?: string;
  status?: string;
  message?: string;
}

export interface ChatError {
  message: string;
  code: string;
  status?: number;
}

export const chatService = {
  async sendMessage(content: string): Promise<Message> {
    try {
      // Envia a mensagem para o backend Spring
      const response = await api.post<ChatMessageResponse>('/call-chat', {
        message: content,
        email: localStorage.getItem('cryptoChat.email') || ''
      });

      if (!response.data) {
        throw { message: 'Empty response from server', code: 'API_ERROR' } as ChatError;
      }

      // O backend agora cuida do armazenamento das mensagens
      // Retorna a resposta formatada como uma mensagem
      return {
        id: response.data.id || Date.now().toString(),
        content: response.data.message || '',
        role: 'bot',
        created_at: response.data.timestamp || new Date().toISOString()
      } as Message;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      // Erro de rede (sem resposta do servidor)
      if ((error as any).message === 'Network Error') {
        throw { 
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.', 
          code: 'NETWORK_ERROR',
          status: 0
        } as ChatError;
      }
      
      // Erro do servidor
      if ((error as any).response?.status === 500) {
        throw { 
          message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.', 
          code: 'SERVER_ERROR',
          status: 500 
        } as ChatError;
      }

      // Erro de autenticação
      if ((error as any).response?.status === 401) {
        throw { 
          message: 'Sua sessão expirou. Por favor, faça login novamente.', 
          code: 'AUTH_ERROR',
          status: 401 
        } as ChatError;
      }

      // Erro de validação
      if ((error as any).response?.status === 400) {
        throw { 
          message: 'Dados inválidos. Por favor, verifique sua mensagem.', 
          code: 'VALIDATION_ERROR',
          status: 400 
        } as ChatError;
      }

      // Outros erros
      throw {
        message: (error as any).message || 'Ocorreu um erro inesperado',
        code: 'UNKNOWN_ERROR',
        status: (error as any).response?.status
      } as ChatError;
    }
  },

  // Observação: Este método não vai funcionar até que seja implementado no backend
  async getHistory(): Promise<Message[]> {
    try {
      // Como o backend não tem um endpoint específico para histórico,
      // retornamos um array vazio por enquanto
      console.warn('History endpoint not implemented in backend');
      return [];
      
      // Quando o backend implementar o endpoint, use este código:
      // const response = await api.get<Message[]>('/api/chat/history');
      // return response.data;
    } catch (error) {
      console.error('Error in getHistory:', error);
      
      // Erro de autenticação
      if ((error as any).response?.status === 401) {
        throw { 
          message: 'Sua sessão expirou. Por favor, faça login novamente.', 
          code: 'AUTH_ERROR',
          status: 401 
        } as ChatError;
      }
      
      throw {
        message: (error as any).message || 'Erro ao carregar histórico',
        code: 'API_ERROR',
        status: (error as any).response?.status
      } as ChatError;
    }
  },

  // Observação: Este método não vai funcionar até que seja implementado no backend
  async clearHistory(): Promise<void> {
    try {
      // Como o backend não tem um endpoint específico para limpar histórico,
      // não fazemos nada por enquanto
      console.warn('Clear history endpoint not implemented in backend');
      
      // Quando o backend implementar o endpoint, use este código:
      // await api.delete('/api/chat/history');
    } catch (error) {
      console.error('Error in clearHistory:', error);
      
      // Erro de autenticação
      if ((error as any).response?.status === 401) {
        throw { 
          message: 'Sua sessão expirou. Por favor, faça login novamente.', 
          code: 'AUTH_ERROR',
          status: 401 
        } as ChatError;
      }
      
      throw {
        message: (error as any).message || 'Erro ao limpar histórico',
        code: 'API_ERROR',
        status: (error as any).response?.status
      } as ChatError;
    }
  }
};