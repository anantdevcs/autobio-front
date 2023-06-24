import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // If the modal is not open, don't render anything
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Popup Modal</h2>
        <p>This is the content of the modal.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
