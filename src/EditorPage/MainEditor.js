import React, { useState } from 'react';
import { Typography, Box, Grid, TextField, Card, Button, LinearProgress } from '@mui/material';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { loadLoggedInUserIfAny } from '../HomeScreen/utils';
import ResponsiveAppBar from '../HomeScreen/Appbar';
import { CardContent } from '@mui/material';


const MainEditor = () => {
    const userData = loadLoggedInUserIfAny();

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const focusEditor = () => {
        editorRef.current.focus();
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
    return (
        <div>

            <ResponsiveAppBar userData={userData} />
            <div style={progressContainerStyle}>
                <LinearProgress
                    variant="determinate"
                    value={50} // Adjust the value based on the progress
                    style={progressBarStyle}
                />
            </div>

            <Card>
                <CardContent style={{
                    height: '7vh'
                }}>
                    {/* Card content here */}
                    <Typography variant="h5" gutterBottom>Question here</Typography>

                </CardContent>

            </Card>
            <Grid container style={{ height: '80vh' }}>

                <Grid item xs={12} md={6} style={{ margin: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.4)' }}>
                    {/* <Typography variant="h5">Text Editor</Typography> */}
                    <div style={{ minHeight: '50vh', cursor: 'text' }} onClick={focusEditor}>
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="Write something!"
                        />
                    </div>
                </Grid>



                <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                    <Box
                        sx={{
                            minHeight: '50vh',
                            width: '100vw',
                            backgroundColor: '#EAF0FF', // Light blueish background
                            border: '1px dotted blue', // Blue dotted border
                            borderRadius: '8px', // Rounded corners
                            padding: '6px'
                        }}
                    >
                        <Typography>hahahah{text}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={1} style={{ display: 'flex', justifyContent: 'center', padding: '16px' }} sx={{
                    minHeight: '50vh',
                    width: '100vw',

                    borderRadius: '8px', // Rounded corners
                    display: 'flex', // Center align content vertically
                    alignItems: 'center', // Center align content vertically
                    flexDirection: 'column', // Arrange items in a column
                    gap: '16px', // Add spacing between items
                    padding: '32px', // Add padding to the box
                }}>
                    <Box

                    >
                        <div>
                            <Button variant="contained" color="primary" sx={{ width: '100%' }}>AutoBiofy</Button>
                            <Button variant="contained" color="inherit" sx={{ width: '100%', marginTop: '16px' }}>Next Question</Button>
                            <Typography sx={{ width: '100%', marginTop: '16px', textAlign: 'center' }}>45/2000</Typography>
                        </div>
                    </Box>
                </Grid>
            </Grid>

        </div>

    );
};

export default MainEditor;
