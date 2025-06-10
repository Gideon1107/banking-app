import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {cardWithdraw, viewCardDetails, changePin, cardDeposit } from '../controller/cardController';
const router = express.Router();

router.use(isAuthenticated);

// Card Deposit
router.post("/deposit", cardDeposit);


// Card Withdraw
router.post("/withdraw", cardWithdraw);


//View Card Details
router.get("/:account_number", viewCardDetails);

//Change Card Pin
router.post("/change-pin", changePin);

export default router;