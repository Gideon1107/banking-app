import { db } from "../util/db";
import { users, accountDetails} from "../model/schema";
import { eq, and} from 'drizzle-orm';

// function to get account details by account number
const getAccountByNumber = async (account_number: number) => {
    const account = await db.select().from(accountDetails).where(eq(accountDetails.account_number, account_number));
    return account.length > 0 ? account[0] : null;
  };
  
  // function to get userinfo by userid
const getDetailsByUserId = async (user_id: string) => {
    const details = await db.select().from(users).where(eq(users.id, user_id));
    return details.length > 0 ? details[0] : null;
  };
  
  
  
  // function to update account balance
const updateAccountBalance = async (account_number: number, newBalance: number) => {
    const updatedAccount = await db.update(accountDetails)
      .set({ account_balance: newBalance.toFixed(2) })
      .where(eq(accountDetails.account_number, account_number))
      .returning();
    return updatedAccount;
  };

const validateCardDetails = async (debit_number: string, cvv: number, card_issued_date:string, card_expiry_date:string, card_pin: string) => {
    const account = await db
        .select()
        .from(accountDetails)
        .where(
            and(
                eq(accountDetails.debit_number, debit_number),
                eq(accountDetails.cvv, cvv),
                eq(accountDetails.card_issued_date, card_issued_date),
                eq(accountDetails.card_expiry_date, card_expiry_date),
                eq(accountDetails.card_pin, card_pin)
            )
        );

    return account.length > 0 ? account[0] : null;
};

export { getAccountByNumber, getDetailsByUserId, updateAccountBalance , validateCardDetails};