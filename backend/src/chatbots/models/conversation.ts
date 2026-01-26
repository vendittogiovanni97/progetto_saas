import { Schema, model, Document, Types } from 'mongoose';

export interface IConversation extends Document {
  _id: Types.ObjectId;
  id: number; // ID numerico user-friendly
  chatbotId: Types.ObjectId;
  visitorId?: string;
  // TODO: Aggiungere campo metadata per tracciare device, browser, location
  // metadata?: IConversationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    id: {
      type: Number,
      unique: true,
      // ID numerico auto-incrementato
    },
    chatbotId: {
      type: Schema.Types.ObjectId,
      ref: 'Chatbot',
      required: true,
      // TODO: Implementare cascading delete quando il chatbot viene eliminato
    },
    visitorId: {
      type: String,
      // TODO: Generare automaticamente UUID per visitatori anonimi
      // TODO: Aggiungere associazione opzionale a utenti registrati
    },
    // TODO: Aggiungere campo per tracciare se la conversazione è stata conclusa
    // isActive: { type: Boolean, default: true },
    // TODO: Aggiungere rating/feedback della conversazione
    // rating?: { type: Number, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);

// Indici per performance queries
conversationSchema.index({ id: 1 }); // ID numerico lookup
conversationSchema.index({ chatbotId: 1 }); // Query per chatbot
conversationSchema.index({ createdAt: -1 }); // Sort per data
conversationSchema.index({ visitorId: 1 }); // Query per visitatore

export const Conversation = model<IConversation>('Conversation', conversationSchema);
