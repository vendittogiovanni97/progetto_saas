import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  _id: Types.ObjectId;
  id: number; // ID numerico user-friendly
  conversationId: Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
  // TODO: Aggiungere supporto per allegati (immagini, file)
  // attachments?: IAttachment[];
  // TODO: Aggiungere feedback dell'utente (helpful/not helpful)
  // feedback?: boolean;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    id: {
      type: Number,
      unique: true,
      // ID numerico auto-incrementato
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      // TODO: Implementare cascading delete quando la conversation viene eliminata
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      // TODO: Aggiungere validazione della lunghezza massima del messaggio
      // maxlength: 5000
    },
    // TODO: Aggiungere timestamp per calcolare response time
    // responseTime?: { type: Number }, // in ms
    // TODO: Aggiungere token usage per tracking costi API
    // tokenUsage?: { type: Number },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

// Indici per performance queries
messageSchema.index({ id: 1 }); // ID numerico lookup
messageSchema.index({ conversationId: 1, createdAt: -1 }); // Query per conversazione

export const Message = model<IMessage>('Message', messageSchema);
