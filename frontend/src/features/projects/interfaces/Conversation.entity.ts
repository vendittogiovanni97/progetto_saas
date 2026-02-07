/**
 * Interfacce per Conversation e Message
 */
export interface Message {
  id: number;
  conversationId: number;
  role: string; // 'user' | 'assistant'
  content: string;
  createdAt: string | Date;
}

export interface Conversation {
  id: number;
  chatbotId: number;
  visitorId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  messages?: Message[];
}
