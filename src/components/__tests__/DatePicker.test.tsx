import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DatePicker from '../DatePicker';

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('DatePicker Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    value: null,
    onChange: mockOnChange,
    placeholder: 'Select date',
    isStart: true,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder when no date is selected', () => {
    render(<DatePicker {...defaultProps} />);
    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  it('displays selected date correctly', () => {
    const selectedDate = new Date('2024-01-15');
    render(<DatePicker {...defaultProps} value={selectedDate} />);
    expect(screen.getByText('15 January 2024')).toBeInTheDocument();
  });

  it('opens calendar when clicked', () => {
    render(<DatePicker {...defaultProps} />);
    fireEvent.click(screen.getByText('Select date'));

    // Check if calendar elements are visible
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('navigates between months correctly', () => {
    const currentDate = new Date('2024-01-15');
    render(<DatePicker {...defaultProps} value={currentDate} />);

    // Open calendar
    fireEvent.click(screen.getByText('15 January 2024'));

    // Navigate to next month
    fireEvent.click(screen.getByLabelText('next month'));
    expect(screen.getByText('February, 2024')).toBeInTheDocument();

    // Navigate to previous month
    fireEvent.click(screen.getByLabelText('previous month'));
    expect(screen.getByText('January, 2024')).toBeInTheDocument();
  });

  it('selects date correctly when clicked', async () => {
    render(<DatePicker {...defaultProps} />);

    // Open calendar
    fireEvent.click(screen.getByText('Select date'));

    // Click on a date (assuming it's visible in the current month)
    fireEvent.click(screen.getByText('15'));

    // Check if onChange was called with the correct date
    expect(mockOnChange).toHaveBeenCalled();
    const calledDate = mockOnChange.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(15);
  });

  it('closes calendar when date is selected', async () => {
    render(<DatePicker {...defaultProps} />);

    // Open calendar
    fireEvent.click(screen.getByText('Select date'));

    // Select a date
    fireEvent.click(screen.getByText('15'));

    // Check if calendar is closed
    await waitFor(() => {
      expect(screen.queryByText('Mon')).not.toBeInTheDocument();
    });
  });

  it('renders with different chevron based on isStart prop', () => {
    const { rerender } = render(<DatePicker {...defaultProps} isStart={true} />);
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();

    rerender(<DatePicker {...defaultProps} isStart={false} />);
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('handles edge case of clicking outside calendar', () => {
    render(<DatePicker {...defaultProps} />);

    // Open calendar
    fireEvent.click(screen.getByText('Select date'));

    // Simulate click outside
    fireEvent.mouseDown(document.body);

    // Check if calendar is closed
    expect(screen.queryByText('Mon')).not.toBeInTheDocument();
  });
});