import React, { useState } from 'react';
import FakeLoadingImage from '../../components/LoadingImage/FakeLoadingImage';
import './ThankYou.css'

const ThankYou = () => {

    const handleStartOver = () => {
      window.history.back();
      window.history.back();
      };
      
  return (
    <div>  
        <div className="outer-container">
          <div className="inner-container">
            <h2  className="heading"  >Thank You!</h2>
            <FakeLoadingImage className="loading-image" alt="Loading Image"/>
            <p>Your photo will be sent to your email</p>
             <button onClick={handleStartOver} className="start-over-button" >Start Over</button>
          </div>
        </div>
 
    </div>
  );
}

export default ThankYou;
