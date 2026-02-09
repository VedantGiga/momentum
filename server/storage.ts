import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  projects,
  applications,
  type Project,
  type InsertProject,
  type Application,
  type InsertApplication,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
  approveApplication(id: number): Promise<Application>;
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
    return await db.select().from(applications).orderBy(applications.createdAt);
  }

  async approveApplication(id: number): Promise<Application> {
    const [application] = await db
      .update(applications)
      .set({ status: "approved" })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }
}

export const storage = new DatabaseStorage();
