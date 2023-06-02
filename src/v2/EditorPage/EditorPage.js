import { useLocation } from 'react-router-dom';
import { json } from 'react-router-dom';
import './EditorPage.css'
import Navbar from '../CommonComponents/Navbar';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useState, useEffect, useRef } from 'react';
import { margin } from '@mui/system';


const EditorPage = () => {
    const { state } = useLocation();
    const editorRef = React.useRef(null);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const focusEditor = () => {
        editorRef.current.focus();
    };

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    debugger;
    return (
        <div className='editor-screen'>
            <Navbar />
            <div className='questionArea'>

                What did you do in your childhood
                What did you do in your childhood
                What did you do in your childhood
                What did you do in your childhood
                What did you do in your childhood
                What did you do in your childhood
            </div>
            <div className='editorContainer'>
                <div className='typingArea'>
                    <div className='typingDraft'
                        style={{
                            height: '95%',
                            backgroundColor: '#EAF0FF',
                            border: '1px dotted blue',
                            borderRadius: '8px',
                            padding: '6px',
                            margin: '6px'
                        }}
                    >
                        <Editor ref={editorRef}
              editorState={editorState}
              onChange={handleEditorChange}
              placeholder="bhb" />
                    </div>
                </div>
                <div className='infoArea'>
                    <div className='photoArea'>
                        <img className="PuzzlePhoto" src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*a4u2BjAjsitKkdzc_gQdtg.jpeg"/>
                        <ImagePixelData />    
                    </div>
                    <div className='buttonsContainer'></div>
                </div>

            </div></div>
    )
}




function ImagePixelData() {
    const imageRef = useRef(null);
  
    useEffect(() => {
      const image = new Image();
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
  
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
  
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        // Access pixel data and perform operations
        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i];
          const green = pixels[i + 1];
          const blue = pixels[i + 2];
          const alpha = pixels[i + 3];
  
          // Perform operations with the pixel data
          console.log(`Pixel at index ${i / 4}: R=${red}, G=${green}, B=${blue}, A=${alpha}`);
        }
      };
  
      // Replace 'https://www.autobiobackend.com/image' with the actual image URL
      image.src = 'https://www.autobiobackend.com/image';
    }, []);
  
    return <img ref={imageRef} style={{ display: 'none' }} />;
  }
  








export default EditorPage;