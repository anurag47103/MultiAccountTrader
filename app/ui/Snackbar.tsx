// Snackbar.tsx
import React from 'react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type }) => {
  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {message}
    </div>
  );
};

export default Snackbar;
