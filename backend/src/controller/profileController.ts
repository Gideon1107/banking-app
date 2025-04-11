import { Request, Response } from 'express';
import { db } from "../util/db";
import { eq, and, gt, lt } from 'drizzle-orm';
import { users, passwordResetCodes } from "../model/schema";
import bcrypt from 'bcrypt';
import { sendUpdateNotification } from '../util/email';


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




// Update user address
export const updateUserAddress = async (req: Request, res: Response): Promise<any> => {
    // Use type assertion to access the id property
    const user = req.user as any;
    const userId = user ? user.id : undefined;
    const { address } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const result = await db.update(users)
            .set({ address: address })
            .where(eq(users.id, userId))
            .returning();

        if (result.length > 0) {
            sendUpdateNotification({
                to: result[0].email,
                subject: 'Address Updated',
                html: `<p>Hello ${result[0].firstname},</p><p> Your address has been updated successfully.</p><p>If you did not make this change, please contact support immediately.</p>`,
            });
        }

        if (!result[0]) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Address updated successfully', user: result[0] });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while updating address' });
    }
};


// Update user email
export const updateUserEmail = async (req: Request, res: Response): Promise<any> => {

    const { email } = req.body;
    const user = req.user as any;
    const userId = user ? user.id : undefined;
    const oldEmail = user.email;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const result = await db.update(users)
            .set({ email: email })
            .where(eq(users.id, userId))
            .returning();

        if (result.length > 0) {
            // Send notificcation to old email
            sendUpdateNotification({
                to: oldEmail,
                subject: 'Email Address Changed',
                html: `<p>Hello ${result[0].firstname},</p><p> Your email address has been changed to ${result[0].email}.</p><p>If you did not make this change, please contact support immediately.</p>`,
            });

            // Send confirmation to new email
            sendUpdateNotification({
                to: result[0].email,
                subject: 'Email Address Confirmation',
                html: `<p>Hello ${result[0].firstname},</p><p> This email confirms that your email address has been successfully updated.</p><p>If you did not make this change, please contact support immediately.</p>`,
            });
        }

        if (!result[0]) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Email updated successfully', user: result[0] });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while updating email' });
    }
}



// This function initiates the password update process
export const initiatePasswordChange = async (req: Request, res: Response): Promise<any> => {
    const { currentPassword, newPassword } = req.body;
    const user = req.user as any;
    const userId = user ? user.id : undefined;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    if (currentPassword === newPassword) {
        return res.status(400).json({ error: 'New password must be different from the current password' });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ error: 'New password must be at least 8 characters long' });
    }

    try {

        // Check for existing valid verification codes
        const existingCode = await db.select()
            .from(passwordResetCodes)
            .where(
                and(
                    eq(passwordResetCodes.user_id, userId),
                    gt(passwordResetCodes.expires_at, new Date()),
                    lt(passwordResetCodes.attempts, 3)
                )
            );

        if (existingCode.length > 0) {
            return res.status(400).json({
                error: 'A password reset is already in progress. Please check your email or wait for the current request to expire.'
            });
        }

        // Verify current password
        const userRecord = await db.select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!userRecord[0]) {
            return res.status(404).json({ error: 'User not found' });
        }

        const matchPassword = await bcrypt.compare(currentPassword, userRecord[0].password);

        if (!matchPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Generating verification code (6 digits)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Storing verification data in database
        await db.insert(passwordResetCodes).values({
            user_id: userId,
            code: verificationCode,
            new_password_hash: await bcrypt.hash(newPassword, 10),
            attempts: 0,
            expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        });


        // Send notification email
        sendUpdateNotification({
            to: userRecord[0].email,
            subject: 'Password Reset Verification Code',
            html: `<p>Hello ${userRecord[0].firstname},</p><p> Your verification code is: ${verificationCode}. This code expires in 10 minutes.</p><p>If you did not make this change, please contact support immediately.</p>`,
        });

        return res.status(200).json({ message: 'Verification code sent to your email. Code expires in 10 minutes.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error while updating password' });
    }
};



// This function completes the password update process
export const completePasswordUpdate = async (req: Request, res: Response): Promise<any> => {
    const user = req.user as any;
    const userId = user?.id;
    const { verificationCode } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // clean up any expired verification codes for this user
        await db.delete(passwordResetCodes)
            .where(
                and(
                    eq(passwordResetCodes.user_id, userId),
                    lt(passwordResetCodes.expires_at, new Date())
                )
            );

        // check for valid verification code
        const [verificationData] = await db.select()
            .from(passwordResetCodes)
            .where(
                and(
                    eq(passwordResetCodes.user_id, userId),
                    eq(passwordResetCodes.code, verificationCode),
                    gt(passwordResetCodes.expires_at, new Date())
                )
            );

        if (!verificationData) {
            return res.status(400).json({ error: 'Invalid or expired verification code' });
        }

        if (verificationData.attempts >= 3) {
            // Delete verification data if too many attempts
            await db.delete(passwordResetCodes)
                .where(eq(passwordResetCodes.id, verificationData.id));

            return res.status(429).json({
                error: 'Too many verification attempts. Please start over.'
            });
        }

        // Update reset attempts count
        if (verificationData.code !== verificationCode) {
            await db.update(passwordResetCodes)
                .set({ attempts: verificationData.attempts + 1 })
                .where(eq(passwordResetCodes.id, verificationData.id));

            return res.status(400).json({ error: 'Invalid verification code' });
        }

        // Update password
        const response = await db.update(users)
            .set({ password: verificationData.new_password_hash })
            .where(eq(users.id, userId))
            .returning();

        // Delete used verification data
        await db.delete(passwordResetCodes)
            .where(eq(passwordResetCodes.id, verificationData.id));


        // Send notification email
        await sendUpdateNotification({
            to: response[0].email,
            subject: 'Password Changed Successfully',
            html: `
                <p>Hello ${response[0].firstname},</p>
                <p>Your password has been successfully changed.</p>
                <p>If you did not make this change, please contact support immediately.</p>
                <p>Time of change: ${new Date().toLocaleString()}</p>
            `
        });

        return res.status(200).json({ message: 'Password updated successfully', user: response[0] });

    } catch (error) {
        console.error('Error completing password update:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
