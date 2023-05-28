import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Card, Button, LinearProgress } from '@mui/material';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { loadLoggedInUserIfAny } from '../HomeScreen/utils';
import ResponsiveAppBar from '../HomeScreen/Appbar';
import { CardContent } from '@mui/material';
import { getoNextQuestionHelper, takeAutoBiofyAction, getCurrentQuestion, getPercentWordLimitCompleted, addNewLineAfterFullStop, testWrite} from './utils';
import FacebookCircularProgress from './Spinner';
import SneakPeek from './SneakPeek';
import { useLocation } from 'react-router-dom';
import SneekPeekModal from './SneakPeekModal';
import PromptRichTextEditor from './PromptRichTextEditor' 
const MainEditor = () => {
    const { state } = useLocation();
  const { autobioid } = state;
  const userData = loadLoggedInUserIfAny();

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [text, setText] = useState('');
  const [currQuestion, setCurrQuestion] = useState('');
  const [currPrompt, setCurrPrompt] = useState('');
  const [isShowingFollowup, setIsShowingFollowup] = useState(false);
  const [placeHolderText, setPlaceHolderText] = useState('Just put your thoughts here the way you like! AutoBio will rewrite your answer to make it professional');
  const [utilisedWLPer, setutilisedWLPer] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [answerGivenByUser, setanswerGivenByUser] = useState('');
  // Function to handle changes in the editor content
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    setutilisedWLPer(getPercentWordLimitCompleted(newEditorState, isShowingFollowup))
  };
  

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editorRef = React.useRef(null);
  const progressBarStyle = {
    height: 10, // Adjust the height to make the progress bar thicker
  };

  const progressContainerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 9999, // Adjust the z-index if needed
  };

  useEffect(() => {
    // Call the API to get the current question when the component loads
    getCurrentQuestion()
      .then(response => {
        // Update the state with the current question
        setCurrQuestion(response.question);
        setCurrPrompt((response.prompt))

        setIsShowingFollowup(false);
      })
      .catch(error => {
        console.error('Error fetching current question:', error);
      });
  }, []);

  return (
    <div>
      <ResponsiveAppBar userData={userData} />
      <div style={progressContainerStyle}>
        <LinearProgress
          variant="determinate"
          value={utilisedWLPer} // Adjust the value based on the progress
          style={progressBarStyle}
        />
      </div>

      <Card>
        <CardContent style={{
          height: '7vh'
        }}>
          <Typography variant="h5" gutterBottom>{currQuestion}</Typography>
        </CardContent>
      </Card>
      <Grid container style={{ height: '80vh' }}>
        <Grid item xs={12} md={6} style={{ margin: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.4)' }}>
          <div style={{ minHeight: '50vh', cursor: 'text' }} onClick={focusEditor}>
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={handleEditorChange}
              placeholder={placeHolderText}
            />
          </div>
        </Grid>

        {/* <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <Box
            sx={{
              minHeight: '50vh',
              width: '100vw',
              backgroundColor: '#EAF0FF',
              border: '1px dotted blue',
              borderRadius: '8px',
              padding: '6px'
            }}
          >
            <Typography variant="body2">{currPrompt}</Typography>
          </Box>
        </Grid> */}
         <PromptRichTextEditor content={currPrompt} />

        <Grid item xs={12} md={1} style={{ display: 'flex', justifyContent: 'center', padding: '16px' }} sx={{
          minHeight: '50vh',
          width: '100vw',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '16px',
          padding: '32px',
        }}>
          <Box>
  <div>
    
    {isLoading? <FacebookCircularProgress/> :<div>
    {!isShowingFollowup ? (
      <>
        <Button variant="contained" onClick={() => takeAutoBiofyAction(editorState, setEditorState, setCurrPrompt, setIsShowingFollowup, isShowingFollowup, setLoading, answerGivenByUser, setanswerGivenByUser, currQuestion, currPrompt, autobioid, setCurrQuestion)} color="primary" sx={{ width: '100%' }}>
          AutoBiofy
        </Button>
        <Button variant="contained" onClick={() => getoNextQuestionHelper(setCurrQuestion, setCurrPrompt, setIsShowingFollowup, isShowingFollowup, setLoading)} color="inherit" sx={{ width: '100%', marginTop: '16px' }}>Next Question</Button>
        <Button variant="contained" onClick={openModal}  color="inherit" sx={{ width: '100%', marginTop: '16px' }}>Sneak Peek</Button>
        <SneekPeekModal isOpen={isModalOpen} handleClose={closeModal} autobioid={autobioid} />
      </>
    ) : (
      <>
        <Button variant="contained" onClick={() => takeAutoBiofyAction(editorState, setEditorState, setCurrPrompt, setIsShowingFollowup, isShowingFollowup, setLoading, answerGivenByUser, setanswerGivenByUser, currQuestion, currPrompt, autobioid, setCurrQuestion)} color="primary" sx={{ width: '100%' }}>
          Submit and Goto Next Question
        </Button>
      </>
    )}
    </div>}
    {/* <Typography sx={{ width: '100%', marginTop: '16px', textAlign: 'center' }}>45/2000</Typography> */}
  </div>
</Box>

        </Grid>
      </Grid>
    </div>
  );
};

export default MainEditor;
