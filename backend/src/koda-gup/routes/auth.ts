import { Router } from "express";
import { login, register, getUsers } from "../controllers/auth.controllers";

const router = Router();

// POST /api/login
router.post("/login", login);

// POST /api/register
router.post("/register", register);

router.get("/users", getUsers);

export default router;
