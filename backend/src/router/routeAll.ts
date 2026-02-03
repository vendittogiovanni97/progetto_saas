import { Router } from "express";
import authRoutes from "../modules/koda-gup/routes/auth";
import chatbotRoutes from "../modules/chatbots/routes/chatbot.routes";
import projectRoutes from "../modules/projects/routes/project.routes";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/chatbots", chatbotRoutes);
router.use("/api/projects", projectRoutes);

export default router;