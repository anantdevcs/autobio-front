import './PreviousBioPresent.css'
import { useNavigate } from 'react-router-dom';
import { json } from 'react-router-dom';
import { backendUrl } from '../urlResolver';

export default function PreviousBioPresent(props){
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
   const navigator = useNavigate();
   const resumePreviousBio = (configured, autobioid2) => {
    debugger;
    if (!configured)
    {
      debugger;
      navigator('/configure',  { state: { autobioid: props.biodata.autobioid }})
    }
    else 
    navigator('/editor',  { state: { autobioid: props.biodata.autobioid} })
   } 

    return (
      <div class="PrevCardContainer">
        <a class="PrevCardContainerHeader" onClick={()=>resumePreviousBio(props.biodata.isConfigured, props.biodata.autobioid)}>Resume Previous Bio</a>
        <p class="prevQuestion"><b>Prev question</b> {props.biodata.previous_question === ''? 'Not started' : props.biodata.previous_question}</p>
        <div class="createNewBioContainer">
  <p class='createNewBioText' onClick={startNewBio}>Create New Bio</p>
  <p class='createNewBioText'>View Inprogress Bios</p>
</div>

      </div>
    );
  };
  