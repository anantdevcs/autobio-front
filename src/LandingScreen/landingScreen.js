import React from 'react';

import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin  } from '@react-oauth/google';
import {responseGoogle} from './utils';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  text: {
    textAlign: 'center',
    margin:'8vh'
  }
};

const LandingPage = () => {
  const navigator = useNavigate();

  return (
    <div>
    
    
      <h1 style={styles.text}>AutoBio</h1>
      <h4 style={styles.text}>AutoBio: Unleash the Power of AI to Write Your Autobiography</h4>
      <h4 style={styles.button}> </h4>
      <GoogleLogin onSuccess={(response)=> responseGoogle(response, navigator)}> </GoogleLogin>
      
    </div>
    
  );
};

export default LandingPage;
