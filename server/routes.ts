import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { userPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all smartphones
  app.get("/api/smartphones", async (req, res) => {
    try {
      const smartphones = await storage.getAllSmartphones();
      res.json(smartphones);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch smartphones" });
    }
  });

  // Get filtered smartphones based on user preferences
  app.post("/api/smartphones/search", async (req, res) => {
    try {
      const preferences = userPreferencesSchema.parse(req.body);
      const smartphones = await storage.getSmartphonesByFilters(preferences);
      res.json(smartphones);
    } catch (error) {
      console.error("Search error:", error);
      res.status(400).json({ 
        message: "Invalid search parameters",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
