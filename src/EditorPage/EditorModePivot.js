import { useLocation } from 'react-router-dom';


const EditorModePivot = () => {
    const {state} = useLocation();
const { autobioid } = state;
return <div>
    working on 
    {autobioid}
</div>
}

export default EditorModePivot;