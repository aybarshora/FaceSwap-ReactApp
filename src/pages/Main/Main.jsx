import React, {useState } from "react";
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
            <h1>Сделайте себя настоящим героем!</h1>
            <p>Забавный проект, использующий искусственный интеллект, чтобы превратить вас в героя. </p>
          </div>
          <div className="right-side">
            <img src={example} alt="Hero Image" />
          </div>
        </div>
        <div className="start-button-con" >
        <button onClick={startButton} className='start-button'>Начать</button>
        </div>
        </div>
    </div>
  );
};

export default Main;
