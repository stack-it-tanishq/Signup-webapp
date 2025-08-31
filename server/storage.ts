import { type EmailSubscription, type InsertEmailSubscription } from "@shared/schema";

export interface IStorage {
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
  verifyEmail(token: string): Promise<EmailSubscription | undefined>;
}

// Export PostgreSQL storage by default
export * from './pg-storage';

export { pgStorage as storage } from './pg-storage';
