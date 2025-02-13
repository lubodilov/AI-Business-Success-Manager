import axios from 'axios';
import type { AIMode } from '../types';

const RAG_API_BASE_URL = 'https://ragapibg.com';

export interface RetrievalResult {
  chunk: string;
}

export const retrieveRelevantContent = async (prompt: string, mode: AIMode): Promise<RetrievalResult[]> => {
  try {
    const response = await axios.post(`${RAG_API_BASE_URL}/retrieve`, {
      prompt,
      datasetId: mode === 'success_manager' ? 'default_dataset' : 'persona_ai'
    });

    return response.data.results || [];
  } catch (error) {
    console.error('RAG Retrieval Error:', error);
    throw new Error('Failed to retrieve relevant content');
  }
};

export const formatRetrievedContent = (results: RetrievalResult[]): string => {
  if (!results.length) return '';

  return `
Relevant information from your knowledge base:

${results.map((result, index) => `
[${index + 1}] ${result.chunk}
`).join('\n')}

Please use this context to provide a more informed response.
`;
};