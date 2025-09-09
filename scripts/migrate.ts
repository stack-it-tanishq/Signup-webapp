import * as dotenv from 'dotenv';
import { db } from '../server/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
