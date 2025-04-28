import { db } from "./db";
import { transactions } from "../model/schema";

export const recordPayment = (
    account_number: number, 
    transaction_type: string, 
    amount: string, 
    recipient_account: number = account_number, 
    reference: string
  ) => {
    if (!account_number || !transaction_type || !amount) {
      throw new Error("Account number, transaction type, and amount are required.");
    }
    
    // Validate the amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      throw new Error("Invalid amount value.");
    }
    
    // Format date as YYYY-MM-DD 
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    try {
      if (transaction_type === "deposit") {
        return db.insert(transactions).values({
          account_number,
          transaction_type: "Deposit",
          amount,
          recipient_account,
          reference,
    
        }).returning();
      }
      else if (transaction_type === "withdrawal") {
        return db.insert(transactions).values({
          account_number,
          transaction_type: "Withdrawal",
          amount,
          recipient_account,
          reference,
          transaction_date: formattedDate
        }).returning();
      }
      else if (transaction_type === "transfer") {
        return db.insert(transactions).values({
          account_number,
          transaction_type: "Transfer",
          amount,
          recipient_account,
          reference,
          transaction_date: formattedDate
        }).returning();
      }
      else if (transaction_type === "bill payment") {
        return db.insert(transactions).values({
          account_number,
          transaction_type: "Bill Payment",
          amount,
          recipient_account,
          reference,
          transaction_date: formattedDate
        }).returning();
      } else {
        throw new Error("Invalid transaction type.");
      }
    } catch (error) {
      console.error("Error recording payment:", error);
      throw new Error("Failed to record payment.");
    }
  };
