import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sendActivationEmail } from "../util/email";
import { db } from "../util/db";
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { users, accountDetails } from "../model/schema";
import { generateAccountNumber } from '../util/generateAcct';


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
      message: 'User registered successfully. Please check your email to activate your account.'
    });


  } catch (error) {

        return res.status(500).json({ error: 'Internal server error during registration.' });
    }
}




//Activate user account
export const activateAccount = async (req: Request, res: Response): Promise<any> => {

    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }

    try {
        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'gfdhvbdfye3uwt352gwebstw2y282shddte3heydwbh3ydehnen');


        const checkUser = await db.select().from(users).where(eq(users.email, decoded.email));

        if (!checkUser[0]) {
            return res.status(404).json({ error: "Invalid activation link." });
        }

        const userId = checkUser[0].id;

        // Update the user's isactive status
        const response = await db.update(users)
            .set({ isactive: true })
            .where(eq(users.email, decoded.email));
        if (!response) {
            return res.status(404).json({ error: "unable to update " });
        }

        return res.status(200).json({ message: "Account activated successfully.", userId });

    } catch (error) {
        return res.status(400).json({ error: "Invalid or expired token." });
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


        if (!account_number) {
            return res.status(404).json({ error: "Unable to generate account number" });
        }

        //Insert account details into the database
        const response = await db.insert(accountDetails).values({
            account_number,
            account_type: account_Type,
            user_id: user_id
        }).returning();


        return res.status(201).json({

            account: response
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error while creating account details." });
    }

}


