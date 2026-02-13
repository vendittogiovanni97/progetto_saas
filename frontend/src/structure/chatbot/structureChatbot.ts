import { FormSection } from "@/components/forms/formGeneric";
import {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotLanguage,
  ChatbotPosition,
} from "@/features/projects/interfaces/Chatbot.entity";
import {
  CHATBOT_COLORS,
  TYPE_LABELS,
  TEMPLATE_LABELS,
  PERSONALITY_LABELS,
  LANGUAGE_LABELS,
  POSITION_LABELS,
  enumToOptions,
} from "@/features/projects/components/config/chatbot";

export const chatbotProjectStructure: FormSection[] = [
  {
    title: "Identità",
    fields: [
      {
        attributeName: "name",
        label: "Nome del Chatbot",
        type: "text",
        placeholder: "es. Assistente Clienti, HelpBot",
        defaultValue: "",
        colSize: { xs: 12, md: 6 },
      },
      {
        attributeName: "language",
        label: "Lingua",
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
        label: "Istruzioni AI (System Prompt)",
        type: "textarea",
        placeholder:
          "Sei un assistente virtuale esperto in... Rispondi sempre in modo cortese e conciso.",
        defaultValue: "",
        colSize: 12,
        rows: 4,
        visible: (config) =>
          config.type === ChatbotType.AI || config.type === ChatbotType.HYBRID,
      },
    ],
  },
  {
    title: "Aspetto",
    fields: [
      {
        attributeName: "primaryColor",
        label: "Colore Primario",
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
    ],
  },
  {
    title: "Connessione",
    fields: [
      {
        attributeName: "endpointUrl",
        label: "URL Endpoint (Webhook)",
        type: "text",
        placeholder: "https://api.tuodominio.it/chatbot/webhook",
        defaultValue: "",
        colSize: 12,
      },
    ],
  },
];
