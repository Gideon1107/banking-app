import express from 'express';
import { register , activateAccount, createAccountInfo} from '../controller/registerController';

const router = express.Router();


router.post("/", register);

router.get("/activate/:token", activateAccount);

router.post("/createAccountInfo", createAccountInfo);

export default router;
