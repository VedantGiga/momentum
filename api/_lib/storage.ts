import { db } from "./db.js";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import {
  projects,
  applications,
  type Project,
  type InsertProject,
  type Application,
  type InsertApplication,
} from "../../shared/schema.js";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
  approveApplication(id: number): Promise<Application>;
  bulkApproveApplications(ids: number[]): Promise<Application[]>;
  getAppByToken(token: string): Promise<Application | undefined>;
  markInviteUsed(id: number): Promise<void>;
  deleteApplication(id: number): Promise<void>;
  getRecentApplications(limit?: number): Promise<Application[]>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const existing = await db
      .select()
      .from(applications)
      .where(eq(applications.email, insertApplication.email));

    if (existing.length > 0) {
      throw new Error("Application with this email already exists");
    }

    const [application] = await db
      .insert(applications)
      .values({ ...insertApplication, status: "pending" })
      .returning();
    return application;
  }

  async getApplications(): Promise<Application[]> {
    // Sort by status (pending first) then by date
    // We can do this in memory for simplicity since enum handling in SQL sorting varies
    const allApplications = await db
      .select()
      .from(applications)
      .orderBy(applications.createdAt);

    return allApplications.sort((a, b) => {
      // If status is same, sort by date (newest first)
      if (a.status === b.status) {
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      }
      // Pending comes before approved
      return a.status === 'pending' ? -1 : 1;
    });
  }

  async approveApplication(id: number): Promise<Application> {
    const inviteToken = randomUUID();
    const [application] = await db
      .update(applications)
      .set({ status: "approved", inviteToken })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }

  async bulkApproveApplications(ids: number[]): Promise<Application[]> {
    const updatedApplications: Application[] = [];

    // Process one by one to ensure we can return them easily and updates work
    // In a larger app, we'd use a WHERE IN clause
    for (const id of ids) {
      const [app] = await db
        .update(applications)
        .set({ status: "approved" })
        .where(eq(applications.id, id))
        .returning();
      if (app) updatedApplications.push(app);
    }

    return updatedApplications;
  }

  async getAppByToken(token: string): Promise<Application | undefined> {
    const [app] = await db
      .select()
      .from(applications)
      .where(eq(applications.inviteToken, token));
    return app;
  }

  async markInviteUsed(id: number): Promise<void> {
    await db
      .update(applications)
      .set({ isInviteUsed: true })
      .where(eq(applications.id, id));
  }

  async getRecentApplications(limit: number = 20): Promise<Application[]> {
    return await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt))
      .limit(limit);
  }

  async deleteApplication(id: number): Promise<void> {
    await db.delete(applications).where(eq(applications.id, id));
  }
}

export const storage = new DatabaseStorage();
