import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { chatService, ChatError } from '../services/chatService';

interface MediaData {
  symbol: string;
  name: string;
  percentage: number;
  trend: 'up' | 'down';
}

interface Message {
  id: string;
  type: 'text' | 'media';
  content: string;
  role: 'user' | 'bot';
  created_at: string;
  mediaData?: MediaData[];
  error?: boolean;
}

interface ChatMessage {
  id?: string;
  content: string;
  role: 'user' | 'bot';
  created_at?: string;
}

interface ChatContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
  error: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load chat history when component mounts
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const history = await chatService.getHistory();
        if (history.length > 0) {
          const formattedMessages: Message[] = history.map((msg: ChatMessage) => {
            try {
              if (msg.content.includes('mediaData')) {
                const parsedContent = JSON.parse(msg.content);
                return {
                  id: msg.id || Date.now().toString(),
                  type: 'media' as const,
                  content: parsedContent.text || '',
                  role: msg.role,
                  created_at: msg.created_at || new Date().toISOString(),
                  mediaData: parsedContent.mediaData
                };
              }
              return {
                id: msg.id || Date.now().toString(),
                type: 'text' as const,
                content: msg.content,
                role: msg.role,
                created_at: msg.created_at || new Date().toISOString()
              };
            } catch (e) {
              console.error('Error parsing message:', e);
              return {
                id: msg.id || Date.now().toString(),
                type: 'text' as const,
                content: msg.content,
                role: msg.role,
                created_at: msg.created_at || new Date().toISOString(),
                error: true
              };
            }
          });
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar histórico';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      setError(null);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        type: 'text',
        role: 'user',
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, userMessage]);

      // Get AI response
      const response = await fetch(`https://backend-qb2r.onrender.com/call-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: window.localStorage.getItem('email'),
          message: message,
          topic: null,
        }),
      });

      const data = await response.json();
      let botMessage: Message;

      if (response.ok) {
        try {
            botMessage = {
              id: Date.now().toString(),
              type: 'text',
              content: data.message,
              role: 'bot',
              created_at: new Date().toISOString()
            };
          } catch (parseError) {
            console.error('Error parsing bot response:', parseError);
            throw new Error('Erro ao processar resposta do bot');
          }
      }
        
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Desculpe, ocorreu um erro ao processar sua mensagem.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if ((error as ChatError)?.code === 'AUTH_ERROR') {
        errorMessage = 'Você precisa estar autenticado para enviar mensagens.';
      } else if ((error as ChatError)?.code === 'SERVER_ERROR') {
        errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
      }

      setError(errorMessage);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'text',
        content: errorMessage,
        role: 'bot',
        created_at: new Date().toISOString(),
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      setLoading(true);
      setError(null);
      await chatService.clearHistory();
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao limpar histórico';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        sendMessage,
        clearChat,
        error
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}