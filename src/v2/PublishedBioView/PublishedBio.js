import { useLocation } from 'react-router-dom';
import Navbar from '../CommonComponents/Navbar';
import { backendUrl } from '../urlResolver';


const PublishedBio = () => {
    const { state } = useLocation();
    const autobioid = state.autobioid;

    const pdfUrl = `${backendUrl}/download-pdf?autobioid=${autobioid}`;

    return (
        <div>
            <div className="home-screen">
                <Navbar />
                <h1>{state.autobioid}</h1>

                <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
            </div>
        </div>
    );
}

export default PublishedBio;
