import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import './Profile.css'
import { logging } from "../../services/loggingService";
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: 'user',
}
const Profile = (props ) => {
  const [picture, setPicture] = useState('');
  const webcamRef = React.useRef(null);
  useEffect(() =>{
    setPicture('');
  }, [props.showPopup])
  
  const reload = () => {
    setPicture('');
  }
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc);
    props.sendDataToParent(pictureSrc);
  })
  return (
    <div>
    <div className='body-of-profile'>
    <div className="text-main">Смотрите прямо в камеру, без очков или других аксессуаров для глаз:    </div>
      <div className="item" >
        {picture === '' ? (
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            width={300}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className='webcam'
          />
        ) : (
          <div className='ready-con'>
          <img src={picture} className='webcam-ready'/>
          </div>
        )}
      </div>
      <div className="item">
        {picture !== '' ? (
          <div>
            <div className='text-profile'>Переснять фото:</div>
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture('')
            }}
          >
             <img width="25" height="25" src="https://img.icons8.com/ios/50/camera--v3.png" alt="camera--v3"/>
          </button>
          </div>
        ) : (
          <div>
             <div className='text-profile'>Сделать фото:</div>
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}  
          >
            <img width="25" height="25" src="https://img.icons8.com/ios/50/camera--v3.png" alt="camera--v3"/>
          </button>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
export default Profile