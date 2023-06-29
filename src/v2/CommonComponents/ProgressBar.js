import React from 'react';
import './ProgressBar.css'
const ProgressBar = ({ percent }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="progress-bar">
      <svg className="progress-bar__svg" width="60" height="60">
        <circle
          className="progress-bar__background"
          cx="30"
          cy="30"
          r={radius}
        />
        <circle
          className="progress-bar__fill"
          cx="30"
          cy="30"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          className="progress-bar__text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;
