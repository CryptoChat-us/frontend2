export interface MediaData {
  symbol: string;
  name: string;
  percentage: number;
  trend: 'up' | 'down';
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'media';
  role: 'user' | 'bot';
  created_at: string;
  mediaData?: MediaData[];
  error?: boolean;
}

export interface ChatCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  data?: Record<string, any>;
  type: 'crypto' | 'news' | 'alert';
}