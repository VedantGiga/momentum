import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../../shared/routes";
import { z } from "zod";
import { sendInviteEmail } from "./mailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Activity Feed - Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // The Pulse - Real-time activity
  app.get("/api/pulse", async (req, res) => {
    try {
      const recentApps = await storage.getRecentApplications(15);

      const logs = recentApps.map(app => {
        // Obfuscate name (e.g. "John Doe" -> "John D.")
        const nameParts = app.name.split(" ");
        const displayName = nameParts.length > 1
          ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.`
          : app.name;

        let action = "applied_to_batch";
        let type = "info";

        if (app.status === 'approved') {
          action = "joined_network";
          type = "success";
        }

        // Randomize location slightly or just use "Global" if we don't have it
        // Since we don't collect location, we'll simulate a bit or just say "Builder"
        return {
          type,
          text: `${action}: '${displayName}'`,
          timestamp: app.createdAt
        };
      });

      // If we don't have enough real data, we can mix in some system events or just return what we have
      // For now, let's just return what we have.
      res.json(logs);
    } catch (err) {
      console.error("Pulse API Error:", err);
      res.status(500).json({ message: "Failed to fetch pulse data" });
    }
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
          field: err.errors[0].path.join("."),
        });
      } else {
        const message = (err as Error).message;
        if (message.includes("already exists") || message.includes("unique constraint")) {
          res.status(409).json({ message: "Application with this email already exists" });
        } else {
          console.error("Application create error:", err);
          res.status(500).json({ message: `Internal server error: ${message}`, details: JSON.stringify(err) });
        }
      }
    }
  });

  app.get("/api/applications", async (req, res) => {
    console.log("[GET] Fetching applications");
    const applications = await storage.getApplications();
    console.log(`[GET] Found ${applications.length} applications`);
    res.json(applications);
  });

  app.patch("/api/applications/:id/approve", async (req, res) => {
    const id = parseInt(req.params.id);
    const application = await storage.approveApplication(id);

    // Send invite email with token
    const emailSent = await sendInviteEmail(application.email, application.name, application.inviteToken!);

    res.json({ ...application, emailSent });
    res.json({ ...application, emailSent });
  });

  app.delete("/api/applications/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[DELETE] Request to delete application ${id}`);
    await storage.deleteApplication(id);
    console.log(`[DELETE] Application ${id} deleted`);
    res.status(204).send();
  });

  app.post("/api/applications/bulk-approve", async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid request: ids array required" });
    }

    const approvedApps = await storage.bulkApproveApplications(ids);
    let successCount = 0;

    // Send emails for each approved app
    for (const app of approvedApps) {
      try {
        await sendInviteEmail(app.email, app.name, app.inviteToken!);
        successCount++;
      } catch (e) {
        console.error(`Failed to send email to ${app.email}`, e);
      }
    }

    res.json({
      count: approvedApps.length,
      emailSuccessCount: successCount,
      message: `Approved ${approvedApps.length} applications`
    });
  });

  app.get("/api/join", async (req, res) => {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).send("Invalid invite link.");
    }

    const app = await storage.getAppByToken(token);

    if (!app) {
      return res.status(403).send("Invalid or expired invite link.");
    }

    if (app.isInviteUsed) {
      return res.status(403).send("This invite link has already been used.");
    }

    // Mark as used
    await storage.markInviteUsed(app.id);

    // Redirect to WhatsApp
    const whatsappLink = "https://chat.whatsapp.com/FvYwe8mMWq8CA3sis5iWV4";
    res.redirect(whatsappLink);
  });

  // Seed initial data if empty
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Failed to seed database:", error);
    // Don't crash the server, just log the error
  }

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
