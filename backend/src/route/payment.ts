import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {depositPayment,  withdrawPayment, transferPayment, getTransactionHistory, payBills} from '../controller/paymentController';
const router = express.Router();

router.use(isAuthenticated);



//Deposit to account
router.post("/deposit", depositPayment);


//Withdraw Account
router.post("/withdraw", withdrawPayment);

//Transfer Money
router.post("/transfer", transferPayment);

//Get Transaction History
router.get("/:account_number", getTransactionHistory);

//Pay Bills
router.post("/bills", payBills);





export default router;