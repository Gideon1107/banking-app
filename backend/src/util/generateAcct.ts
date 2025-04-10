import { db } from './db'; 
import { eq } from 'drizzle-orm';
import { accountDetails } from './schema'; 

export const generateAccountNumber = async () => {
    const min = 1000000000; 
    const max = 9999999999; 
    let accountNumber;
    let existingAccount;

    do {
        // Generate a random account number
        accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        // check if the account number exist
        existingAccount = await db.select().from(accountDetails).where(eq(accountDetails.account_number, accountNumber));
        
    } while (existingAccount.length > 0); 
 
    return accountNumber;
};