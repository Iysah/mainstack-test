import { getUser } from '../api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

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
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    await expect(getUser()).rejects.toThrow('Failed to fetch user data');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});