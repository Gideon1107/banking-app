import { pgTable, text, date, boolean, timestamp, integer, varchar, bigint } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { sql } from 'drizzle-orm';

// Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  dob: date("dob").notNull(),
  nationality: text("nationality").notNull(),
  address: text("address").notNull(),
  isactive: boolean("isactive").notNull().default(false),
  created_at: timestamp("created_at").defaultNow(),
});


// Account Details Table
export const accountDetails = pgTable("accountDetails", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`), 
  account_number: integer("account_number").notNull().unique(), 
  account_type: varchar("account_type", { length: 50 }).notNull(), 
  user_id: text("user_id") 
    .notNull()
    .references(() => users.id), 
  created_at: timestamp("created_at").defaultNow(), 
});

// Add this to your existing schema
export const passwordResetCodes = pgTable("password_reset_codes", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: text("user_id")
      .notNull()
      .references(() => users.id),
  code: text("code").notNull(),
  new_password_hash: text("new_password_hash").notNull(),
  attempts: integer("attempts").notNull().default(0),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});




// Type Inference for Users
export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;


// Type Inference for Account Details
export type AccountDetail = InferModel<typeof accountDetails>;
export type NewAccountDetail = InferModel<typeof accountDetails, "insert">;

// Type inference for Password Reset Codes
export type PasswordResetCode = InferModel<typeof passwordResetCodes>;
export type NewPasswordResetCode = InferModel<typeof passwordResetCodes, "insert">;
