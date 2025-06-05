import { Request, Response } from 'express';
import { db } from "../util/db";
import { accountDetails, } from "../model/schema";
import { eq } from "drizzle-orm";
import { recordPayment } from "../util/recordPayment";
import { sendUpdateNotification } from "../util/email";
import { getDetailsByUserId, validateCardDetails } from "../util/helperFunction";



// Debit Card Deposit
const cardDeposit = async (req: Request, res: Response): Promise<any> => {
    const { debit_number, cvv,card_issued_date, card_expiry_date, card_pin, amount} = req.body;
     

    let transaction_type = "deposit";
    const upperCaseTransactionType = transaction_type.trim().toLowerCase(); 

    if (!debit_number || !cvv || !card_issued_date || !card_expiry_date || !card_pin || !amount) {
        return res.status(400).json({ error: "Debit card details and amount are required." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ error: "Invalid amount value." });
    }

    try {
        const account = await validateCardDetails(debit_number, cvv,card_issued_date, card_expiry_date, card_pin);
        if (!account) {
            return res.status(404).json({ error: "Invalid card details." });
        }

        const updatedBalance = Number(account.account_balance) + parsedAmount;

        // Update account balance
        await db.update(accountDetails)
            .set({ account_balance: updatedBalance.toFixed(2) })
            .where(eq(accountDetails.account_number, account.account_number));
        
        const reference = "Card Deposit"
        // Record the deposit
        await recordPayment(account.account_number, upperCaseTransactionType, amount, undefined, reference);
         
        const userInfo = await getDetailsByUserId(account.user_id);
        if (!userInfo) {
            return res.status(404).json({ error: "User not found." });
        }

        await  sendUpdateNotification({
            to: userInfo.email,
            subject: 'New Depsoit',
            html: `<p>Hello ${userInfo.firstname},</p><p> A card deposit of $${amount} has been deposited in your account.</p><p>Click to Sign-In.</p>`,
        });

        return res.status(200).json({ message: "Card Deposit successful.", new_balance: updatedBalance });
    } catch (error) {
        console.error("Error processing card deposit:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Debit Card Withdrawal
 const cardWithdraw = async (req: Request, res: Response): Promise<any> => {
    const { debit_number, cvv,card_issued_date, card_expiry_date, card_pin, amount} = req.body;
     
     
    let transaction_type = "withdrawal";
    const upperCaseTransactionType = transaction_type.trim().toLowerCase(); 
    if (!debit_number || !cvv || !card_issued_date || !card_expiry_date || !card_pin || !amount){
        return res.status(400).json({ error: "Debit card details and amount are required." });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ error: "Invalid amount value." });
    }

    try {
        const account = await validateCardDetails(debit_number, cvv,card_issued_date, card_expiry_date, card_pin);
        if (!account) {
            return res.status(404).json({ error: "Invalid card details." });
        }

        const currentBalance = Number(account.account_balance);
        if (parsedAmount > currentBalance) {
            return res.status(400).json({ error: "Insufficient funds." });
        }

        const updatedBalance = currentBalance - parsedAmount;

        // Update account balance
        await db.update(accountDetails)
            .set({ account_balance: updatedBalance.toFixed(2) })
            .where(eq(accountDetails.account_number, account.account_number));
         
        const reference = "Card Withdrawal"
        // Record the withdrawal
        await recordPayment(account.account_number, upperCaseTransactionType, amount, undefined, reference);

        const userInfo = await getDetailsByUserId(account.user_id);
        if (!userInfo) {
            return res.status(404).json({ error: "User not found." });
        }

        await  sendUpdateNotification({
            to: userInfo.email,
            subject: 'New Withdrawal',
            html: `<p>Hello ${userInfo.firstname},</p><p> A card withdrawl of $${amount} has been withdrawn in your account.</p><p>Click to Sign-In.</p>`,
        });

        return res.status(200).json({ message: "Withdrawal successful.", new_balance: updatedBalance });
    } catch (error) {
        console.error("Error processing card withdrawal:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// View Card Details
const viewCardDetails = async (req: Request, res: Response): Promise<any> => {
    const { account_number } = req.params;

    if (!account_number) {
        return res.status(400).json({ error: "Account number is required." });
    }

    try {
        const account = await db.select().from(accountDetails)
            .where(eq(accountDetails.account_number, Number(account_number)));

        if (!account[0]) {
            return res.status(404).json({ error: "Account not found." });
        }

        // Return card details
        return res.status(200).json({
            debit_number: account[0].debit_number,
            cvv: account[0].cvv,
            card_issued_date: account[0].card_issued_date,
            card_expiry_date: account[0].card_expiry_date,
        });
    } catch (error) {
        console.error("Error retrieving card details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Change PIN
const changePin = async (req: Request, res: Response): Promise<any> => {
    const { account_number, old_pin, new_pin } = req.body;

    if (!account_number || !old_pin || !new_pin) {
        return res.status(400).json({ error: "Account number, old PIN, and new PIN are required." });
    }

    if (new_pin.length !== 4 || isNaN(Number(new_pin))) {
        return res.status(400).json({ error: "New PIN must be a 4-digit number." });
    }

    try {
        const account = await db.select().from(accountDetails)
            .where(eq(accountDetails.account_number, account_number));

        if (!account[0]) {
            return res.status(404).json({ error: "Account not found." });
        }

        if (account[0].card_pin !== old_pin) {
            return res.status(400).json({ error: "Old PIN is incorrect." });
        }

        // Update PIN
        await db.update(accountDetails)
            .set({ card_pin: new_pin })
            .where(eq(accountDetails.account_number, account_number));
        
            const userInfo = await getDetailsByUserId(account[0].user_id);
            if (!userInfo) {
                return res.status(404).json({ error: "User not found." });
            }
        
            await  sendUpdateNotification({
                to: userInfo.email,
                subject: 'Pin Changed',
                html: `<p>Hello ${userInfo.firstname},</p><p> Your Pin has been changed successfully.</p><p>Click to Sign-In.</p>`,
            });

        return res.status(200).json({ message: "PIN changed successfully." });
    } catch (error) {
        console.error("Error changing PIN:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export { cardDeposit, cardWithdraw, viewCardDetails, changePin };