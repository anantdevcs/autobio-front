import React from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button } from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Editor(props) {
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };
  const handleLogout = () => {
    // Handle Google logout logic here
    googleLogout();
    console.log(props.useremail);
    const user_info = {'name': '', 'email': '', 'photoUrl': ''};
    props.handleGoogleUserChanged(user_info);
   }
  if (props.useremail === '') {
    navigate('/' );
  }


  return (
    <div>
      <AppBar position="static">
        {props.creds}
        <Toolbar>
          <Typography variant="h6">Navbar</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <TextField label="Left Text" fullWidth sx={{ marginBottom: '1rem' }} />
          <TextField label="Right Text" fullWidth sx={{ marginBottom: '1rem' }} />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="contained" color="primary" type="submit" onClick={handleLogout}>
            Logout
          </Button>

        </form>
      </Container>
    </div>
  );
}

export default Editor;
