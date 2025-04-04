import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const MultiSelect = ({ options, value, onChange, placeholder = 'Select options' }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(item => item !== option)
      : [...value, option];
    onChange(newValue);
  };

  const displayValue = value.length > 0
    ? value.join(', ')
    : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 ${isOpen ? 'bg-white border-2 border-black' : 'bg-[#EFF1F6]'} rounded-[14px] flex items-center justify-between text-left`}
      >
        <span className={`truncate ${value.length > 0 ? 'text-black' : 'text-gray-400'}`}>
          {displayValue}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-[20px] shadow-lg py-2 max-h-[300px] overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${value.includes(option) ? 'bg-black border-black' : 'border-gray-300'}`}
                >
                  {value.includes(option) && <Check size={14} className="text-white" />}
                </div>
                <span className="text-left">{option}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelect;