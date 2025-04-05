import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MultiSelect from '../MultiSelect';

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('MultiSelect Component', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
  const mockOnChange = jest.fn();
  const defaultProps = {
    options: mockOptions,
    value: [],
    onChange: mockOnChange,
    placeholder: 'Select options',
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder when no options are selected', () => {
    render(<MultiSelect {...defaultProps} />);
    expect(screen.getByText('Select options')).toBeInTheDocument();
  });

  it('displays selected options correctly', () => {
    const selectedOptions = ['Option 1', 'Option 2'];
    render(<MultiSelect {...defaultProps} value={selectedOptions} />);
    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<MultiSelect {...defaultProps} />);
    fireEvent.click(screen.getByText('Select options'));

    // Check if all options are visible
    mockOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('selects and deselects options correctly', () => {
    render(<MultiSelect {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByText('Select options'));

    // Select first option
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['Option 1']);

    // Update component with new selection
    render(<MultiSelect {...defaultProps} value={['Option 1']} />);

    // Open dropdown again
    fireEvent.click(screen.getByText('Option 1'));

    // Select second option
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith(['Option 1', 'Option 2']);

    // Update component with new selections
    render(<MultiSelect {...defaultProps} value={['Option 1', 'Option 2']} />);

    // Open dropdown again
    fireEvent.click(screen.getByText('Option 1, Option 2'));

    // Deselect first option
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['Option 2']);
  });

  it('closes dropdown when clicking outside', () => {
    render(<MultiSelect {...defaultProps} />);

    // Open dropdown
    fireEvent.click(screen.getByText('Select options'));

    // Simulate click outside
    fireEvent.mouseDown(document.body);

    // Check if dropdown is closed
    mockOptions.forEach(option => {
      expect(screen.queryByText(option)).not.toBeInTheDocument();
    });
  });

  it('handles empty options array', () => {
    render(<MultiSelect {...defaultProps} options={[]} />);
    fireEvent.click(screen.getByText('Select options'));
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  it('displays correct checkmark state for selected options', () => {
    const selectedOptions = ['Option 1'];
    render(<MultiSelect {...defaultProps} value={selectedOptions} />);

    // Open dropdown
    fireEvent.click(screen.getByText('Option 1'));

    // Check if selected option has the correct styling
    const option1Button = screen.getByText('Option 1').closest('button');
    expect(option1Button).toHaveClass('bg-black');

    // Check if unselected options don't have the selected styling
    const option2Button = screen.getByText('Option 2').closest('button');
    expect(option2Button).not.toHaveClass('bg-black');
  });

  it('maintains selected options order', () => {
    const selectedOptions = ['Option 2', 'Option 1'];
    render(<MultiSelect {...defaultProps} value={selectedOptions} />);
    expect(screen.getByText('Option 2, Option 1')).toBeInTheDocument();
  });
});