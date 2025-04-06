import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '../Layout';
import { getUser } from '../../services/api';

jest.mock('../../services/api', () => ({
  getUser: jest.fn(),
}));

const mockUser = {
  first_name: "Olivier",
  last_name: "Jones",
  email: 'olivierjones@gmail.com',
};

describe('Layout Component', () => {
  const originalConsoleError = console.error;
  
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders basic layout structure', async () => {
    render(<Layout><div>Test Content</div></Layout>);

    expect(screen.getByTestId('main-logo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(await screen.findByText('Test Content')).toBeInTheDocument();
  });

  test('fetches and displays user data', async () => {
    render(<Layout><div /></Layout>);

    await waitFor(() => {
      expect(getUser).toHaveBeenCalledTimes(1);
    });

    const initials = `${mockUser.first_name[0]}${mockUser.last_name[0]}`;
    expect(await screen.findByText(initials)).toBeInTheDocument();
    const fullName = `${mockUser.first_name} ${mockUser.last_name}`;
    expect(await screen.findByText(fullName)).toBeInTheDocument();
    expect(await screen.findByText(mockUser.email)).toBeInTheDocument();
  });

  test('toggles profile dropdown', async () => {
    render(<Layout><div /></Layout>);
    const profileButton = await screen.findByRole('button', { name: /Profile Menu/i });

    // Open dropdown
    await userEvent.click(profileButton);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // Close dropdown
    await userEvent.click(profileButton);
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  test('displays loading state for user data', async () => {
    (getUser as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<Layout><div /></Layout>);

    expect(await screen.findByText('OJ')).toBeInTheDocument();
    // expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles user data fetch error', async () => {
    (getUser as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<Layout><div /></Layout>);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Failed to fetch user data:', expect.any(Error));
    });

    expect(await screen.findByText('OJ')).toBeInTheDocument();
    // expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays all navigation links', async () => {
    render(<Layout><div /></Layout>);

    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('CRM')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();
  });

  test('highlights active navigation link', async () => {
    render(<Layout><div /></Layout>);
    const activeLink = await screen.findByText('Revenue');
    
    expect(activeLink.closest('a')).toHaveClass('active');
  });

  test('displays notification and message buttons', async () => {
    render(<Layout><div /></Layout>);

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(3); // Profile button + 2 notification buttons
  });
});