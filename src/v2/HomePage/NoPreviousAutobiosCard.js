import './NoPreviousAutobiosCard.css'
import { json, useNavigate } from 'react-router-dom';
import { backendUrl } from '../urlResolver';


export default function NoPreviousAutobiosCard(){
    const navigator = useNavigate();
     const startNewBio = async () => {
        try {
            const email = localStorage.getItem("email");
            const usercreds = JSON.parse(localStorage.getItem("usercreds"));
            const response = await fetch(backendUrl + '/addBio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'tokenId': usercreds, 'email': email }),
            });
            const jsonData = await response.json();
            if (response.status === 401) {
                
                  navigator('/');
                  
            }
            if (response.ok) {
                const autobioid = jsonData['autobioid'], configured = jsonData['configured']
                if (!configured) {
                    navigator('/configure',  { state: { autobioid: autobioid }})
                }
                debugger;
            }
            
            
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }

    }
    return (
      <div class="noPrevCardContainer">
        <p class="noPrevCardContainerHeader">No Autobio started yet.</p>
        <button className='stdbutton' onClick={startNewBio}>Start a new bio</button>
      </div>
    );
  };
  