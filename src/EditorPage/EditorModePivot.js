import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadLoggedInUserIfAny } from '../HomeScreen/utils';
import { backendUrl } from '../urlResolver';
import BioOptions from './BioOptions';
import MainEditor from './MainEditor';

const EditorModePivot = () => {
  const { state } = useLocation();
  const { autobioid } = state;
  const userData = loadLoggedInUserIfAny();
  const email = userData.email;
  const [bioDetails, setBioDetails] = useState(null);

  useEffect(() => {
    const getAutoBioDetails = async () => {
      try {
        const response = await fetch(backendUrl+'/getAutoBioDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'autobioid':autobioid, 'email':email }),
        });
        const data = await response.json();
        setBioDetails(data);
      } catch (error) {
        console.error('Failed to fetch Auto Bio details:', error);
      }
    };

    getAutoBioDetails();
  }, []);

  return (
    <div>      
      {bioDetails && !bioDetails.isConfigured ? <BioOptions autobioid={autobioid} /> : <MainEditor autobioid={autobioid}/>}
    </div>
  );
};

export default EditorModePivot;
