import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contentService } from "./content-service";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get all entries
  app.get("/api/entries", async (_req, res) => {
    try {
      const entries = await contentService.getAllEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
      res.status(500).json({ message: "Failed to fetch entries" });
    }
  });

  // API endpoint to get a random entry
  // Must be defined before the :slug route to avoid conflict
  app.get("/api/entries/random", async (_req, res) => {
    try {
      const randomEntry = await contentService.getRandomEntry();
      
      if (!randomEntry) {
        return res.status(404).json({ message: "No entries found" });
      }
      
      res.json(randomEntry);
    } catch (error) {
      console.error("Error fetching random entry:", error);
      res.status(500).json({ message: "Failed to fetch random entry" });
    }
  });

  // API endpoint to get a specific entry by slug
  app.get("/api/entries/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const entry = await contentService.getEntry(slug);
      
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      
      res.json(entry);
    } catch (error) {
      console.error(`Error fetching entry ${req.params.slug}:`, error);
      res.status(500).json({ message: "Failed to fetch entry" });
    }
  });
  
  // API endpoint to search entries
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim() === '') {
        return res.json([]);
      }
      
      const results = await contentService.searchEntries(query);
      res.json(results);
    } catch (error) {
      console.error(`Error searching entries:`, error);
      res.status(500).json({ message: "Failed to search entries" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
