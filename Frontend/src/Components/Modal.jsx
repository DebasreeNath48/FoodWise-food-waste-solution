import React from 'react';
import '../Styles/CSS/modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button onClick={onClose} className="modalCloseButton">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
