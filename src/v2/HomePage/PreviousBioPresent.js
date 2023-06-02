import './PreviousBioPresent.css'
import { useNavigate } from 'react-router-dom';
import { json } from 'react-router-dom';

export default function PreviousBioPresent(props){
   const navigator = useNavigate();
   const resumePreviousBio = (configured, autobioid2) => {
    debugger;
    if (!configured)
    {
      debugger;
      navigator('/configure',  { state: { autobioid: props.biodata.autobioid }})
    }
    else 
    navigator('/editor',  { state: { autobioid: props.biodata.autobioid} })
   } 

    return (
      <div class="PrevCardContainer">
        <a class="PrevCardContainerHeader" onClick={()=>resumePreviousBio(props.biodata.isConfigured, props.biodata.autobioid)}>Resume Previous Bio</a>
        <p class="prevQuestion"><b>Prev question</b> {props.biodata.previous_question === ''? 'Not started' : props.biodata.previous_question}</p>
        <div class="createNewBioContainer">
  <p class='createNewBioText'>Create New Bio</p>
  <p class='createNewBioText'>View Inprogress Bios</p>
</div>

      </div>
    );
  };
  