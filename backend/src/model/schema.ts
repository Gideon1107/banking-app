import { pgTable, text, date, boolean, timestamp, integer, varchar, decimal } from "drizzle-orm/pg-core";
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
  account_balance: decimal("account_balance", { precision: 12, scale: 2 }).default("0.00"),
  created_at: timestamp("created_at").defaultNow(),
  debit_number: varchar("debit_number", { length: 22 }).unique(), 
  card_pin: varchar("card_pin", { length: 4 }).notNull(), // Added card PIN
  cvv: integer("cvv").notNull(), // Added CVV
  card_issued_date: date("card_issued_date").defaultNow(), // Added card issued date
  card_expiry_date: date("card_expiry_date")
    .notNull()
    .default(sql`(CURRENT_DATE + INTERVAL '5 years')`), // Card expiry date 5 years from issued date
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

export const transactions = pgTable("transactions", {
  transaction_id: integer("transaction_id")
    .primaryKey()
    .default(sql`nextval('transactions_transaction_id_seq')`),
  account_number: integer("account_number")
    .notNull()
    .references(() => accountDetails.account_number),
  transaction_type: text("transaction_type")
    .notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  recipient_account: integer("recipient_account") // Fixed column name
    .notNull(),
  reference: varchar("reference", { length: 255 }),
  transaction_date: date("transaction_date").defaultNow(),
});

export const beneficiaries = pgTable("beneficiaries", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`), 
  user_id: text("user_id").notNull(), // Foreign key to reference users
  account_number: integer("account_number")
    .notNull()
    .references(() => accountDetails.account_number),
  beneficiary_account: integer("beneficiary_account").notNull(), // Account number of the beneficiary
  beneficiary_name: text("beneficiary_name").notNull(), // Name of the beneficiary
  created_at: timestamp("created_at").defaultNow() // Timestamp for when the beneficiary was added
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

export type transaction = InferModel<typeof transactions>; // Fixed type inference
export type NewBankTransaction = InferModel<typeof transactions, "insert">;


// Type inference for Beneficiaries
export type Beneficiary = InferModel<typeof beneficiaries>; // For querying beneficiaries
export type NewBeneficiary = InferModel<typeof beneficiaries, "insert">; // For inserting new beneficiaries