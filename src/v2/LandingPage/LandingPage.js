import React from 'react';
import './LandingPage.css';
import 'typeface-sacramento';
import "@fontsource/dm-sans";
import { GoogleLogin } from '@react-oauth/google';
import { respondToGoogleAuthSuccessAndGotoHomeHelper } from './utils'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigator = useNavigate();
  const respondToGoogleAuthSuccessAndGotoHome = (response) => respondToGoogleAuthSuccessAndGotoHomeHelper(response, navigator)

  return (
    <div className="landing-page">
      <div className="landing-page__autobio">
        <h2 className="landing-page__autobio-text">AutoBio</h2>
        <p className="landing-page__autobio-subtitle">The Personal Biographer powered by AI</p>
        <p className="landing-page__journey-text">
          Write your Life Journey Today!
        </p>
        <div className="center-align">
          <GoogleLogin onSuccess={respondToGoogleAuthSuccessAndGotoHome} theme='filled_blue'/>
        </div>
      </div>
      {/* Add your landing page content here */}
    </div>
  );
};

export default LandingPage;
