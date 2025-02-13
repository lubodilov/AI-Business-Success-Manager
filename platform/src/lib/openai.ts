import OpenAI from 'openai';
import { retrieveRelevantContent, formatRetrievedContent } from './rag';
import type { AIMode } from '../types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, proxy through your backend
});

const AI_MODES = {
  success_manager: {
    systemPrompt: `You are an AI Business Success Manager providing expert advice on business success strategies. 
    Your role is to:
    - Analyze business situations and provide strategic insights
    - Offer actionable recommendations based on industry best practices
    - Help optimize operations and improve efficiency
    - Guide decision-making with data-driven insights
    - Maintain a professional, strategic perspective`,
    datasetId: 'default_dataset'
  },
  persona: {
    systemPrompt: `You are an AI simulation of a perfect customer avatar from the user's target market. 
    Your role is to:
    - Think and respond exactly as a real customer would
    - Share authentic perspectives on products and services
    - Express genuine customer needs, desires, and pain points
    - Provide feedback that reflects real market sentiment
    - Maintain a natural, conversational tone`,
    datasetId: 'persona_ai'
  }
};

export const generateChatResponse = async (
  messages: { role: 'user' | 'assistant'; content: string }[],
  mode: AIMode
) => {
  try {
    // Get the user's latest message
    const userMessage = messages[messages.length - 1];
    
    // Only retrieve content for user messages
    let ragContext = '';
    if (userMessage.role === 'user') {
      try {
        const relevantContent = await retrieveRelevantContent(userMessage.content, mode);
        ragContext = formatRetrievedContent(relevantContent);
      } catch (error) {
        console.error('RAG retrieval failed:', error);
        // Continue without RAG context if retrieval fails
      }
    }

    // Get the configuration for the selected AI mode
    const modeConfig = AI_MODES[mode];

    // Prepare messages array with RAG context
    const enhancedMessages = [
      {
        role: 'system',
        content: `${modeConfig.systemPrompt}
          
          ${ragContext ? 'Use the following retrieved information to enhance your response:' : ''}
          ${ragContext}`
      },
      ...messages
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: enhancedMessages,
      temperature: mode === 'success_manager' ? 0.7 : 0.9,
      max_tokens: 1000,
      presence_penalty: 0.6,
      frequency_penalty: 0.3
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
};