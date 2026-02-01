export function encodePrompt(prompt: string): string {
  return Buffer.from(prompt, 'utf-8').toString('base64');
}

export function decodePrompt(encodedPrompt: string): string {
  return Buffer.from(encodedPrompt, 'base64').toString('utf-8');
}

export function getFinalSystemPrompt(chatbot: {
  template: string;
  personality: string;
  encodedPrompt?: string | null;
}): string {
  let basePrompt = '';

  // Se è GENERIC, prendi il prompt dall'env
  if (chatbot.template === 'GENERIC') {
    basePrompt = getGenericPrompt();
  } 
  // Se è CUSTOM, decodifica il prompt dal database
  else if (chatbot.template === 'CUSTOM' && chatbot.encodedPrompt) {
    basePrompt = decodePrompt(chatbot.encodedPrompt);
  } 
  // Fallback: usa il generico
  else {
    basePrompt = getGenericPrompt();
  }

  // Aggiungi le istruzioni di personalità
  return addPersonality(basePrompt, chatbot.personality);
}

function getGenericPrompt(): string {
  return process.env.GENERIC_SYSTEM_PROMPT || 
    'Sei un assistente virtuale. Rispondi in modo utile ed educato.';
}

function addPersonality(prompt: string, personality: string): string {
  const personalityTexts: { [key: string]: string } = {
    'AMICHEVOLE': '\n\nUsa un tono amichevole e caloroso.',
    'PROFESSIONALE': '\n\nMantieni un tono formale e professionale.',
    'ESPERTO': '\n\nDimostra competenza ed esperienza.',
    'CONCISO': '\n\nSii breve e vai dritto al punto.',
    'DETTAGLIATO': '\n\nFornisci spiegazioni dettagliate.',
    'TECNICO': '\n\nUsa terminologia tecnica.',
    'INFORMALE': '\n\nSii casual e conversazionale.',
    'DIVERTENTE': '\n\nAggiungi un tocco di umorismo.',
  };

  const personalityText = personalityTexts[personality] || '';
  return prompt + personalityText;
}
