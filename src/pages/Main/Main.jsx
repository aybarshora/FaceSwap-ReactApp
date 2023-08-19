import React, {useState } from "react";
import Popup from '../../components/Popup/Popup';
import example from './example.png';
import './Main.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  
  const navigate = useNavigate();

  const startButton =() =>{
    navigate('/form');
  }

  return (
    <div>
    
      
      <div className="main-container">
        {/* Upper Section */}
        <div className="upper-section">
          <div className="left-side">
            <h1>Turn yourself into a real hero!</h1>
            <p>A fun project that uses AI to make you into a hero.</p>
          </div>
          <div className="right-side">
            <img src={example} alt="Hero Image" />
          </div>
        </div>
        <div className="start-button-con" >
        <button onClick={startButton} className='start-button'>Start</button>
        </div>
        </div>
    </div>
  );
};

export default Main;
