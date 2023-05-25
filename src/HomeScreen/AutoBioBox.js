import React from 'react';
import { Card, CardContent, Typography, Box, Button, LinearProgress } from '@mui/material';
import {moveToEditor} from './utils'
import { useNavigate } from 'react-router-dom';

const AutoBioBox = ({ autobioid, chapter_text, chapter_titles, expected_length, questions, state, user_answers, useremail, previousQuestion, startedDate,progressPercentage }) => {

    // Calculate the percentage
//   const progressPercentage = Math.floor((12 / 18) * 100);
const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
      <Card elevation={3} sx={{ backgroundColor: '#e4f0f0', border: '1px solid #DADADA', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '600px', margin: '12px', padding: '2px' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ marginBottom: 0, marginTop: 0 }}>
            <Typography variant="body2" color="textSecondary">
              Last Question
            </Typography>
          </Box>
          <Typography variant="h5" gutterBottom>
            {previousQuestion}
          </Typography>
          <Box sx={{ marginBottom: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Started Date: {startedDate}
            </Typography>
          </Box>
         
          {/* Render other fields as needed */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <LinearProgress variant="determinate" value={progressPercentage} sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
              {progressPercentage}%
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ marginRight: 2 }}>
          <Button variant="contained" color="primary" onClick={()=> moveToEditor(autobioid, navigate)}>
            Continue
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default AutoBioBox;
