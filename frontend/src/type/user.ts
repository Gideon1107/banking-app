export interface Account {
  id: string;
  account_number: number;
  account_type: string;
  user_id: string | number;
  account_balance: string;
  created_at: string;
  debit_number: string;
  card_pin: string;
  cvv: number;
  card_issued_date: string;
  card_expiry_date: string;
}

export interface User {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;

  dob: string;
  nationality: string;
  address: string;
  isactive: boolean;
  created_at?: string;
  account: Account;
}