import api from './api';
import { supabase, Message } from './supabaseClient';

interface ChatMessageResponse {
  answer: string;
  timestamp?: string;
  id?: string;
}

export interface ChatError {
  message: string;
  code: string;
  status?: number;
}

export const chatService = {
  async sendMessage(content: string): Promise<Message> {
    try {
      // Obtém o usuário atual do Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw { message: 'User not authenticated', code: 'AUTH_ERROR' } as ChatError;

      // Envia a mensagem para o backend Spring
      const response = await api.post<ChatMessageResponse>('/api/chat/message', {
        login: user.email,
        message: content
      });

      if (!response.data || !response.data.answer) {
        throw { message: 'Empty response from server', code: 'API_ERROR' } as ChatError;
      }

      // Salva a mensagem do usuário no Supabase
      const { error: userError } = await supabase
        .from('messages')
        .insert([
          { user_id: user.id, content, role: 'user' }
        ]);

      if (userError) {
        console.error('Error saving user message:', userError);
      }

      // Salva a resposta do bot no Supabase
      const { data: botMessage, error: insertError } = await supabase
        .from('messages')
        .insert([
          { 
            user_id: user.id, 
            content: response.data.answer, 
            role: 'bot',
            created_at: response.data.timestamp || new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('Error saving bot message:', insertError);
        // Retorna a resposta mesmo se falhar ao salvar no Supabase
        return {
          id: response.data.id || Date.now().toString(),
          content: response.data.answer,
          role: 'bot',
          created_at: response.data.timestamp || new Date().toISOString()
        } as Message;
      }

      return botMessage as Message;
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

  async getHistory(): Promise<Message[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw { message: 'User not authenticated', code: 'AUTH_ERROR' } as ChatError;

      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        throw { message: 'Error loading history', code: 'DB_ERROR' } as ChatError;
      }

      return messages as Message[];
    } catch (error) {
      console.error('Error in getHistory:', error);
      throw error;
    }
  },

  async clearHistory(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw { message: 'User not authenticated', code: 'AUTH_ERROR' } as ChatError;

      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        throw { message: 'Error clearing history', code: 'DB_ERROR' } as ChatError;
      }
    } catch (error) {
      console.error('Error in clearHistory:', error);
      throw error;
    }
  }
};