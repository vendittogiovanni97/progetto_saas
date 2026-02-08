import { Router } from "express";
import authRoutes from "../modules/koda-gup/routes/auth";
import chatbotRoutes from "../modules/chatbots/routes/chatbot.routes";
import projectRoutes from "../modules/projects/routes/project.routes";
import categoryRoutes from "../modules/categories/routes/category.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/chatbots", chatbotRoutes);
router.use("/projects", projectRoutes);
router.use("/categories", categoryRoutes);

export default router;