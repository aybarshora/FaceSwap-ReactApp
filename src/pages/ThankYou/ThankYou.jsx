import React, { useState } from 'react';
import FakeLoadingImage from '../../components/LoadingImage/FakeLoadingImage';

const ThankYou = () => {

    const handleStartOver = () => {
        window.history.back();
      };

      const imageUrl = "https://batyr-swap.duckdns.org/media/images/processed_img1.jpg";
      

  return (
    <div>  
        <div className="">
          <div className="">
            <h2>Спасибо большое!</h2>
            {/* <FakeLoadingImage imageUrl={imageUrl} /> */}
            {/* <p>Your photo is being prepared</p> */}
            <p>Ваша фотография была отправлена на вашу почту</p>
             <button onClick={handleStartOver}>Начать заново</button>
          </div>
        </div>
 
    </div>
  );
}

export default ThankYou;
