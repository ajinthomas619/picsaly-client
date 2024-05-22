import React, { ReactNode } from "react";

interface ModalProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50   ">
      <div className="bg-white p-2 rounded-lg shadow-lg w-3/4 h-3/4   ">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;