import React, { useState } from 'react'
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: 'user',
}
const Profile = ({ sendDataToParent }) => {
  const [picture, setPicture] = useState('');
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc);
    sendDataToParent(pictureSrc);
  })
  return (
    <div>
      <h2 className="mb-5 text-center">
        Make sure your face is clear 
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
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  )
}
export default Profile