import { Request, Response } from 'express';
import { db } from "../util/db";
import { beneficiaries } from "../model/schema";
import { eq,and} from 'drizzle-orm';
import { getAccountByNumber } from '../util/helperFunction';



// Save Beneficiary
const saveBeneficiary = async (req: Request, res: Response): Promise<any> => {
    const { account_number, beneficiary_account, beneficiary_name } = req.body;

    if (!account_number || !beneficiary_account || !beneficiary_name) {
        return res.status(400).json({ error: "account_number, beneficiary account, and beneficiary name are required." });
    }

    try {
      const existingBeneficiary = await db.select()
      .from(beneficiaries)
      .where(
          and(
            eq(beneficiaries.account_number, account_number),
            eq(beneficiaries.beneficiary_account, beneficiary_account)
          )
          
      );

        if (existingBeneficiary.length > 0) {
            return res.status(409).json({ error: "Beneficiary already exists." });
        }
        const existingAccount = await getAccountByNumber(account_number);
        if (!existingAccount) {
          return res.status(404).json({ error: "Account not found." });
        }

        // Save beneficiary
        await db.insert(beneficiaries).values({
            user_id: existingAccount.user_id,
            account_number,
            beneficiary_account,
            beneficiary_name,
        });

        return res.status(201).json({ message: "Beneficiary saved successfully." });
    } catch (error) {
        console.error("Error saving beneficiary:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// View Beneficiary
const viewBeneficiary = async (req: Request, res: Response): Promise<any> => {
  const { account_number } = req.params;

  if (!account_number) {
    return res.status(400).json({ error: "Account number is required." });
  }

  try {
    const existingAccount = await getAccountByNumber(Number(account_number));

    if (!existingAccount) {
      return res.status(404).json({ error: "Account number not found." });
    }

    // Retrieve beneficiary
    const retrievedBeneficiary = await db
      .select()
      .from(beneficiaries)
      .where(eq(beneficiaries.account_number, Number(account_number)));

    if (!retrievedBeneficiary[0]) {
      return res.status(404).json({ error: "No beneficiary found." });
    }

    return res.status(200).json({
      message: "Beneficiary retrieved successfully.",
      beneficiary: retrievedBeneficiary[0],
    });
  } catch (error) {
    console.error("Error retrieving beneficiary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export { saveBeneficiary, viewBeneficiary };