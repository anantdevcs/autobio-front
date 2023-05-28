import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { Editor, EditorState, ContentState } from 'draft-js';

const PromptRichTextEditor = ({ content }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    const setText = () => {
      const text = content; // The text you want to set
      const contentState = ContentState.createFromText(text);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    };

    setText();
  }, [content]);

  return (
    <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
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
        <Editor editorState={editorState} readOnly={true} />
      </Box>
    </Grid>
  );
};

export default PromptRichTextEditor;
