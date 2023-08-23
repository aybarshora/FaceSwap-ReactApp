import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import './Profile.css'
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
      <h2 className="text-main">
      Убедитесь, что ваше лицо хорошо видно:
      </h2>
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
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture('')
            }}
            className="button"
          >
            Переснять
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn"
          >
            Снять
          </button>
        )}
      </div>
    </div>
    </div>
  )
}
export default Profile