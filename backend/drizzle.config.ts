import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

export default defineConfig({
  schema: './src/util/schema.ts', // Path to your schema file
  out: './drizzle/schema.ts', // Output directory for generated files
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});