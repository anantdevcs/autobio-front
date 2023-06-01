import React, { useEffect, useState } from 'react';
import Navbar from '../CommonComponents/Navbar';
import './HomeScreen.css'
import NoPreviousAutobiosCard from './NoPreviousAutobiosCard'
import PreviousBioPresent from './PreviousBioPresent'
import { backendUrl } from '../urlResolver';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeScreen = () => {
    const [biodata, setBioData] = useState({
        'previous_question': '',
        'autobioid': ''
    })
    const navigator = useNavigate();

    useEffect(() => {
        const fetchBioData = async () => {
            try {
                const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const response = await fetch(backendUrl + '/getPreviousBio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email }),
                });
                const jsonData = await response.json();
                if (response.status === 401) {
                    toast.error('Please login again!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      navigator('/');
                      
                }
                
                if (jsonData.error === "No bios found for anantdeviitism@gmail.com") {
                    setBioData({
                        'previous_question': '',
                        'autobioid':''
                    })
                }
                 else {
                    setBioData({
                        'previous_question': jsonData['previous_question'],
                        'autobioid': jsonData['autobioid']
                    })
                }
            } catch (error) {
                
                console.error('Error fetching data:', error);
            }
        };

        fetchBioData();
    }, []);
    return (
        <div className="home-screen">
            <Navbar />
            {biodata.autobioid === '' ?
                <NoPreviousAutobiosCard />
                :
                <PreviousBioPresent />
            }
        </div>
    );
};

export default HomeScreen;
