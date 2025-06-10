import { db } from './db';
import { eq } from 'drizzle-orm';
import { accountDetails } from '../model/schema';

export const generateAccountNumber = async () => {
    const min = 100000000;
    const max = 999999999;
    let accountNumber;
    let existingAccount;

    do {
        // Generate a random number
        accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        // check if the account number exist
        existingAccount = await db.select().from(accountDetails).where(eq(accountDetails.account_number, accountNumber));

    } while (existingAccount.length > 0);

    return accountNumber;
};


export const generateDebitCardNumber = async (): Promise<string> => {
    const maxRetries = 10; // number of retries to avoid infinite recursion
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        
        // Generate a random 16-digit number
        const cardNumber = Math.floor(Math.random() * 10000000000000000)
            .toString()
            .padStart(16, '0');

        // Check if the card number already exists in the database
        const existingCardNumber = await db
            .select()
            .from(accountDetails)
            .where(eq(accountDetails.debit_number, cardNumber));

        if (existingCardNumber.length === 0) {
            // Format the card number as XXXX-XXXX-XXXX-XXXX
            const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
            return formattedCardNumber;
        }
    }
    
    throw new Error('Failed to generate a unique debit card number after maximum retries.');
};


export const generateCvv = async () => {
    const min = 100;
    const max = 999;
    let cvv;
    let existingCvv;

    do {
        // Generate a random number
        cvv = Math.floor(Math.random() * (max - min + 1)) + min;

        // check if the account number exist
        existingCvv = await db.select().from(accountDetails).where(eq(accountDetails.cvv, cvv));

    } while (existingCvv.length > 0);

    return cvv;
}

