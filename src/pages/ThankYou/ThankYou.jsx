import React, { useState } from 'react';
import FakeLoadingImage from '../../components/LoadingImage/FakeLoadingImage';

const ThankYou = () => {

    const handleStartOver = () => {
      window.history.back();
      window.history.back();
      };
      
  return (
    <div>  
        <div className="">
          <div className="">
            <h2>Thank You!</h2>
            <FakeLoadingImage  />
            <p>Your photo is being prepared</p>
            <p>Your photo will be sent to your email</p>
             <button onClick={handleStartOver}>Start Over</button>
          </div>
        </div>
 
    </div>
  );
}

export default ThankYou;
