import { FormSection } from "@/components/forms/formGeneric";
import { ChatbotType, ChatbotTemplate, ChatbotPersonality } from "@/features/projects/interfaces/Chatbot.entity";
import { CHATBOT_COLORS } from "@/features/projects/components/config/chatbot";

export const chatbotProjectStructure: FormSection[] = [
  {
    title: "Informazioni di Base",
    fields: [
      {
        attributeName: "name",
        label: "Nome del Chatbot",
        type: "text",
        placeholder: "es. Assistente Clienti",
        defaultValue: "",
        colSize: { xs: 12, md: 6 }
      },
      {
        attributeName: "welcomeMessage",
        label: "Messaggio di Benvenuto",
        type: "text",
        placeholder: "Ciao! Come posso aiutarti?",
        defaultValue: "Ciao! Come posso aiutarti oggi?",
        colSize: { xs: 12, md: 6 }
      },
      {
        attributeName: "endpointUrl",
        label: "URL Endpoint",
        type: "text",
        placeholder: "https://api.esempio.it/webhook",
        defaultValue: "",
        colSize: 12
      }
    ]
  },
  {
    title: "Personalizzazione",
    fields: [
      {
        attributeName: "type",
        label: "Tipo di Chatbot",
        type: "select",
        options: Object.values(ChatbotType).map(v => ({ value: v, label: v })),
        defaultValue: ChatbotType.AI,
        colSize: { xs: 12, md: 4 }
      },
      {
        attributeName: "template",
        label: "Template",
        type: "select",
        options: Object.values(ChatbotTemplate).map(v => ({ value: v, label: v })),
        defaultValue: ChatbotTemplate.GENERIC,
        colSize: { xs: 12, md: 4 }
      },
      {
        attributeName: "personality",
        label: "Personalità",
        type: "select",
        options: Object.values(ChatbotPersonality).map(v => ({ value: v, label: v })),
        defaultValue: ChatbotPersonality.PROFESSIONALE,
        colSize: { xs: 12, md: 4 }
      },
      {
        attributeName: "primaryColor",
        label: "Colore Primario",
        type: "color_picker",
        options: Object.entries(CHATBOT_COLORS).map(([name, value]) => ({ value, label: name })),
        defaultValue: CHATBOT_COLORS.blue,
        colSize: 12
      },
      {
        attributeName: "prompt",
        label: "Istruzioni AI (Prompt)",
        type: "textarea",
        placeholder: "Sei un assistente virtuale esperto in...",
        defaultValue: "",
        colSize: 12,
        rows: 4,
        visible: (config) => config.type === ChatbotType.AI
      }
    ]
  }
];
