import axios from 'axios';

const BASE_URL = 'https://fe-task-api.mainstack.io';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  // Add more user fields as needed
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
  currency: string;
  // Add more wallet fields as needed
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  date: string;
  status: string;
  payment_reference?: string;
  metadata?: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name?: string;
  };
}

export const getUser = async (): Promise<User> => {
  const response = await api.get('/user');
  return response.data;
};

export const getWallet = async (): Promise<Wallet> => {
  const response = await api.get('/wallet');
  return response.data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data;
};