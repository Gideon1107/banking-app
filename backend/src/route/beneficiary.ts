import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {saveBeneficiary, viewBeneficiary} from '../controller/beneficiaryController';
const router = express.Router();

router.use(isAuthenticated);

//Save Beneficiary
router.post("/", saveBeneficiary);

// View Beneficiary
router.get("/:account_number", viewBeneficiary);

export default router;