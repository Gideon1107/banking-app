import { Request, Response } from 'express';
import { db } from "../util/db";
import { eq } from 'drizzle-orm';
import { users } from "../model/schema";
import bcrypt from 'bcrypt';


// Get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<any> => {
    try {

        // Use type assertion to access the id property
        const user = req.user as any;
        const userId = user ? user.id : undefined;

        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Fetch user details from database
        const userDetails = await db.select({
            id: users.id,
            firstname: users.firstname,
            lastname: users.lastname,
            email: users.email,
            dob: users.dob,
            nationality: users.nationality,
            address: users.address
        })
        .from(users)
        .where(eq(users.id, userId));

        if (!userDetails[0]) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user: userDetails[0] });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal server error while fetching profile' });
    }
};




// Update user profile
export const updateUserProfile = async (req: Request, res: Response): Promise<any> => {
    
};

// Update user email
export const updateUserEmail = async (req: Request, res: Response): Promise<any> => {
    
};


// Update user password, requires current password
export const updateUserPassword = async (req: Request, res: Response): Promise<any> => {
    
};
