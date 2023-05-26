import {backendUrl} from '../urlResolver';

export async function getoNextQuestionHelper(setText, setCurrPrompt) {
    setText("clicked!")
    const email = localStorage.getItem('email');
    debugger;
    const res = await fetch(backendUrl + '/getQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'email': email }),
      });
      debugger;
      if (res.ok) {
        const data = await res.json();
        const {question, prompt  } = data;
        setText(question)
        setCurrPrompt(prompt)
        return question;

      } else {
        return 'InvalidLogin'
      }
}