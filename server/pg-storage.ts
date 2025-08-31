import { db } from './db';
import { emailSubscriptions } from '@shared/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import type { EmailSubscription, InsertEmailSubscription } from '@shared/schema';

export class PostgresStorage {
  /**
   * Inserts a new subscriber with a verification token
   */
  async insertSubscriber(email: string, name?: string): Promise<EmailSubscription> {
    const verificationToken = this.generateVerificationToken();
    
    const [subscription] = await db
      .insert(emailSubscriptions)
      .values({
        email,
        name,
        status: 'pending',
        verificationToken,
        verifiedAt: null,
        createdAt: new Date()
      })
      .onConflictDoUpdate({
        target: emailSubscriptions.email,
        set: {
          name,
          status: 'pending',
          verificationToken,
          verifiedAt: null
        }
      })
      .returning();

    return subscription;
  }

  /**
   * Finds a subscriber by their verification token
   */
  async findByToken(verificationToken: string): Promise<EmailSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(emailSubscriptions)
      .where(
        and(
          eq(emailSubscriptions.verificationToken, verificationToken),
          isNull(emailSubscriptions.verifiedAt)
        )
      )
      .limit(1);

    return subscription;
  }

  /**
   * Verifies a subscriber using their verification token
   */
  async verifySubscriber(verificationToken: string): Promise<EmailSubscription | undefined> {
    const [subscription] = await db
      .update(emailSubscriptions)
      .set({ 
        status: 'verified',
        verifiedAt: new Date(),
        verificationToken: null 
      })
      .where(
        and(
          eq(emailSubscriptions.verificationToken, verificationToken),
          isNull(emailSubscriptions.verifiedAt)
        )
      )
      .returning();

    return subscription;
  }

  /**
   * Helper method to generate a secure verification token
   */
  private generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
  }

  // Keeping these methods for backward compatibility
  async createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription> {
    return this.insertSubscriber(subscription.email, subscription.name || undefined);
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.email, email))
      .limit(1);
    
    return subscription;
  }
}

export const pgStorage = new PostgresStorage();
