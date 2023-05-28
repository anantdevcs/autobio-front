import React, { useState, useEffect } from 'react';
import { Button, Modal, Typography, Box, Tab, Tabs } from '@mui/material';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '4px',
  outline: 'none',
  width: '75%',
  maxHeight: '100vh', // Set maximum height to the full viewport height
  overflowY: 'auto', // Enable vertical scrolling
};

const modalTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const modalDescriptionStyle = {
  fontSize: '16px',
  color: '#555',
  marginBottom: '20px',
  marginTop: '20px', // Add margin to create space between tabs and content
};

const closeButtonStyle = {
  marginTop: '20px',
};

const SneekPeekModal = ({ isOpen, handleClose, autobioid }) => {
  const [data, setData] = useState('');
  const email = localStorage.getItem('email');
  const [chapters, setChapters] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isInProgress, setisInProgress] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.autobiobackend.com/startOrGetSnearPeekOrFullBioWrite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            autobioid: autobioid,
          }),
        });

        const result = await response.json();
        setData(result.status);
        if (result.status === 'finished') {
          setChapters(result.chapters);
          setisInProgress(false);
        }
        if (result.status === 'inprogress' ) {
            setisInProgress(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, autobioid, email]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
 

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={modalStyle}
    >
      <Box sx={modalContentStyle}>
        {isInProgress? (<div>
            <Typography variant="h2" sx={modalTitleStyle} id="modal-title">
          In Progress
        </Typography>
        
        
        </div>):<div>
        <Typography variant="h2" sx={modalTitleStyle} id="modal-title">
          Modal Title
        </Typography>
        <Typography variant="body1" sx={modalDescriptionStyle} id="modal-description">
          <Tabs value={activeTab} onChange={handleTabChange}>
            {chapters.map((chapter, index) => (
              <Tab key={index} label={`Chapter ${index + 1}`} />
            ))}
          </Tabs>
          <div>
            {chapters.map((chapter, index) => (
              <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
                <h2 style={{marginTop:'24px'}}>{chapter.title}</h2>
                <p>{chapter.chapter_text}</p>
              </div>
            ))}
          </div>
        </Typography></div> }
        
      </Box>
    </Modal>
  );
};

export default SneekPeekModal;
