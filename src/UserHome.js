import React,  { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

import Logo from './AutoBio.png'; // Import the logo image
import 'bootstrap/dist/css/bootstrap.min.css';
import {backendUrl} from './urlResolver';

// Navbar component
const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={Logo} alt="Logo" className="logo me-2" />
                </a>
                <div className="d-flex">
                    <a href="#" className="nav-link me-3">Option 1</a>
                    <a href="#" className="nav-link me-3">Option 2</a>
                    <a href="#" className="nav-link">Option 3</a>
                </div>
            </div>
        </nav>
    );
};


// Rest of your components and code


// Navbar component
const Navbar2 = () => {

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
            <Toolbar>
                <img src={Logo} alt="Logo" style={{ marginRight: '1rem', height: '40px' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    AutoBio
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontFamily: 'Hind Mysuru', fontWeight: 'bold', fontSize: '24px', marginLeft: '2rem', color: 'grey' }}>
                    kb
                </Typography>

                <Typography variant="h6" component="div" sx={{ fontFamily: 'Hind Mysuru', fontWeight: 'bold', fontSize: '24px', marginLeft: '2rem', color: 'grey' }}>
                    kb
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontFamily: 'Hind Mysuru', fontWeight: 'bold', fontSize: '24px', marginLeft: '2rem', color: 'grey' }}>
                    kb
                </Typography>

            </Toolbar>
        </AppBar>
    );
};


// Card component
const CustomCard = ({ title, description }) => {
    return (
        <Card sx={{ minWidth: 275, marginBottom: '1rem' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
};


// Home page component
const HomePage = () => {
    const [userBios, setUserBios] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        // try {
        //   const response = await fetch(backendUrl + '/getAvailableBios',  {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   });
        //   setUserBios(response.data);
        // } catch (error) {
        //   console.error(error);
        // }
        const response = await axios.get(backendUrl + 'a');
        console.log(response);
        const response2 = await axios.get(backendUrl + 'b');
        console.log(response2);

      };
  
      fetchData();
    }, []);

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4">Your Bios</h1>
                    </div>
                </div>
                <NoBiosAvailable />
            </div>
        </div>
    );
};
const NoBiosAvailable = () => {
    return (
      <div className="row mt-4">
        <div className="col-6 offset-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">No Bios</h5>
              <p className="card-text">No bios started. Click on "Start a new bio" to get started.</p>
              <div className="text-right">
                <button className="btn btn-primary">Start a new bio</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default HomePage;
