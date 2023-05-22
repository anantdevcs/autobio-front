import './App.css';
import { Route, Routes } from "react-router-dom"
import LandingPage from "./landingPage"
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import Editor from './editroPage';
import HomePage from './UserHome'

function App() {
  const [useremail, setUseremail] = useState('');
  const [username, setUsername] = useState('');
  const [userphoto, setUserphoto] = useState('');

  const handleGoogleUserChanged = (user) => {
    debugger;
    setUseremail(user.email);
    setUsername(user.name);
    setUserphoto(user.photoUrl);
   
  }
  return (
    <GoogleOAuthProvider clientId="1560377169-vjbi38h4kh5b8mrtrhmv0rbn1s7djaq0.apps.googleusercontent.com">
    <Routes>
      <Route path="/" element={ <LandingPage username={username} userphoto={userphoto}  useremail={useremail} handleGoogleUserChanged={handleGoogleUserChanged} /> } />
      <Route path="/editor" element={<Editor username={username} userphoto={userphoto}  useremail={useremail} handleGoogleUserChanged={handleGoogleUserChanged} />} />
      <Route path="/home" element={<HomePage username={username} userphoto={userphoto}  useremail={useremail} handleGoogleUserChanged={handleGoogleUserChanged} />} />
    </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
