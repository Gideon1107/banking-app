import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres.bszouzrifbnexmuukeex:bankdevwebsite12@aws-0-eu-west-2.pooler.supabase.com:6543/postgres",
});


export const db = drizzle(pool);

