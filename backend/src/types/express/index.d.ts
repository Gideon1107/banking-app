import { User } from '../../model/schema';

declare global {
  namespace Express {
    interface User extends User {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      // Add any other properties if needed
      account?: {
        id: string;
        account_number: number;
        account_type: string;
      };
    }
  }
}
