import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Layout from '../Layout';
import { getUser } from '../../services/api';

// Mock the API module
jest.mock('../../services/api', () => ({
  getUser: jest.fn(),
}));

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Layout Component', () => {
  const mockUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(() => {
    (getUser as jest.Mock).mockClear();
  });

  it('renders without crashing', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('displays navigation links correctly', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('CRM')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();
  });

  it('fetches and displays user data correctly', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Wait for user data to be loaded
    await waitFor(() => {
      expect(getUser).toHaveBeenCalled();
    });

    // Check if user initials are displayed
    const initialsElement = screen.getByText('JD');
    expect(initialsElement).toBeInTheDocument();
  });

  it('toggles profile dropdown when clicked', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Wait for user data to be loaded
    await waitFor(() => {
      expect(getUser).toHaveBeenCalled();
    });

    // Click profile button to open dropdown
    const profileButton = screen.getByText('JD');
    fireEvent.click(profileButton);

    // Check if dropdown menu items are displayed
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Purchase History')).toBeInTheDocument();
    expect(screen.getByText('Refer and Earn')).toBeInTheDocument();
    expect(screen.getByText('Integrations')).toBeInTheDocument();
    expect(screen.getByText('Report Bug')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // Click again to close dropdown
    fireEvent.click(profileButton);
    await waitFor(() => {
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });
  });

  it('shows loading state before user data is fetched', async () => {
    let resolveUser: (value: any) => void;
    (getUser as jest.Mock).mockImplementation(
      () => new Promise((resolve) => {
        resolveUser = resolve;
      })
    );

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check loading state
    expect(screen.getByText('OJ')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Resolve user data
    await act(async () => {
      resolveUser!(mockUser);
    });

    // Verify loading state is replaced with user data
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles profile dropdown keyboard interactions', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    await waitFor(() => {
      expect(getUser).toHaveBeenCalled();
    });

    const profileButton = screen.getByText('JD');
    
    // Test keyboard interaction
    fireEvent.keyDown(profileButton, { key: 'Enter' });
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Test clicking outside to close
    fireEvent.click(document.body);
    await waitFor(() => {
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (getUser as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    await waitFor(() => {
      expect(getUser).toHaveBeenCalled();
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(screen.getByText('OJ')).toBeInTheDocument(); // Fallback initials

    consoleErrorSpy.mockRestore();
  });
});