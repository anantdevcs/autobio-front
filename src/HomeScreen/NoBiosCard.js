import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import {handleCreateNewBio} from './utils';
import { useNavigate } from 'react-router-dom';


const styles = {
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: 8,
    border: '2px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F8F8F8', // Off-white color
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
};

function NoBiosAvailable() {
  const navigate = useNavigate();
  debugger;
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.content}>
        <Typography variant="h5" component="h2" gutterBottom>
          No Bios Started.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Click "Write New Bio" to get started.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={styles.button}
          onClick={ ()=> {  handleCreateNewBio(navigate)}}
        >
          Write New Bio
        </Button>
      </CardContent>
    </Card>
  );
}

export default NoBiosAvailable;
