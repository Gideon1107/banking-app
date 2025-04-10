import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './util/schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing in environment variables');
    process.exit(1);
  }

  console.log('Connecting to database...');

  try {
    // Create postgres client
    const client = postgres(process.env.DATABASE_URL);

    // Create drizzle instance
    const db = drizzle(client, { schema });

    // Test query - count users
    const userCount = await db.select({ count: sql`count(*)` }).from(schema.users);

    console.log('Connection successful!');
    console.log(`Number of users in database: ${userCount[0].count}`);

    // Test query - get all tables
    const tables = await client`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;

    console.log('\nTables in database:');
    tables.forEach((table) => {
      console.log(`- ${table.table_name}`);
    });

    // Close the connection
    await client.end();
    console.log('\nConnection closed.');
  } catch (error) {
    console.error('Error connecting to database:');
    console.error(error);
  }
}

main();
