import { Request, Response } from 'express';
import { db } from "../util/db";
import { accountDetails, transactions } from "../model/schema";
import { eq, desc } from 'drizzle-orm';
import { recordPayment } from '../util/recordPayment';

// Helper function to get account by account number
const getAccountByNumber = async (account_number: number) => {
  const account = await db.select().from(accountDetails).where(eq(accountDetails.account_number, account_number));
  return account.length > 0 ? account[0] : null;
};

// Helper function to update account balance
const updateAccountBalance = async (account_number: number, newBalance: number) => {
  const updatedAccount = await db.update(accountDetails)
    .set({ account_balance: newBalance.toFixed(2) })
    .where(eq(accountDetails.account_number, account_number))
    .returning();
  return updatedAccount;
};

const depositPayment = async (req: Request, res: Response): Promise<any> => {
  const { account_number, account_type, amount, reference } = req.body;

  // Check if required fields are provided
  if (!amount || !account_number) {
    return res.status(400).json({ error: "Amount and account number are required." });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount value." });
  }

  try {
    const existingAccount = await getAccountByNumber(account_number);
    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found." });
    }

    const updatedAccount = await updateAccountBalance(account_number, Number(existingAccount.account_balance) + parsedAmount);

    const recordResult = await recordPayment(account_number, account_type.toUpperCase(), amount, undefined, reference);
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

const withdrawPayment = async (req: Request, res: Response): Promise<any> => {
  const { account_number, account_type, amount } = req.body;

  if (!account_number || !amount || !account_type) {
    return res.status(400).json({ error: "Account number, amount, and account type are required." });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount value." });
  }

  try {
    const existingAccount = await getAccountByNumber(account_number);
    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found." });
    }

    const accountBalance = Number(existingAccount.account_balance);
    if (parsedAmount > accountBalance) {
      return res.status(400).json({ error: "Insufficient funds." });
    }

    const updatedAccount = await updateAccountBalance(account_number, accountBalance - parsedAmount);

    const reference = 'Cash Withdraw';
    const recordResult = await recordPayment(account_number, account_type.toUpperCase(), amount, undefined, reference);
    if (!recordResult) {
      return res.status(500).json({ error: "Failed to record payment." });
    }

    return res.status(200).json({
      message: "Withdrawal successful",
      account: updatedAccount,
      recordedPayment: recordResult
    });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const transferPayment = async (req: Request, res: Response): Promise<any> => {
  const { account_number, account_type, amount, recipent_account, reference } = req.body;

  if (!account_number || !amount || !recipent_account) {
    return res.status(400).json({ error: "Account number, amount, and recipient account are required." });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount value." });
  }

  try {
    const senderAccount = await getAccountByNumber(account_number);
    const recipientAccount = await getAccountByNumber(recipent_account);

    if (!senderAccount) {
      return res.status(404).json({ error: "Sender account not found." });
    }

    if (!recipientAccount) {
      return res.status(404).json({ error: "Receiver account not found." });
    }

    const senderBalance = Number(senderAccount.account_balance);
    if (parsedAmount > senderBalance) {
      return res.status(400).json({ error: "Insufficient funds in sender's account." });
    }

    // Update both sender and recipient balances
    const updatedSenderAccount = await updateAccountBalance(account_number, senderBalance - parsedAmount);
    const updatedRecipientAccount = await updateAccountBalance(recipent_account, Number(recipientAccount.account_balance) + parsedAmount);

    // Record the transactions
    const recordSenderResult = await recordPayment(account_number, account_type.toUpperCase(), amount, recipent_account, reference);
    const recordRecipientResult = await recordPayment(recipent_account, "DEPOSIT", amount, account_number, "Deposit Transfer");

    if (!recordSenderResult || !recordRecipientResult) {
      return res.status(500).json({ error: "Failed to record transaction." });
    }

    return res.status(200).json({
      message: "Transfer successful",
      senderAccount: updatedSenderAccount,
      recipientAccount: updatedRecipientAccount
    });
  } catch (error) {
    console.error("Error processing transfer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTransactionHistory = async (req: Request, res: Response): Promise<any> => {
  const { account_number } = req.params; 

  // Validate that account number is provided
  if (!account_number) {
    return res.status(400).json({ error: "Account number is required." });
  }
    const convertedAccountNumber= Number(account_number)

    if (isNaN(convertedAccountNumber)) {
      return res.status(400).json({ error: "Invalid account number format." });
    }
  try {
   
    const transactionHistory = await db
      .select()
      .from(transactions)
      .where(eq(transactions.account_number,  convertedAccountNumber)) 
      .orderBy(desc(transactions.transaction_date));

    // If no transactions are found, return a 404
    if (!transactionHistory || transactionHistory.length === 0) {
      return res.status(404).json({ message: "No transactions found for this account." });
    }

    // Return the transaction history
    return res.status(200).json({
      message: "Transaction history retrieved successfully.",
      transactions: transactionHistory
    });
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




export { depositPayment, withdrawPayment, transferPayment, getTransactionHistory };
