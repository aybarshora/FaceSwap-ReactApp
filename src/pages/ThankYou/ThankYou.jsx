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
            <h2  className="heading"  >Спасибо!</h2>
            <FakeLoadingImage className="loading-image" alt="Loading Image"/>
            <p>Ваше фото будет отправлено на вашу электронную почту.</p>
             <button onClick={handleStartOver} className="start-over-button" >Начать заново</button>
          </div>
        </div>
 
    </div>
  );
}

export default ThankYou;
