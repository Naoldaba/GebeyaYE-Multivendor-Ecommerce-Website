import React from 'react';

const CustomDialog = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-4 p-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomDialog;
