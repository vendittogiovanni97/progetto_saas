import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  _id: Types.ObjectId;
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

// TODO: Aggiungere indici per performance queries
// messageSchema.index({ conversationId: 1, createdAt: -1 });

export const Message = model<IMessage>('Message', messageSchema);
