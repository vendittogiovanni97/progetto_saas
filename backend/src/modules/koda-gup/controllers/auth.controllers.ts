import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Account from "../models/account";

// Registrazione utente
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    // Controllo se esiste già
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email già in uso" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Account.create({ email, password: hashedPassword, role });

    res.status(201).json({
      message: "Registrazione avvenuta con successo",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Errore registrazione", error: error.message });
  }
};

// Login utente
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Trova utente
    const user = await Account.findOne({ email });
    console.log("Trovato utente:", user);
    if (!user) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    // Controlla password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    res.json({
      message: "Login effettuato con successo",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Errore login", error: error.message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await Account.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Errore recupero utenti", error });
  }
};