import { type EmailSubscription, type InsertEmailSubscription } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
}

export class MemStorage implements IStorage {
  private emailSubscriptions: Map<string, EmailSubscription>;

  constructor() {
    this.emailSubscriptions = new Map();
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = randomUUID();
    const subscription: EmailSubscription = {
      ...insertSubscription,
      id,
      createdAt: new Date(),
    };
    this.emailSubscriptions.set(id, subscription);
    return subscription;
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    return Array.from(this.emailSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }
}

export const storage = new MemStorage();
