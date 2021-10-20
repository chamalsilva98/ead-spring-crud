export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  joinedOn?: Date;
  privilege: string;
  status: string;
}

export interface Account {
  id?: number;
  accountName: string;
  interestRate: number;
}

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  dob: Date;
  nic: string;
  phoneNumber: string;
  address: string;
}

export interface CustomerAccount {
  accountNumber?: number;
  customerId: number;
  accountId: number;
  balance: number;
}
