import express from 'express';
import { getUserProfile, updateUserProfile, updateUserEmail, updateUserPassword } from '../controller/profileController';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

// All profile routes require authentication
router.use(isAuthenticated);

// Get user profile
router.get('/', isAuthenticated, getUserProfile);

// Update user profile details (name, address, nationality)
router.put('/update', updateUserProfile);

// Update user email (requires password verification)
router.put('/update-email', updateUserEmail);

// Update user password (requires current password verification)
router.put('/update-password', updateUserPassword);

export default router;
