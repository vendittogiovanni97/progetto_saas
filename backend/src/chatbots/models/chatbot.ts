import { Schema, model, Document, Types } from 'mongoose';

/**
 * Interfaccia Chatbot
 */
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

/**
 * Collezione per contatori numerici
 */
const counterSchema = new Schema(
  {
    _id: { type: String, required: true }, // nome del contatore, es. "chatbotId"
    seq: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const Counter = model('Counter', counterSchema);

/**
 * Schema Chatbot
 */
const chatbotSchema = new Schema<IChatbot>(
  {
    id: {
      type: Number,
      unique: true, // ID numerico unico
      required: true,
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
      // TODO: validazione lunghezza
    },
    primaryColor: {
      type: String,
      default: '#3b82f6',
      // TODO: validazione formato HEX
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      // TODO: cascading delete
    },
  },
  {
    timestamps: true,
  }
);

// Indici per performance
chatbotSchema.index({ id: 1 });
chatbotSchema.index({ userId: 1 });
chatbotSchema.index({ createdAt: -1 });

/**
 * Pre-save hook per ID numerico auto-increment
 */
chatbotSchema.pre<IChatbot>('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      'chatbotId',          // nome del contatore
      { $inc: { seq: 1 } }, // incremento atomico
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

/**
 * Export del modello
 */
export const Chatbot = model<IChatbot>('Chatbot', chatbotSchema);
