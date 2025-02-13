export interface Task {
  id: string;
  title: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  aiRecommendation?: string;
}

export interface Document {
  id: string;
  name: string;
  status: 'processing' | 'ready';
  uploadDate: string;
  url?: string;
  type: 'general' | 'persona';
}

export interface AIAssistantConfig {
  businessGoals: string[];
  industry: string;
  preferredStyle: 'conservative' | 'innovative' | 'balanced';
  focusAreas: string[];
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export type AIMode = 'success_manager' | 'persona';

export interface AIConfig {
  mode: AIMode;
  systemPrompt: string;
  datasetId: string;
}