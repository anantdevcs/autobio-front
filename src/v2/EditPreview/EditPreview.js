import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { backendUrl } from '../urlResolver';
import Editor from './BioEditor';
import './EditPreview.css'

import Navbar from '../CommonComponents/Navbar';
import Dropdown from './Dropdown';
const EditPreview = () => {
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const [allText, setAllData] = useState([]);
  const navigator = useNavigate();
  const [convertedText, setConvertedText] = useState('Some default content');
  const [allChapters, SetAllChapters] = useState([]);
  const [currentChap, SetCurrentChap] = useState('');

  useEffect(() => {
    const fetchAutobioPreview = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem('email');
        const usercreds = JSON.parse(localStorage.getItem('usercreds'));
        const response = await fetch(backendUrl + '/getEditPreviewData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tokenId: usercreds, email: email, autobioid: state.autobioid }),
        });
        const jsonData = await response.json();
        if (response.status === 401) {
          navigator('/');
        }
        setAllData(jsonData['chapters']);
        SetAllChapters(jsonData['chapters'].map(item => item.title));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAutobioPreview();
  }, []);

  const setHtmlValue = (value) => {
    setConvertedText(value);
  }

  const getEditorText = () => {
    let chapText = ''
    for (let x of allText) {
        if (x['title'] === currentChap) {
            chapText = x['chapter_text']
            return chapText
        }
    }

  }

  return (
    <div>
      <div className="home-screen">
        <Navbar />
        <div className="mainEditprevCont">
          <div className="editor-container">
            <Editor placeholder={"Select a chapter "} setHtmlValue={setHtmlValue} editorText = {getEditorText()} />
          </div>
          <div className="chapterChooser">
            <Dropdown allChapters = {allChapters} SetCurrentChap = {SetCurrentChap}/>
          </div>
        </div>
        {/* {convertedText} */}
        {/* {allChapters.map(item => item)} */}
        {currentChap}
      </div>
    </div>
  );
};

export default EditPreview;
