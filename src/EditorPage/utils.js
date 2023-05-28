import {backendUrl} from '../urlResolver';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

export async function getoNextQuestionHelper(setText, setCurrPrompt, setIsShowingFollowup, isShowingFollowup, setLoading) {
    setText("clicked!")
    setLoading(true);
    const email = localStorage.getItem('email');
    const res = await fetch(backendUrl + '/getQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'email': email }),
      });
      if (res.ok) {
        const data = await res.json();
        const {question, prompt  } = data;
        setText(question)
        setCurrPrompt((prompt))
        setIsShowingFollowup(false);
        setLoading(false);
        return question;

      } else {
        setLoading(false);
        return 'InvalidLogin'
      }
}

export async function takeAutoBiofyAction(editorState, setEditorState, setCurrPrompt, setIsShowingFollowup, isShowingFollowup, setLoading, answerGivenByUser, setanswerGivenByUser, currQuestion, currPrompt, autobioid, setText) {
    setLoading(true);
    
    const email = localStorage.getItem('email');
    if (isShowingFollowup) {
        const prompt_ans_user = editorState.getCurrentContent().getPlainText();
        const res = await fetch(backendUrl + '/addThisUserAnswerResponseToDB', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },  
            body: JSON.stringify({'email': email, 'answer':answerGivenByUser, 'prompt_ans_user':prompt_ans_user, 'question': currQuestion, 'autobioid':autobioid }),
          });
          if (res.ok) {
            const data = await res.json();
            const { followup  } = data;
            setCurrPrompt(followup);
            setEditorToShowNothing(editorState, setEditorState);
            setLoading(false);
            getoNextQuestionHelper(setText, setCurrPrompt, setIsShowingFollowup, isShowingFollowup, setLoading)
    
          } else {
            setLoading(false);
            return 'InvalidLogin'
          }
        setIsShowingFollowup(false);
        return;
    }
    debugger;
    
    const user_answer = editorState.getCurrentContent().getPlainText();
    setanswerGivenByUser(user_answer);
    
    setIsShowingFollowup(!isShowingFollowup);
    const res = await fetch(backendUrl + '/getFollowup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({'email': email, 'user_answer':user_answer }),
      });
      if (res.ok) {
        const data = await res.json();
        const { followup  } = data;
        setCurrPrompt(followup);
        setEditorToShowNothing(editorState, setEditorState);
        setLoading(false);

      } else {
        setLoading(false)
        return 'InvalidLogin'
      }
}
function setEditorToShowNothing(editorState, setEditorState) {
    const newText = 'Answer some followup questions'
    const contentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: newText,
            key: 'text',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
          },
        ],
      });
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
}
export async function getCurrentQuestion() {
    const email = localStorage.getItem('email');
    const res = await fetch(backendUrl + '/getCurrentQuestionWithoutincr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'email': email }),
      });
      if (res.ok) {
        const data = await res.json();
        
        
        return data;

      } else {
        return 'InvalidLogin'
      }
}

export function getPercentWordLimitCompleted(editorState, isShowingFollowup) {
    const plainText = editorState.getCurrentContent().getPlainText('');
    const length =  plainText.length;
    const expectedWL = isShowingFollowup ? 300 : 1000;
    return length/expectedWL*100
}

export function addNewLineAfterFullStop(text) {
    return text.replace(/\./g, '.\n');
  }


export function testWrite() {
    const url = 'https://www.autobiobackend.com/startOrGetSnearPeekOrFullBioWrite'; // Replace with your API URL

// Sample data
const data = {
  email: 'anantdeviitism@gmail.com',
  autobioid: 'f29805d6-28c8-4cc2-a5a3-497689d94eae'
};
debugger;
// Send POST request
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.statusText);
    }
  })
  .then(result => {
    console.log('API response:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}