import { getUser, getWallet, getTransactions } from '../api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {

  it('fetches user data successfully', async () => {
    const mockUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const result = await getUser();
    expect(result).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles API error correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(getUser()).rejects.toThrow('Failed to fetch user data');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles network error correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(getUser()).rejects.toThrow('Failed to fetch user data');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles invalid JSON response', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Invalid JSON'));

    await expect(getUser()).rejects.toThrow();
    expect(mockedAxios.get).toHaveBeenCalledWith('/user');
  });
  });

  describe('getWallet', () => {
    it('fetches wallet data successfully', async () => {
      const mockWallet = {
        balance: 1000,
        total_payout: 500,
        total_revenue: 1500,
        pending_payout: 100,
        ledger_balance: 900,
        currency: 'USD'
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockWallet });

      const result = await getWallet();
      expect(result).toEqual(mockWallet);
      expect(mockedAxios.get).toHaveBeenCalledWith('/wallet');
    });

    it('handles API error correctly', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(getWallet()).rejects.toThrow();
      expect(mockedAxios.get).toHaveBeenCalledWith('/wallet');
    });
  });

  describe('getTransactions', () => {
    it('fetches transactions data successfully', async () => {
      const mockTransactions = [{
        id: '1',
        amount: 100,
        type: 'deposit',
        date: '2023-01-01',
        status: 'completed',
        metadata: {
          name: 'John Doe',
          type: 'card',
          email: 'john@example.com',
          quantity: 1,
          country: 'US',
          product_name: 'Product A'
        }
      }];

      mockedAxios.get.mockResolvedValueOnce({ data: mockTransactions });

      const result = await getTransactions();
      expect(result).toEqual(mockTransactions);
      expect(mockedAxios.get).toHaveBeenCalledWith('/transactions');
    });

    it('handles API error correctly', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(getTransactions()).rejects.toThrow();
      expect(mockedAxios.get).toHaveBeenCalledWith('/transactions');
    });
  });
});