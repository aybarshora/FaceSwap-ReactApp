import React, { useState } from 'react';
import './Popup.css';

function Popup() {
 

  const handleStartOver = () => {
    window.location.reload();

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
