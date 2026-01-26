import { Schema, model, Document, Types } from 'mongoose';

export interface IChatbot extends Document {
  _id: Types.ObjectId;
  id: number; // ID numerico user-friendly
  name: string;
  welcomeMessage: string;
  systemPrompt?: string;
  primaryColor: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const chatbotSchema = new Schema<IChatbot>(
  {
    id: {
      type: Number,
      unique: true,
      // ID numerico auto-incrementato (no UUID mess!)
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    welcomeMessage: {
      type: String,
      default: 'Ciao! Come posso aiutarti?',
      trim: true,
    },
    systemPrompt: {
      type: String,
      default: undefined,
      // TODO: Implementare validazione della lunghezza del systemPrompt in futuro
      // TODO: Aggiungere rate limiting per le richieste AI basate su systemPrompt
    },
    primaryColor: {
      type: String,
      default: '#3b82f6',
      // TODO: Validare il formato HEX del colore in futuro
      // match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      // TODO: Aggiungere cascading delete quando l'utente viene eliminato
    },
  },
  {
    timestamps: true,
  }
);

// Indici per performance queries
chatbotSchema.index({ id: 1 }); // ID numerico lookup
chatbotSchema.index({ userId: 1 }); // Query per user
chatbotSchema.index({ createdAt: -1 }); // Sort per data

export const Chatbot = model<IChatbot>('Chatbot', chatbotSchema);
