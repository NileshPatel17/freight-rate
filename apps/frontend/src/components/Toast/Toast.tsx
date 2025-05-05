import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  // Toast styling based on type
  const toastStyles = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
  };

  const iconStyles = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`flex items-center p-4 mb-3 rounded shadow-md border-l-4 transform transition-all duration-300 ease-in-out ${toastStyles[type]}`}
      style={{ width: '320px' }}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-grow mr-2">{message}</div>
      <button
        onClick={() => onClose(id)}
        className={`ml-auto focus:outline-none ${iconStyles[type]}`}
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast