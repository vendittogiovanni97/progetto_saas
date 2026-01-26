import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./koda-gup/routes/auth";
import databaseConnection from "./config/mongodb";

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  console.log(">>> Metodo:", req.method, "URL:", req.url, "Origin:", req.headers.origin);
  next();
});

const rawOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const allowedOrigin = rawOrigin.replace(/['"]/g, "").replace(/\/$/, "");

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.use(express.json());

app.use("/api/", authRoutes);


const startServer = async () => {
  await databaseConnection();
  app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
  });
};

startServer();