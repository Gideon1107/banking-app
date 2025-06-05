import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sendActivationEmail } from "../util/email";
import { db } from "../util/db";
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { users, accountDetails } from "../model/schema";
import { generateAccountNumber,generateCvv, generateDebitCardNumber } from '../util/generate';


// Register new user
export const register = async (req: Request, res: Response): Promise<any> => {
 
    //Generate JWT secret
    const JWT_SECRET = process.env.JWT_SECRET || 'gfdhvbdfye3uwt352gwebstw2y282shddte3heydwbh3ydehnen';

    const { firstName,
        lastName, email,
        password,
        dob,
        nationality,
        address } = req.body;


    if (!firstName || !lastName || !email || !password || !dob || !nationality || !address) {
        return res.status(400).json({ error: 'All fields are required.' });
    }


    try {

        // Check if the user already exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });


    // Create activation link
    const activationLink = `${process.env.REACT_APP || 'http://localhost:4000'}/register/activate/${token}`;

    // Send activation email
    try {
      await sendActivationEmail(email, activationLink);
    } catch (emailError) {
    return res.status(400).json({emailError: "Error sending email:"});

    }

    // Insert new user into the database
    const newUser = await db.insert(users).values({
        firstname: firstName,
        lastname: lastName,
        email,
        password: hashedPassword,
        dob,
        nationality,
        address,
        isactive: false
      }).returning();




    return res.status(201).json({
        newUser: newUser,
      message: 'User registered successfully. Please check your email to activate your account.'
    });


  } catch (error) {
    console.error("Registration error details:", error); 
        return res.status(500).json({ error: 'Internal server error during registration.' });
    }
}


//Activate user account
export const activateAccount = async (req: Request, res: Response): Promise<any> => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).send(`
            <h3 style="color: red; text-align: center;">Token is missing</h3>
        `);
    }

    try {
        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret');

        const checkUser = await db.select().from(users).where(eq(users.email, decoded.email));

        if (!checkUser[0]) {
            return res.status(404).send(`
                <h3 style="color: red; text-align: center;">Invalid activation link.</h3>
            `);
        }

        const userId = checkUser[0].id;

        await db.update(users)
            .set({ isactive: true })
            .where(eq(users.email, decoded.email));

        // Success HTML popup with redirect
        return res.status(200).send(`
            <html>
              <head>
                <title>Account Activated</title>
                <meta http-equiv="refresh" content="4; URL=/account-type?userId=${userId}" />
                <style>
                  body {
                    font-family: 'Segoe UI', sans-serif;
                    background: #f9fafb;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                  }
                  .popup {
                    padding: 30px 40px;
                    border-radius: 12px;
                    background: white;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    text-align: center;
                  }
                  .popup h2 {
                    color: #10b981;
                    margin-bottom: 10px;
                  }
                  .popup p {
                    color: #374151;
                  }
                </style>
              </head>
              <body>
                <div class="popup">
                  <h2>🎉 Account Verified!</h2>
                  <p>Redirecting you to set up your account type...</p>
                </div>
              </body>
            </html>
        `);

    } catch (error) {
        return res.status(400).send(`
            <h3 style="color: red; text-align: center;">Invalid or expired token</h3>
        `);
    }
};



// Create account information
export const createAccountInfo = async (req: Request, res: Response): Promise<any> => {
    const { account_type, user_id } = req.body;
  
    if (!account_type && !user_id) {
        return res.status(400).json({ error: "Account type and user ID are required." });
    }


    const account_Type = account_type.toUpperCase();

    try {

        // Check if the user exists
        const existingUser = await db.select().from(users).where(eq(users.id, user_id));


        if (!existingUser[0]) {
                return res.status(404).json({ error: "User not found." });
            }

        // Check if the account type already exists for the user
        const userAccounts = await db.select().from(accountDetails).where(eq(accountDetails.user_id, user_id));
        const existingAccountType = userAccounts.some((acct) => acct.account_type === account_Type);

        if (existingAccountType) {
            return res.status(409).json({ error: 'Account type already exists.' });
        }
        //Generate a unique account number
        const account_number = await generateAccountNumber();
        const debitCard_number = await generateDebitCardNumber();


        if (!account_number) {
            return res.status(404).json({ error: "Unable to generate account number" });
        }

        if(!debitCard_number){
            return res.status(404).json({ error: "Unable to generate debit card number" });
        }

        const cvv = await generateCvv();
        if (!cvv) {
            return res.status(404).json({ error: "Unable to generate CVV" });
        }
        //Insert account details into the database
        const response = await db.insert(accountDetails).values({
            account_number,
            account_type: account_Type,
            user_id: user_id,
            debit_number: debitCard_number,
            cvv: cvv,
            card_pin: '1234', // Default PIN, should be changed by the user      
        }).returning();


        return res.status(201).json({

            account: response
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error while creating account details." });
    }

}


