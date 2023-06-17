import { useLocation } from 'react-router-dom';
import { json } from 'react-router-dom';
import './EditorPage.css'
import Navbar from '../CommonComponents/Navbar';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useState, useEffect, useRef } from 'react';
import { margin } from '@mui/system';
import { backendUrl } from '../urlResolver';
import Spinner from '../CommonComponents/Spinner';
import { useNavigate } from 'react-router-dom';
import EditPreview from '../EditPreview/EditPreview';

const EditorPage = () => {
    const navigator = useNavigate();
    const { state } = useLocation();
    const editorRef = React.useRef(null);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [question, SetQuestion] = useState('');
    const [isLoading, SetLoading] = useState(false);
    const [questionBefore, SetQuestionBefore] = useState(-1);
    const focusEditor = () => {
        editorRef.current.focus();
    };
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const startNewBio = async () => {
        try {
            SetLoading(true);
            const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const response = await fetch(backendUrl + '/askQuestion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, autobioid: state.autobioid }),
                });
                const jsonData = await response.json();
                if (response.status === 401) {

                    navigator('/');

                }
                SetLoading(false);
                SetQuestion(jsonData['question'])

            
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }

    }

    const acceptAnswer  = async () => {
        try {
            SetLoading(true);
            const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const prompt_ans_user = editorState.getCurrentContent().getPlainText();
                const response = await fetch(backendUrl + '/acceptAnswer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, autobioid: state.autobioid, answer: prompt_ans_user, question:question }),
                });
                const jsonData = await response.json();
                if (response.status === 401) {

                    navigator('/');

                }
                SetLoading(false);
                // SetQuestion(jsonData['question'])
                await startNewBio();
                SetQuestionBefore(questionBefore - 1);

            
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }

    }
    
    const getAllInfoForThisAutobio = async () => {
        // questinons left, writing state

        try {
            const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const prompt_ans_user = editorState.getCurrentContent().getPlainText();
                const response = await fetch(backendUrl + '/getEditorDisplayInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, autobioid: state.autobioid, answer: prompt_ans_user, question:question }),
                });
                const jsonData = await response.json();
                if (response.status === 401) {

                    navigator('/');

                }
                SetQuestionBefore(jsonData['questionsBeforePreviousSneakPeak']);

                
            
        } catch (error) {
            
            console.error('Error fetching data:', error);
        }


    }

    const triggerWrite = async() => {
        try {
            const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const prompt_ans_user = editorState.getCurrentContent().getPlainText();
                const response = await fetch(backendUrl + '/triggerWrite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, autobioid: state.autobioid, answer: prompt_ans_user, question:question }),
                });
                const jsonData = await response.json();
                debugger;
                if (response.status === 401) {

                    navigator('/');

                }

                
            
        } catch (error) {
            debugger;
            console.error('Error fetching data:', error);
        }

    }

    const showDrafts = async() => {
        try {
            const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const response = await fetch(backendUrl + '/getDraftsStatus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, autobioid: state.autobioid }),
                });
                const jsonData = await response.json();
                if (response.status === 401) {
                    navigator('/');
                }
                debugger;
                if (jsonData['status'] === 'machineWriting') {

                } else if (jsonData['status'] === 'editPreview') {
                        navigator('/editPreview', { state: { autobioid: state.autobioid }});

                } else if (jsonData['status'] === 'completed') {

                }

                
            
        } catch (error) {
            debugger;
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                SetLoading(true);
                const email = localStorage.getItem("email");
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const response = await fetch(backendUrl + '/askQuestion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, autobioid: state.autobioid }),
                });
                const jsonData = await response.json();
                if (response.status === 401) {

                    navigator('/');

                }

                SetQuestion(jsonData['question']);
                SetLoading(false);
                await getAllInfoForThisAutobio();
            } catch (error) {

                console.error('Error fetching data:', error);
            }
        };

        fetchQuestion();
    }, []);


 
   

    return (
        <div className='editor-screen'>
            <Navbar />
            <div className='questionArea'>
{isLoading ?  <Spinner /> :  question }
               
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
                        {/* <img className="PuzzlePhoto" src="https://i0.wp.com/blog.openart.ai/wp-content/uploads/2023/01/42B6F5C9-8E0D-4B1A-9CD4-2FA9C96C00A4.jpg?resize=400%2C400&ssl=1" /> */}
                        {/* <ImagePixelData />     */}
                    </div>
                    <div className='buttonsContainer'>
                        <div className='buttonFakeContaainer'>                   
                         <button className='stdbutton  editorActionButton' onClick={startNewBio} >Skip Question</button>
                        </div>
                        <div className='buttonFakeContaainer'>                   
                         <button className='stdbutton  editorActionButton' onClick={acceptAnswer} >Submit Answer</button>
                        </div>
                        <div className='buttonFakeContaainer'>                   
                         <button className='stdbutton  editorActionButton' onClick={triggerWrite} >Write new draft
                         <div className='announce'>Next draft available after {questionBefore} answers</div>
                         </button>
                        </div>
                        <div className='buttonFakeContaainer'>                   
                         <button className='stdbutton  editorActionButton' onClick={showDrafts} >See Completed Drafts</button>
                        </div>
                   
                        
                        
                    </div>
                </div>


            </div></div>
    )
}














export default EditorPage;