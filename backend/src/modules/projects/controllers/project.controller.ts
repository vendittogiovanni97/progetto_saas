import { Request, Response } from "express";
import { prisma } from "../../../config/prisma";

/**
 * POST /projects
 * Crea un nuovo progetto generico
 * Body: { name, accountId, categoryId, structure? }
 */
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const { name, accountId, categoryId, structure } = req.body;

    if (!name || !accountId || !categoryId) {
      res.status(400).json({
        success: false,
        message: "name, accountId e categoryId sono richiesti",
      });
      return;
    }

    const project = await prisma.project.create({
      data: {
        name,
        accountId: Number(accountId),
        categoryId: Number(categoryId),
        structure: structure ? JSON.stringify(structure) : null,
        status: "ATTIVO",
      },
      include: {
        category: true,
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nella creazione del progetto",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * GET /projects
 * Recupera tutti i progetti di un account
 * Query params: accountId
 */
export async function getUserProjects(req: Request, res: Response): Promise<void> {
  try {
    const { accountId } = req.query;

    if (!accountId) {
      res.status(400).json({
        success: false,
        message: "accountId è richiesto",
      });
      return;
    }

    const projects = await prisma.project.findMany({
      where: { accountId: Number(accountId) },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero dei progetti",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * GET /projects/:id
 * Recupera un singolo progetto
 */
export async function getProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Progetto non trovato",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero del progetto",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * PUT /projects/:id
 * Aggiorna un progetto
 */
export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, status, structure } = req.body;

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(status && { status }),
        ...(structure && { structure: JSON.stringify(structure) }),
      },
      include: {
        category: true,
      },
    });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'aggiornamento del progetto",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * DELETE /projects/:id
 * Elimina un progetto
 */
export async function deleteProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Progetto eliminato con successo",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'eliminazione del progetto",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}
