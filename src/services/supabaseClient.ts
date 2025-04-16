import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas do Supabase
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  content: string;
  type: 'text' | 'media';
  role: 'user' | 'bot';
  created_at: string;
  mediaData?: MediaData[];
  error?: boolean;
}

export interface MediaData {
  symbol: string;
  name: string;
  percentage: number;
  trend: 'up' | 'down';
}
