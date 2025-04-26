import { Request, Response } from 'express';
import { db } from "../util/db";
import { accountDetails } from "../model/schema";
import { eq } from 'drizzle-orm';
import { recordPayment } from '../util/recordPayment';

const depositPayment = async (req: Request, res: Response):Promise<any> => {
  const { amount, account_number, reference } = req.body;

  // Check if required fields are provided
  if (!amount || !account_number) {
    return res.status(400).json({ error: "Amount and account number are required." });
  }

  // Parse the amount to ensure it's a valid number
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return res.status(400).json({ error: "Invalid amount value." });
  }

  try {
    // Check if the account number exists
    const existingAccount = await db.select().from(accountDetails).where(eq(accountDetails.account_number, account_number));
    
    if (!existingAccount || existingAccount.length === 0) {
      return res.status(404).json({ error: "Account not found." });
    }

    // Explicitly check and handle null/undefined
    const accountBalance = existingAccount[0]?.account_balance;
    if (accountBalance === undefined || accountBalance === null) {
      return res.status(500).json({ error: "Account balance is missing." });
    }

    // Now TypeScript should know accountBalance is not null
    const updatedAccount = await db.update(accountDetails)
      .set({ account_balance: String(Number(accountBalance) + parsedAmount) }) 
      .where(eq(accountDetails.account_number, account_number))
      .returning();

    // Record the payment
    const recordResult = await recordPayment(account_number, "Deposit", amount, undefined, reference);
    if (!recordResult) {
      return res.status(500).json({ error: "Failed to record payment." });
    }


    return res.status(200).json({
      message: "Deposit successful",
      account: updatedAccount,
      recordedPayment: recordResult
    });
  } catch (error) {
    console.error("Error processing deposit:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const withdrawPayment = async(req: Request, res: Response):Promise<any> =>{
     const {account_number, amount} = req.body
     
     if( !account_number || !amount){
       return 'fields requied'
     }
     

     try {
               const existingAccount = await 


           }
    
    }

export { depositPayment };
