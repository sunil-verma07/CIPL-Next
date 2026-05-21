import type { ChangeEvent, FocusEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimatedInputProps = {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  success?: boolean;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  className?: string;
};

export default function AnimatedInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  success,
  multiline = false,
  rows = 5,
  required = false,
  className = '',
}: AnimatedInputProps) {
  const statusClass = error ? 'input-error' : success ? 'input-success' : '';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <motion.div
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {multiline ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className={`input-field resize-none ${statusClass}`}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            className={`input-field ${statusClass}`}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-xs text-red-500 mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
