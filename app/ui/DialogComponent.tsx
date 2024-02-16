import React from 'react';

interface DialogProps {
  onClose: () => void;
  successCount: number;
  failureCount: number;
}

const DialogComponent: React.FC<DialogProps> = ({ onClose, successCount, failureCount }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 max-w-lg w-full mx-4">
        <h2 className="text-xl font-bold text-white">Order Placement Results</h2>
        <div className="text-white mt-4">
          <p>Successful Orders: <span className="text-green-400">{successCount}</span></p>
          <p>Failed Orders: <span className="text-red-400">{failureCount}</span></p>
        </div>
        <button onClick={onClose} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-700 transition duration-300 ease-in-out">Close</button>
      </div>
    </div>
  );
};

export default DialogComponent;
