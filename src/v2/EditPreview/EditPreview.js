import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPreview = () => {
    const { state } = useLocation();


    return (
    <div>
            edit preview
            {state.autobioid}
    </div>
    )
}

export default EditPreview;