import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = props.allChapters;

  const [selectedOption, setSelectedOption] = useState(options ? options[0]: 'Select a chapter');


  const handleToggle = () => {
    debugger
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    debugger;
    setSelectedOption(option);
    setIsOpen(false);
    props.SetCurrentChap(option);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
        {selectedOption ? selectedOption : 'Select a chapter'}
        <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
