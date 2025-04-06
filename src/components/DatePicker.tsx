import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  isStart?: boolean;
  isEndDate?: boolean;
}

const DatePicker = ({ value, onChange, placeholder = 'Select date', isStart = true, isEndDate = false }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Adjust for Monday as first day of week
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add empty days for padding
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const isSelected = (date: Date) => {
    return value && date.toDateString() === value.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
      data-testid="datepicker-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 ${isOpen ? 'bg-white border-2 border-black' : 'bg-[#EFF1F6]'} rounded-[14px] flex items-center justify-between text-left`}
      >
        <span className={value ? 'text-black' : 'text-gray-400'}>
          {value ? formatDate(value) : placeholder}
        </span>
        {isStart ? <ChevronUp size={20} data-testid="chevron-up" /> : <ChevronDown size={20} data-testid="chevron-down" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
          data-testid="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-[20px] shadow-lg p-4 min-w-[470px]"
            style={{
              top: 'auto',
              bottom: 'auto',
              marginBottom: 'auto',
              right: isEndDate ? 0 : 'auto',
              transform: isEndDate ? 'translateX(0)' : 'none'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <button
              data-testid="prev-month"
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-medium">
                {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
              </h2>
              <button
              data-testid="next-month"
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm text-gray-600 py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((date, index) => (
                <div
                  key={index}
                  className="text-center py-1"
                >
                  {date && (
                    <button
                      onClick={() => handleDateSelect(date)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected(date) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    >
                      {date.getDate()}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;