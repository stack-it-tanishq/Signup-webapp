import { randomBytes } from 'crypto';

export interface EmailSubscription {
  id: string;
  email: string;
  name?: string;
  verificationToken: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsertEmailSubscription {
  email: string;
  name?: string;
}

class InMemoryStorage {
  private subscriptions: Map<string, EmailSubscription> = new Map();
  private emailToId: Map<string, string> = new Map();
  private tokenToId: Map<string, string> = new Map();

  async createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const existing = await this.getEmailSubscriptionByEmail(subscription.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    const id = randomBytes(16).toString('hex');
    const verificationToken = randomBytes(32).toString('hex');
    const now = new Date();

    const newSubscription: EmailSubscription = {
      id,
      email: subscription.email,
      name: subscription.name,
      verificationToken,
      isVerified: false,
      createdAt: now,
      updatedAt: now,
    };

    this.subscriptions.set(id, newSubscription);
    this.emailToId.set(subscription.email.toLowerCase(), id);
    this.tokenToId.set(verificationToken, id);

    return { ...newSubscription };
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    const id = this.emailToId.get(email.toLowerCase());
    if (!id) return undefined;
    
    const subscription = this.subscriptions.get(id);
    return subscription ? { ...subscription } : undefined;
  }

  async verifyEmail(token: string): Promise<EmailSubscription | undefined> {
    const id = this.tokenToId.get(token);
    if (!id) return undefined;

    const subscription = this.subscriptions.get(id);
    if (!subscription) return undefined;

    const updatedSubscription = {
      ...subscription,
      verificationToken: null,
      isVerified: true,
      updatedAt: new Date(),
    };

    this.subscriptions.set(id, updatedSubscription);
    this.tokenToId.delete(token);

    return { ...updatedSubscription };
  }
}

export const storage = new InMemoryStorage();
