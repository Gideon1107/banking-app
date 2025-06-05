import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessPopup = ({ isOpen, onClose, message }: SuccessPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center">
          <FaCheckCircle className="mx-auto text-text text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-text to-[#00388C] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
