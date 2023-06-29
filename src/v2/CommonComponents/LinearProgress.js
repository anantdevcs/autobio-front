import React from 'react';
import './LinearProgress.css'; // Import the CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const LinearProgress = ({ percent }) => {
    return (
        <div className="linear-progress-container">

            <ProgressBar now={percent} variant="dark" style={{ height: '3px', backgroundColor:'#EAF0FF' }} />
        </div>
    );
};

export default LinearProgress;
