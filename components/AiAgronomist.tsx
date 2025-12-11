import React, { useState, useRef, useEffect } from 'react';
import { createAgronomistChat, sendMessageToAgronomist, AgronomistResponse } from '../services/gemini';
import { Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: Array<{ title: string; uri: string }>;
}

export const AiAgronomist: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your AI Agronomist assistant. Ask me about pest control, chemical safety, or organic alternatives.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat once
  useEffect(() => {
    chatRef.current = createAgronomistChat();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRef.current) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response: AgronomistResponse = await sendMessageToAgronomist(chatRef.current, userMsg);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      sources: response.sources
    }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-expert" className="py-16 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Ask the AI Agronomist</h2>
          <p className="mt-2 text-gray-600">Powered by Gemini models to answer your farming questions.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-green-600 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-200/50">
                      <p className="text-xs font-semibold opacity-70 mb-1">Sources:</p>
                      <ul className="space-y-1">
                        {msg.sources.map((source, i) => (
                          <li key={i}>
                            <a 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs hover:underline flex items-start gap-1 opacity-80 hover:opacity-100"
                              style={{ color: msg.role === 'user' ? 'inherit' : '#2563eb' }}
                            >
                              <span className="shrink-0 mt-0.5">•</span>
                              <span className="break-all">{source.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about application rates, pests, or products..."
                className="flex-1 rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">AI can make mistakes. Always verify with product labels and local experts.</p>
      </div>
    </section>
  );
};