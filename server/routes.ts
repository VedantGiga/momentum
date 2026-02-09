import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Activity Feed - Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Applications
  app.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse(req.body);
      const application = await storage.createApplication(input);
      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed initial data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    const seedProjects = [
      {
        title: "DevTools Analytics Dashboard",
        description: "A privacy-first analytics tool for developer documentation sites.",
        author: "alex_builds",
        status: "Shipped",
      },
      {
        title: "Focus Mode Extension",
        description: "Browser extension that blocks distraction feeds during deep work sessions.",
        author: "sarah_k",
        status: "Shipped",
      },
      {
        title: "SaaS Starter Kit",
        description: "Next.js + Stripe + Supabase boilerplate for rapid prototyping.",
        author: "mike_codes",
        status: "In Progress",
      },
      {
        title: "CLI Task Manager",
        description: "Rust-based command line tool for managing daily engineering tasks.",
        author: "jason_dev",
        status: "Shipped",
      }
    ];

    for (const project of seedProjects) {
      await storage.createProject(project);
    }
    console.log("Seeded database with initial projects");
  }
}
