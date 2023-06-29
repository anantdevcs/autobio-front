import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PopupChooser = ({ options, onSelect }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    handleCloseModal();
  };

  return (
    <>
<Button
  onClick={handleOpenModal}
  style={{
    backgroundColor: 'black',
    textTransform: 'uppercase',
    fontFamily: 'Arial',
    width: '450px',
    height:'70px'
  }}
>
   {selectedOption? selectedOption : 'Select Chapter'}
</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {options.map((option) => (
            <div key={option} className="option-container" style={{margin:'10px'}}>
              <Button
                onClick={() => handleOptionSelect(option)}
                variant="primary"
                className="option-button"
              >
                {option}
              </Button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupChooser;
