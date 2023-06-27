import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { backendUrl } from '../urlResolver';
import Editor from './BioEditor';
import './EditPreview.css'


import Navbar from '../CommonComponents/Navbar';
import Dropdown from './Dropdown';
import { toast } from 'react-toastify';
const EditPreview = () => {
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const [allText, setAllData] = useState([]);
  const navigator = useNavigate();
  const [convertedText, setConvertedText] = useState('Some default content');
  const [allChapters, SetAllChapters] = useState([]);
  const [currentChap, SetCurrentChap] = useState('');

  const publish = async() => {
    try {
        const email = localStorage.getItem("email");
            const usercreds = JSON.parse(localStorage.getItem("usercreds"));
            const response = await fetch(backendUrl + '/publishAction', {
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
            if (jsonData['status'] === 'success') {
                navigator('/autobio',  { state: { autobioid: state.autobioid }})
            } else {
                alert("error")
            }
            

            
        
    } catch (error) {
        debugger;
        console.error('Error fetching data:', error);
    }

}

const savePrevieww = async() => {
  try {
    const email = localStorage.getItem('email');
    const usercreds = JSON.parse(localStorage.getItem('usercreds'));

    const response = await fetch(backendUrl + '/savePreviewAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenId: usercreds,
        email: email,
        autobioid: state.autobioid,
        chapterText: convertedText,
        currChap: currentChap
      }),
    });
    const jsonData = await response.json();
    if (response.status === 401) {
      navigator('/');
    }
    if (jsonData.status === 'done') {
      toast.success('Preview saved successfully!');
    } else {
      toast.error('Error saving preview');
    }
  } catch (error) {
    console.error('Error saving preview:', error);
  }
}


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
        <div className="chapterChooser">
            <Dropdown allChapters={allChapters} SetCurrentChap={SetCurrentChap} />
            <div className="actionButtons">
              <button className="stdbutton topbarbutton" onClick={publish}>Publish</button>
              <button className="stdbutton topbarbutton" onClick={savePrevieww}>Save</button>
            </div>
          </div>
          <div className="editor-container">
            <Editor placeholder={"Select a chapter "} setHtmlValue={setHtmlValue} editorText={getEditorText()} />
          </div>
          
        </div>
        {/* {convertedText} */}
        {/* {allChapters.map(item => item)} */}
      </div>
    </div>
  );
  
};

export default EditPreview;
