import React from 'react';
import { Typography, Button, Container, Grid } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin  } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {backendUrl} from './urlResolver.js';

function LandingPage(props) {
    const navigate = useNavigate();
  const handleLoginWithGoogle = () => {
    // Handle Google login logic here
  };
  const responseGoogle = async (response) => {
    try {
      const { tokenId } = response;
      const res = await fetch(backendUrl + '/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'tokenId': response }),
      });

      if (res.ok) {
        const data = await res.json();
        const { name, email, photoUrl,  } = data;
        const user_info = {'name': name, 'email': email, 'photoUrl': photoUrl, 'creds':response};
        props.handleGoogleUserChanged(user_info);
        
        
        // Redirect to BioEditor screen and pass the data as state
        // navigate('/bio-editor', { state: { name, email,  photoUrl } });



      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.log('An error occurred', error);
    } 
  };
  if (props.username != '') {
    navigate('/home' );
  }
  return (
    

        <div className="App">
          <Container>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h2" component="h1" gutterBottom>
                  AutoBio
                </Typography>
                <Typography variant="h4" gutterBottom>
                  An AI tool to help write your own story
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Discover the power of AutoBio and let our advanced AI technology assist you in creating a captivating and
                  personalized autobiography.1
                </Typography>
                {/* <Button variant="contained" color="primary" href="#">
                  Login 
                </Button> */}
                <GoogleLogin 
  onSuccess={responseGoogle}
  onError={() => {
    console.log('Login Failed');
  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
}

export default LandingPage;
