
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Analyse un texte juridique via Gemini 3 Pro
 */
export const analyzeDocument = async (text: string) => {
  // Instance créée à chaque appel pour garantir la fraîcheur de la clé (Règle Pro/Veo)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyse critique et structurée du document juridique suivant.
    Extraire : résumé exécutif, clauses pivots, risques identifiés, et recommandations stratégiques.
    Document : ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          clauses: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["summary", "clauses", "risks", "recommendations"]
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

/**
 * Chat juridique avec Grounding (Google Search) et Thinking Mode
 */
export const chatWithAI = async (prompt: string, history: any[] = [], useThinking: boolean = true) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
    config: {
      thinkingConfig: useThinking ? { thinkingBudget: 32768 } : undefined,
      tools: [{ googleSearch: {} }]
    }
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'Source Juridique',
    uri: chunk.web?.uri || '#'
  })).filter((s: any) => s.uri !== '#') || [];

  return { 
    text: response.text, 
    sources 
  };
};

export const generateDraft = async (templateName: string, context: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Rédiger un brouillon de document juridique : "${templateName}". 
    Contexte : ${JSON.stringify(context)}. 
    Utilise un ton professionnel d'expert avocat et respecte le droit français.`,
  });
  
  return response.text;
};
