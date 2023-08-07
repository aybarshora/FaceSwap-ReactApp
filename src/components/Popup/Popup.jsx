import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ resetFormData }) => {
 

  const handleStartOver = () => {
    window.location.reload();
    resetFormData();

  };

  return (
    <div>  
        <div className="popup">
          <div className="popup-content">
            <h2>Thank You!</h2>
            <p>Your photo will be sent to your email</p>
            <button onClick={handleStartOver}>Start Over</button>
          </div>
        </div>
 
    </div>
  );
}

export default Popup;
