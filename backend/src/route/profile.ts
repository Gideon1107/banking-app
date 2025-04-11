import express from 'express';
import { getUserProfile, updateUserAddress, updateUserEmail, initiatePasswordChange, completePasswordUpdate } from '../controller/profileController';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.use(isAuthenticated); // Apply the middleware to all routes

// Get user profile
router.get('/', getUserProfile);

// Update user address
router.put('/update-address', updateUserAddress);

// Update user email
router.put('/update-email', updateUserEmail);

// Initiate password update
router.post('/change-password/initiate', initiatePasswordChange);

// Complete password update
router.post('/change-password/complete', completePasswordUpdate);

export default router;
