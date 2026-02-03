import { Request, Response } from "express";
import { prisma } from "../../../config/prisma";

/**
 * POST /projects
 * Crea un nuovo progetto
 * Body: { name, description?, type, accountId, config? }
 */
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const { name, description, type, accountId, config } = req.body;

    if (!name || !accountId) {
      res.status(400).json({
        success: false,
        message: "name e accountId sono richiesti",
      });
      return;
    }

    // Crea il progetto
    const project = await prisma.project.create({
      data: {
        name,
        description,
        type: type || "CHATBOT",
        config: config ? JSON.stringify(config) : null,
        accountId: Number(accountId),
      },
    });

    // Se il tipo è CHATBOT, crea anche il chatbot associato
    if (project.type === "CHATBOT") {
      const chatbotConfig = config || {};
      
      await prisma.chatbot.create({
        data: {
          welcomeMessage: chatbotConfig.welcomeMessage || "Ciao! Come posso aiutarti?",
          type: chatbotConfig.type || "DEFAULT",
          template: chatbotConfig.template || "GENERIC",
          personality: chatbotConfig.personality || "PROFESSIONALE",
          primaryColor: chatbotConfig.primaryColor || "#3b82f6",
          encodedPrompt: chatbotConfig.encodedPrompt || null,
          accountId: Number(accountId),
          projectId: project.id,
        },
      });
    }

    // Recupera il progetto con le relazioni
    const fullProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        chatbot: true,
      },
    });

    res.status(201).json({
      success: true,
      data: fullProject,
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
        chatbot: true, // Include il chatbot se esiste
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
 * Recupera un singolo progetto con le sue relazioni
 */
export async function getProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        chatbot: {
          include: {
            conversations: {
              orderBy: { createdAt: "desc" },
              take: 10, // Ultime 10 conversazioni
            },
          },
        },
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
 * Aggiorna un progetto esistente
 */
export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, description, config } = req.body;

    // Prepara i dati da aggiornare
    const data: any = {};
    if (name) data.name = name;
    if (description !== undefined) data.description = description;
    if (config) data.config = JSON.stringify(config);

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data,
      include: {
        chatbot: true,
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
 * Elimina un progetto e tutte le sue relazioni (chatbot, conversazioni, messaggi)
 */
export async function deleteProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    // Verifica che il progetto esista
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { chatbot: true },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Progetto non trovato",
      });
      return;
    }

    // Se c'è un chatbot associato, elimina prima le conversazioni e i messaggi
    if (project.chatbot) {
      // Elimina tutti i messaggi delle conversazioni del chatbot
      await prisma.message.deleteMany({
        where: {
          conversation: {
            chatbotId: project.chatbot.id,
          },
        },
      });

      // Elimina tutte le conversazioni del chatbot
      await prisma.conversation.deleteMany({
        where: { chatbotId: project.chatbot.id },
      });

      // Elimina il chatbot
      await prisma.chatbot.delete({
        where: { id: project.chatbot.id },
      });
    }

    // Elimina il progetto
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
