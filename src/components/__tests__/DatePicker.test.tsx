import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../DatePicker';

describe('DatePicker Component', () => {
  const mockOnChange = jest.fn();
  const currentDate = new Date(2024, 1, 15); // February 15, 2024
  const placeholderText = 'Select date';

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => currentDate.getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('renders initial state correctly', () => {
    render(<DatePicker value={null} onChange={mockOnChange} />);
    
    expect(screen.getByTestId('datepicker-button')).toBeInTheDocument();
    expect(screen.getByText(placeholderText)).toBeInTheDocument();
    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
  });

  test('toggles calendar visibility', async () => {
    render(<DatePicker value={null} onChange={mockOnChange} />);
    const button = screen.getByTestId('datepicker-button');

    // Open calendar
    await userEvent.click(button);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();

    // Close calendar
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
    });
  });

  test('displays current month and year', async () => {
    render(<DatePicker value={null} onChange={mockOnChange} />);
    await userEvent.click(screen.getByTestId('datepicker-button'));

    expect(screen.getByText('February, 2024')).toBeInTheDocument();
  });

  test('navigates between months', async () => {
    render(<DatePicker value={null} onChange={mockOnChange} />);
    await userEvent.click(screen.getByTestId('datepicker-button'));

    // Go to previous month
    await userEvent.click(screen.getByTestId('prev-month'));
    expect(screen.getByText('January, 2024')).toBeInTheDocument();

    // Go to next month
    await userEvent.click(screen.getByTestId('next-month'));
    expect(screen.getByText('February, 2024')).toBeInTheDocument();
  });

  test('displays correct days in month', async () => {
    render(<DatePicker value={null} onChange={mockOnChange} />);
    await userEvent.click(screen.getByTestId('datepicker-button'));

    // February 2024 has 29 days and starts on Thursday (5 padding days)
    const dayButtons = screen.getAllByRole('button', { name: /^\d+$/ });
    expect(dayButtons.length).toBe(30);
  });

  test('selects a date', async () => {
    render(<DatePicker value={null} onChange={mockOnChange} />);
    await userEvent.click(screen.getByTestId('datepicker-button'));

    // Select 15th day
    const dayButton = screen.getByRole('button', { name: '15' });
    await userEvent.click(dayButton);

    expect(mockOnChange).toHaveBeenCalledWith(new Date(2024, 1, 15));
    await waitFor(() => {
      expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
    });
  });

  test('highlights selected date', async () => {
    render(<DatePicker value={currentDate} onChange={mockOnChange} />);
    await userEvent.click(screen.getByTestId('datepicker-button'));

    const selectedDay = screen.getByRole('button', { name: '15' });
    expect(selectedDay).toHaveClass('bg-black text-white');
  });

  test('displays correct placeholder and format', async () => {
    const { rerender } = render(
      <DatePicker value={null} onChange={mockOnChange} placeholder="Custom placeholder" />
    );
    expect(screen.getByText('Custom placeholder')).toBeInTheDocument();

    rerender(<DatePicker value={currentDate} onChange={mockOnChange} />);
    expect(screen.getByText('15 February 2024')).toBeInTheDocument();
  });

  test('displays correct chevron based on isStart prop', async () => {
    const { rerender } = render(<DatePicker value={null} onChange={mockOnChange} />);
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();

    rerender(<DatePicker value={null} onChange={mockOnChange} isStart={false} />);
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  test('positions calendar correctly based on isEndDate prop', async () => {
    const { rerender } = render(<DatePicker value={null} onChange={mockOnChange} />);
    await userEvent.click(screen.getByTestId('datepicker-button'));
    let calendar = screen.getByTestId('calendar');
    expect(calendar).not.toHaveStyle('right: 0');

    rerender(<DatePicker value={null} onChange={mockOnChange} isEndDate />);
    await userEvent.click(screen.getByTestId('datepicker-button'));
    calendar = screen.getByTestId('calendar');
    expect(calendar).toHaveStyle('right: 0');
  });
});