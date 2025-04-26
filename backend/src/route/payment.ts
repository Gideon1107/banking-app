import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {depositPayment,  withdrawPayment, transferPayment, getTransactionHistory} from '../controller/paymentController';
const router = express.Router();

router.use(isAuthenticated);




router.post("/deposit", depositPayment);

router.post("/withdraw", withdrawPayment);

router.post("/transfer", transferPayment);

router.get("/:account_number", getTransactionHistory);


export default router;