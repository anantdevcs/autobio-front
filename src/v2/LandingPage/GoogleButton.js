import React from 'react';
import './GoogleButton.css'; // Import the CSS file for styling
import LOGO from './google_logo.png'
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { respondToGoogleAuthSuccessAndGotoHomeHelper } from './utils'
import { useNavigate } from 'react-router-dom';

const GoogleButton = () => {
    const navigator = useNavigate();
    const respondToGoogleAuthSuccessAndGotoHome = (response) => respondToGoogleAuthSuccessAndGotoHomeHelper(response, navigator)
    const login = useGoogleLogin({
        onSuccess: tokenResponse => respondToGoogleAuthSuccessAndGotoHome(tokenResponse.access_token),
    });
    return (
        <button className="google-button" onClick={() => login()}>
            <img
                src={LOGO}
                alt="Google Logo"
                className="google-button__logo"
            />
            <span className="google-button__text">Sign in with Google</span>
        </button>
    );
};

export default GoogleButton;
