import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, RefreshCw, FileText, BookOpen, User } from 'lucide-react';
import { generateChatResponse } from '../lib/openai';
import type { Message, AIMode } from '../types';

const AI_MODE_CONFIG = {
  success_manager: {
    icon: BookOpen,
    title: 'Success Manager',
    description: 'Strategic business advice and insights',
    welcomeMessage: "Hello! I'm your AI Business Success Manager. I can help you optimize your business strategy and operations using insights from your knowledge base. How can I assist you today?"
  },
  persona: {
    icon: User,
    title: 'Advanced AI Persona',
    description: 'Simulated customer interactions',
    welcomeMessage: "Hi! I'm your AI Customer Persona. I'll help you understand your target market better by responding as your ideal customer would. What would you like to discuss?"
  }
};

export default function Chat() {
  const [mode, setMode] = useState<AIMode | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const selectMode = (selectedMode: AIMode) => {
    setMode(selectedMode);
    setMessages([{
      id: Date.now().toString(),
      content: AI_MODE_CONFIG[selectedMode].welcomeMessage,
      sender: 'ai',
      timestamp: new Date().toISOString()
    }]);
  };

  const startNewConversation = () => {
    setMode(null);
    setMessages([]);
    setInput('');
    setError(null);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !mode) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const formattedMessages = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }));

      const response = await generateChatResponse(formattedMessages, mode);

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response || 'I apologize, but I couldn\'t generate a response. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mode) {
    return (
      <div className="flex h-[calc(100vh-8rem)] flex-col">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Select AI Mode</h1>
          <p className="mt-1 text-sm text-gray-500">Choose how you want to interact with the AI</p>
        </div>

        <div className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {(Object.entries(AI_MODE_CONFIG) as [AIMode, typeof AI_MODE_CONFIG.success_manager][]).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => selectMode(key)}
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all"
                >
                  <div className="p-3 bg-indigo-50 rounded-full">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{config.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">{config.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">AI Assistant Chat</h1>
          <p className="mt-1 text-sm text-gray-500 flex items-center">
            {mode === 'success_manager' ? (
              <>
                <BookOpen className="h-4 w-4 mr-1" />
                Business Success Manager
              </>
            ) : (
              <>
                <User className="h-4 w-4 mr-1" />
                Advanced AI Persona
              </>
            )}
          </p>
        </div>
        <button
          onClick={startNewConversation}
          className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Conversation
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}