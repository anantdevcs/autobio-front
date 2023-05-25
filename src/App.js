import './App.css';
import { Route, Routes } from "react-router-dom"
import LandingPage from "./LandingScreen/landingScreen"
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import Editor from './editroPage';
import HomePage from './UserHome'
import Home from './HomeScreen/Home'
import EditorModePivot from './EditorPage/EditorModePivot'

function App() {

  
  return (
    <GoogleOAuthProvider clientId="1560377169-vjbi38h4kh5b8mrtrhmv0rbn1s7djaq0.apps.googleusercontent.com">
    <Routes>
      <Route path="/" element={ <LandingPage /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/editor" element={ <EditorModePivot />  }  />
      {/* <Route path="/editor" element={<Editor username={username} userphoto={userphoto}  useremail={useremail} usercreds={usercreds} handleGoogleUserChanged={handleGoogleUserChanged} />} />
      <Route path="/home" element={<HomePage username={username} userphoto={userphoto}  useremail={useremail} usercreds={usercreds} handleGoogleUserChanged={handleGoogleUserChanged} />} /> */}
    </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
