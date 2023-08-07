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
      <h2 className="text-main">
        Make sure your face is clearly seen:
      </h2>
      <div>
        {picture == '' ? (
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
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture('')
            }}
            className="btn"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  )
}
export default Profile