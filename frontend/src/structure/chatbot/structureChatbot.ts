import { FormSection } from "@/components/forms/formGeneric";
import {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotLanguage,
  ChatbotPosition,
} from "@/features/projects/interfaces/Project.entity";
import {
  CHATBOT_COLORS,
  TYPE_LABELS,
  TEMPLATE_LABELS,
  PERSONALITY_LABELS,
  LANGUAGE_LABELS,
  POSITION_LABELS,
  enumToOptions,
} from "@/features/projects/components/config/chatbot";
import { registerStructure } from "@/utils/structureRegistry";
import { ChatbotPreview } from "@/features/projects/components/chatbot/ChatbotPreview";

export const chatbotProjectStructure: FormSection[] = [
  {
    title: "Identità",
    description: "Definisci il nome, la lingua e il primo messaggio che l'utente vedrà.",
    fields: [
      {
        attributeName: "name",
        label: "Nome del Chatbot",
        type: "text",
        placeholder: "es. Koda Assistant, HelpBot Pro",
        defaultValue: "",
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "language",
        label: "Lingua Principale",
        type: "select",
        options: enumToOptions(ChatbotLanguage, LANGUAGE_LABELS),
        defaultValue: ChatbotLanguage.IT,
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "welcomeMessage",
        label: "Messaggio di Benvenuto",
        type: "textarea",
        placeholder: "Ciao! Sono qui per aiutarti. Scrivi pure la tua domanda.",
        defaultValue: "Ciao! Come posso aiutarti oggi?",
        colSize: 12,
        rows: 2,
      },
    ],
  },
  {
    title: "Comportamento",
    description: "Scegli come il chatbot pensa, risponde e si comporta con gli utenti.",
    fields: [
      {
        attributeName: "type",
        label: "Tipologia",
        type: "select",
        options: enumToOptions(ChatbotType, TYPE_LABELS),
        defaultValue: ChatbotType.AI,
        colSize: { xs: 12, md: 4 },
      },
      {
        attributeName: "template",
        label: "Template",
        type: "select",
        options: enumToOptions(ChatbotTemplate, TEMPLATE_LABELS),
        defaultValue: ChatbotTemplate.GENERIC,
        colSize: { xs: 12, md: 4 },
      },
      {
        attributeName: "personality",
        label: "Personalità",
        type: "select",
        options: enumToOptions(ChatbotPersonality, PERSONALITY_LABELS),
        defaultValue: ChatbotPersonality.PROFESSIONALE,
        colSize: { xs: 12, md: 4 },
      },
      {
        attributeName: "prompt",
        label: "System Prompt (Istruzioni AI)",
        type: "textarea",
        placeholder: "Sei un assistente virtuale esperto in... Rispondi sempre in modo cortese e conciso.",
        defaultValue: "",
        colSize: 12,
        rows: 5,
        visible: (config) =>
          config.type === ChatbotType.AI || config.type === ChatbotType.HYBRID,
      },
      {
        attributeName: "temperature",
        label: "Temperatura (Creatività)",
        type: "number",
        placeholder: "0.7",
        defaultValue: 0.7,
        min: 0,
        max: 2,
        step: 0.1,
        colSize: { xs: 12, md: 6 },
        helperText: "0 = preciso e deterministico · 2 = creativo e imprevedibile",
        visible: (config) =>
          config.type === ChatbotType.AI || config.type === ChatbotType.HYBRID,
      },
      {
        attributeName: "maxTokens",
        label: "Max Token per Risposta",
        type: "number",
        placeholder: "512",
        defaultValue: 512,
        min: 64,
        max: 4096,
        step: 64,
        colSize: { xs: 12, md: 6 },
        helperText: "Limita la lunghezza delle risposte generate dall'AI",
        visible: (config) =>
          config.type === ChatbotType.AI || config.type === ChatbotType.HYBRID,
      },
    ],
  },
  {
    title: "Aspetto",
    description: "Personalizza colori, posizione e aspetto visivo del widget.",
    fields: [
      {
        attributeName: "primaryColor",
        label: "Colore Brand",
        type: "color_picker",
        options: Object.entries(CHATBOT_COLORS).map(([name, value]) => ({
          value,
          label: name,
        })),
        defaultValue: CHATBOT_COLORS.indigo,
        colSize: 12,
      },
      {
        attributeName: "position",
        label: "Posizione Widget",
        type: "select",
        options: enumToOptions(ChatbotPosition, POSITION_LABELS),
        defaultValue: ChatbotPosition.BOTTOM_RIGHT,
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "avatarEmoji",
        label: "Avatar (Emoji)",
        type: "text",
        placeholder: "🤖",
        defaultValue: "🤖",
        colSize: { xs: 12, md: 6 },
      },
    ],
  },
  {
    title: "Funzionalità",
    description: "Abilita o disabilita le funzionalità avanzate del chatbot.",
    fields: [
      {
        attributeName: "enableFeedback",
        label: "Feedback Utente",
        type: "switch",
        defaultValue: true,
        helperText: "Permette agli utenti di valutare le risposte con 👍 / 👎",
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "enableTypingIndicator",
        label: "Indicatore di Digitazione",
        type: "switch",
        defaultValue: true,
        helperText: "Mostra l'animazione \"sta scrivendo...\" durante la generazione",
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "enableSoundNotification",
        label: "Notifiche Sonore",
        type: "switch",
        defaultValue: false,
        helperText: "Riproduce un suono alla ricezione di un nuovo messaggio",
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "enableFileUpload",
        label: "Upload File",
        type: "switch",
        defaultValue: false,
        helperText: "Consente agli utenti di allegare file nella conversazione",
        colSize: { xs: 12, md: 6 },
      },
    ],
  },
  {
    title: "Connessione",
    description: "Configura l'endpoint e le impostazioni di rete per l'integrazione.",
    fields: [
      {
        attributeName: "endpointUrl",
        label: "URL Endpoint (Webhook)",
        type: "text",
        placeholder: "https://api.tuodominio.it/chatbot/webhook",
        defaultValue: "",
        colSize: 12,
      },
      {
        attributeName: "apiKey",
        label: "API Key",
        type: "text",
        placeholder: "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
        defaultValue: "",
        colSize: { xs: 12, md: 6 },
        visible: (config) =>
          config.type === ChatbotType.AI || config.type === ChatbotType.HYBRID,
      },
      {
        attributeName: "timeoutMs",
        label: "Timeout (ms)",
        type: "number",
        placeholder: "30000",
        defaultValue: 30000,
        min: 1000,
        max: 120000,
        step: 1000,
        colSize: { xs: 12, md: 6 },
        helperText: "Tempo massimo di attesa per una risposta dal server",
      },
    ],
  },
];

// Auto-registrazione nel registry
registerStructure(1, {
  sections: chatbotProjectStructure,
  previewComponent: ChatbotPreview,
});
