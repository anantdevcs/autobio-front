const ProgressBar = ({ progress }) => {
    const progressBarStyle = {
      width: `${progress}%`,
      height: '10px',
      backgroundColor: 'blue',
    };
  
    return <div className="progress-bar" style={progressBarStyle}></div>;
  };

  export default ProgressBar;