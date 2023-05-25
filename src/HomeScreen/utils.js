import axios from 'axios';
import {backendUrl} from '../urlResolver';
 
export const loadLoggedInUserIfAny = () => {
    try {
      let email = localStorage.getItem('email');
      let photoUrl = localStorage.getItem('photoUrl');
      let usercreds = localStorage.getItem('usercreds');
      let name = localStorage.getItem('name');
  
      let userData = {
        email: email,
        photoUrl: photoUrl,
        usercreds: usercreds,
        name: name
      };
  
      return userData;
    } catch (error) {
      // Handle the error
      console.error('Error loading user data:', error);
      return null; // Or you can return a default value or an empty object
    }
  };
  
  export  function handleCreateNewBio(navigate) {
    debugger;
    let email = localStorage.getItem('email');
    let cred = localStorage.getItem('usercreds')

     addAutoBioDraft(email, navigate)
  }


  function addAutoBioDraft(email, navigate, moveToEditorCallback) {
    axios
      .post(backendUrl + '/addAutoBioDraft', { email })
      .then((response) => {
        console.log(response.data);
        let autobioid = response.data.data;
        moveToEditor(autobioid, navigate);
        debugger;
      })
      .catch((error) => {
        console.error(error);
      });
  }

const validateCreds = async (creds) => {
    const res = await fetch(backendUrl + '/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'tokenId': creds }),
      });

      if (res.ok) {
        const data = await res.json();
        const { name, email, photoUrl,  } = data;
        let stored_email = localStorage.getItem('email');
        if (stored_email === email) {
            return 'Success'
        }

      } else {
        return 'InvalidLogin'
      }
   
}


export async function getAllAutoBioDrafts()  {
  const email = localStorage.getItem('email');
  const response = await axios.post(backendUrl+'/getAllAutoBioDrafts', { email })
  const drafts = response.data;
   return drafts;
}

export function moveToEditor(autobioid, navigate)  {
    debugger;
    navigate('/editor', { state: { autobioid: autobioid }});

}