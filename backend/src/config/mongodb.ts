/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export default async function databaseConnection(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI non è definito nelle variabili d'ambiente");
  }

  if (mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB è già connesso");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connesso con successo");
  } catch (error : any) {
    console.error("❌ Errore di connessione a MongoDB:", error.message);
    process.exit(1); 
  }
};