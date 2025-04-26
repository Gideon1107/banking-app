import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";



// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL environment variable is required");
// }


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:56RsirUPBtlNGKcZ@db.bszouzrifbnexmuukeex.supabase.co:5432/postgres",
});


export const db = drizzle(pool);

