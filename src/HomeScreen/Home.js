import ResponsiveAppBar from './Appbar';
import { loadLoggedInUserIfAny, getAllAutoBioDrafts, handleCreateNewBio } from './utils';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import NoBiosAvailable from './NoBiosCard';
import React, { useEffect, useState } from 'react';
import AutoBioBox from './AutoBioBox';
import { Button } from '@mui/material';

const Home = () => {
  const navigator = useNavigate();
  const userData = loadLoggedInUserIfAny();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.email) {
        navigator('/');
      } else {
        try {
          const fetchedDrafts = await getAllAutoBioDrafts(userData.email);
          console.log('Retrieved Auto Bio Drafts:', fetchedDrafts);
          setDrafts(fetchedDrafts);
        } catch (error) {
          console.error('Error retrieving Auto Bio Drafts:', error);
          // Handle the error case
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <ResponsiveAppBar userData={userData} />
      <Typography variant="h3" gutterBottom style={{ textAlign: 'center', marginTop: 30 }}>
        Your Bios
        <hr></hr>
      </Typography>
      
      {/* Conditionally render either the drafts or the "No Bios Available" message */}
      {drafts.length > 0 ? (
        drafts.map((item) => (
          <AutoBioBox
            key={item.autobioid}
            autobioid={item.autobioid}
            chapter_text={item.chapter_text}
            chapter_titles={item.chapter_titles}
            expected_length={item.expected_length}
            questions={item.questions}
            state={item.state}
            user_answers={item.user_answers}
            useremail={item.useremail}
            previousQuestion="who are you?"
            startedDate="12/08/19"
            progressPercentage={33}
          />
          
        ))
      ) : (
        <NoBiosAvailable />
      )}
 {!drafts || drafts.length > 0 ? (
      <Typography variant="h3" gutterBottom style={{ textAlign: 'center', marginTop: 30 }}>
        <Button variant="contained" color="primary" size="large" onClick={()=>handleCreateNewBio(navigator)}>
          Write New Bio
        </Button>
      </Typography>
 ):(<div></div>)}
    </div>
  );
};

export default Home;
