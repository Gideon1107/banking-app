import express from 'express';
import {login, logout, getSession} from '../controller/authController';



const router = express.Router();

router.post("/", login);

router.post("/logout", logout);

router.get('/session', getSession);

export default router;