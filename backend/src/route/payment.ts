import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {depositPayment} from '../controller/paymentController';
const router = express.Router();

router.use(isAuthenticated);




router.post("/deposit", depositPayment);




export default router;