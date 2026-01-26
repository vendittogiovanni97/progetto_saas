import { Schema, model } from 'mongoose';

/**
 * Counter per auto-incrementare gli ID
 * 
 * Traccia: { _id: 'chatbots', seq: 5 }
 * Significa: il prossimo chatbot avrà id: 6
 */
const counterSchema = new Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});

const Counter = model('Counter', counterSchema);

/**
 * Ottiene il prossimo ID numerico
 * 
 * Uso:
 *   const id = await getNextId('chatbots');  // Ritorna 1, 2, 3...
 */
export async function getNextId(name: string): Promise<number> {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter!.seq;
}
