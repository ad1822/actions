import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productsRoute from "./routes/products";
import { initializeDatabase } from "./data/migration";
import { closePool } from "./data/db";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.socket.remoteAddress;

  console.log(`${method} ${url} ${ip}`);

  next();
});

app.use(cors());
app.use(express.json());

app.use("/products", productsRoute);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT;

const server = app.listen(PORT, async () => {
  try {
    await initializeDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
});
