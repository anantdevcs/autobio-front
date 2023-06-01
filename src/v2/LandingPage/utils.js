import { backendUrl } from '../urlResolver';

export async function respondToGoogleAuthSuccessAndGotoHomeHelper(response, navigator) {
    try {
        debugger;
        const { tokenId } = response;
        const res = await fetch(backendUrl + '/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'tokenId': response }),
        });
  
        if (res.ok) {
          const data = await res.json();
          const { name, email, photoUrl,  } = data;
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("photoUrl", photoUrl);
          localStorage.setItem("usercreds", JSON.stringify(response));
          navigator('/home')
         
  
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.log('An error occurred', error);
      } 
}