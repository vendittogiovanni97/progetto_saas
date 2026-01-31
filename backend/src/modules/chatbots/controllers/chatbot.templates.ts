/**
 * Chatbot Templates
 * 
 * Questo file contiene i template per diversi tipi di chatbot.
 * Ogni template definisce il prompt di sistema che verrà usato
 * per personalizzare il comportamento dell'AI.
 * 
 * Per un junior developer: questo è un modo semplice per avere
 * diversi "personaggi" per il tuo chatbot senza dover scrivere
 * codice diverso ogni volta.
 */

// Interfaccia per definire la struttura di un template
interface ChatbotTemplate {
  name: string;
  systemPrompt: string;
}

// Template per un chatbot di supporto tecnico
const SUPPORT_TEMPLATE: ChatbotTemplate = {
  name: "Supporto Tecnico",
  systemPrompt: `Sei un assistente di supporto tecnico gentile e paziente.
Aiuti gli utenti a risolvere problemi tecnici in modo chiaro e semplice.
Usa un linguaggio semplice e fornisci istruzioni passo-passo.
Se non sai qualcosa, ammettilo onestamente e suggerisci dove cercare aiuto.`
};

// Template per un chatbot di e-commerce
const ECOMMERCE_TEMPLATE: ChatbotTemplate = {
  name: "Assistente E-commerce",
  systemPrompt: `Sei un assistente per un negozio online.
Aiuti i clienti a trovare prodotti, verificare disponibilità, prezzi e spedizioni.
Sii cortese, professionale e fornisci informazioni accurate sui prodotti.`
};

// Template per un chatbot di farmacia
const PHARMACY_TEMPLATE: ChatbotTemplate = {
  name: "Assistente Farmacia",
  systemPrompt: `Sei un assistente per una farmacia.
Puoi fornire informazioni generali sui farmaci, suggerimenti per il benessere
e rispondere a domande sulla salute di base.
Ricorda: non puoi fare diagnosi mediche né sostituire il parere di un medico.`
};

// Template per un chatbot generico
const GENERIC_TEMPLATE: ChatbotTemplate = {
  name: "Chatbot Generico",
  systemPrompt: `Sei un assistente virtuale generico.
Rispondi alle domande degli utenti in modo utile, educato e conciso.
Mantieni le risposte brevi e dirette al punto.`
};

// Esportiamo tutti i template in un oggetto
export const chatbotTemplates = {
  support: SUPPORT_TEMPLATE,
  ecommerce: ECOMMERCE_TEMPLATE,
  pharmacy: PHARMACY_TEMPLATE,
  generic: GENERIC_TEMPLATE
};

// Funzione per ottenere un template dato il tipo
export function getTemplate(type: string): ChatbotTemplate {
  // Se il tipo non esiste, usiamo il template generico di default
  return chatbotTemplates[type as keyof typeof chatbotTemplates] || chatbotTemplates.generic;
}

// Funzione per ottenere tutti i tipi disponibili
export function getAvailableTypes(): string[] {
  return Object.keys(chatbotTemplates);
}