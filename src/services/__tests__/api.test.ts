// api.test.ts
import axios from 'axios';
import { User, Wallet, Transaction, getUser, getWallet, getTransactions } from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create a mock axios instance
const mockApi = {
  get: jest.fn(),
  // Add other methods if needed
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  }
};

(axios as jest.Mocked<typeof axios>).create = jest.fn().mockReturnValue(mockApi);

const mockUser: User = {
  id: 'user-123',
  first_name: "Olivier",
  last_name: "Jones",
  email: 'olivierjones@gmail.com',
};

const mockWallet: Wallet = {
  balance: 5000.00,
  total_payout: 2000.00,
  total_revenue: 7000.00,
  pending_payout: 500.00,
  ledger_balance: 4500.00,
  currency: 'USD'
};

const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    amount: 100.00,
    type: 'deposit',
    date: '2024-02-20T10:00:00Z',
    status: 'completed',
    metadata: {
      name: 'Test User',
      type: 'product',
      email: 'test@example.com',
      quantity: 1,
      country: 'US',
      product_name: 'Test Product'
    }
  }
];

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should fetch user data successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

      const result = await getUser();

      expect(result).toEqual(mockUser);
      expect(mockedAxios.get).toHaveBeenCalledWith('/user');
    });

    it('should handle errors when fetching user data', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getUser()).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith('/user');
    });
  });

  describe('getWallet', () => {
    it('should fetch wallet data successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockWallet });

      const result = await getWallet();

      expect(result).toEqual(mockWallet);
      expect(mockedAxios.get).toHaveBeenCalledWith('/wallet');
    });

    it('should handle errors when fetching wallet data', async () => {
      const errorMessage = 'Server Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getWallet()).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith('/wallet');
    });
  });

  describe('getTransactions', () => {
    it('should fetch transactions successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockTransactions });

      const result = await getTransactions();

      expect(result).toEqual(mockTransactions);
      expect(mockedAxios.get).toHaveBeenCalledWith('/transactions');
    });

    it('should handle errors when fetching transactions', async () => {
      const errorMessage = 'Timeout Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getTransactions()).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith('/transactions');
    });

    it('should handle transactions with optional fields', async () => {
      const minimalTransaction: Transaction = {
        id: 'txn-002',
        amount: 50.00,
        type: 'withdrawal',
        date: '2024-02-21T10:00:00Z',
        status: 'pending'
      };
      
      mockedAxios.get.mockResolvedValueOnce({ data: [minimalTransaction] });

      const result = await getTransactions();
      
      expect(result).toEqual([minimalTransaction]);
      expect(result[0].payment_reference).toBeUndefined();
      expect(result[0].metadata).toBeUndefined();
    });
  });
});