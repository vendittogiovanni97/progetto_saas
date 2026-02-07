import { Request, Response } from "express";
import { prisma } from "../../../config/prisma";

/**
 * GET /categories
 * Recupera tutte le categorie (lista semplice)
 */
export async function getCategories(req: Request, res: Response): Promise<void> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero delle categorie",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * GET /categories/:id
 * Recupera una singola categoria per ID
 */
export async function getCategory(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Categoria non trovata",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero della categoria",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

