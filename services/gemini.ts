import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
};

export const createAgronomistChat = (): Chat => {
  const client = getAIClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are an expert Agronomist and agricultural consultant for FarmGuard. Your goal is to help farmers understand pesticide usage, safety, organic alternatives, and cost-efficiency. Be practical, safety-conscious, and data-driven. Keep answers concise (under 150 words) unless asked for details. Use the search tool to find the most recent prices, regulations, and research.',
      tools: [{ googleSearch: {} }],
    },
  });
};

export interface AgronomistResponse {
  text: string;
  sources?: Array<{ title: string; uri: string }>;
}

export const sendMessageToAgronomist = async (chat: Chat, message: string): Promise<AgronomistResponse> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    
    const sources: Array<{ title: string; uri: string }> = [];
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      groundingChunks.forEach(chunk => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || 'Source',
            uri: chunk.web.uri || '#'
          });
        }
      });
    }

    return {
      text: response.text || "I'm sorry, I couldn't generate a response at this time.",
      sources: sources.length > 0 ? sources : undefined
    };
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return { text: "An error occurred while consulting the AI Agronomist. Please try again later." };
  }
};