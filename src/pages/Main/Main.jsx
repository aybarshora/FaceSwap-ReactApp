import React, { useEffect, useState } from "react";
import axios from 'axios';
import Popup from '../../components/Popup/Popup';
import Profile from '../../components/Webcam/Profile';
import example from './example.png';
import person from './person.png';
import './Main.css';

const Main = () => {
 
  const [formData, setFormData] = useState({
    name: '',
    sex: null,
    yourImage: '',
    chosenImage: null,
    email: '',
    telegramTag: '',
    imageForView: null,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleOptionChange = (option) => {

    setFormData({ ...formData, sex: option });
  };

  const fetchImageAsBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  };

  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
  };

  const fileName = "batyyr.png";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPopup(true);

    const { name, sex, yourImage, email, telegramTag } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('id', null);
    formDataToSend.append('name', name);
    formDataToSend.append('sex', sex);
    formDataToSend.append('your_image', yourImage);
    formDataToSend.append('email', email);
    formDataToSend.append('telegram_tag', telegramTag);

    try {
      const response = await axios({
        method: "post",
        url: 'http://104.248.26.55:8000/api/faces',
        data: formDataToSend,
        headers: {
          "content-type": `multipart/form-data; boundary=${formDataToSend._boundary}`,
        },
      });

      const idOfPhoto = response.data.data.id;
      console.log(idOfPhoto);
      axios({
        method: "put",
        url: `http://104.248.26.55:8000/api/generate-random-image/${idOfPhoto}`,
      })
        .then((res) => {
          console.log(res.statusText);
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReceiveData = (data) => {
    fetchImageAsBlob(data)
      .then((blob) => {
        const file = blobToFile(blob, fileName);
        setFormData({
          ...formData,
          yourImage: file,
          imageForView: URL.createObjectURL(file),
          chosenImage: file,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      imageForView: URL.createObjectURL(imageFile),
      yourImage: imageFile,
    });
  };

  return (
    <div>
      {showPopup && <Popup />}
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

        {/* Lower Section */}
        
        <div className="lower-section">
        <Profile sendDataToParent={handleReceiveData} />
          {formData.yourImage ? (
            <div>
              <img src={formData.imageForView} alt="Photo" id="upload-photo" />
              <label className="btn-photo">
                Chose another photo from device<input type="file" onChange={handleChange} />
              </label>
            </div>
          ) : (
            <div>
              <img src={person} alt="Photo" id="upload-photo" />
              <label className="btn-photo" >
                Chose photo from device <input type="file" onChange={handleChange} />
              </label>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="gender">
        <label>
          I want to be represented as:  
          <div className="button-container">
            <button
              onClick={() => handleOptionChange(1)}
              className={formData.sex === 1 ? 'active' : ''}
            >
              Man
            </button>
            <button
              onClick={() => handleOptionChange(2)}
              className={formData.sex === 2 ? 'active' : ''}
            >
              Woman
            </button>
            <button
              onClick={() => handleOptionChange(3)}
              className={formData.sex === 3 ? 'active' : ''}
            >
              Boy
            </button>
            <button
              onClick={() => handleOptionChange(4)}
              className={formData.sex === 4 ? 'active' : ''}
            >
              Girl
            </button>
          </div>
        </label>
        </div>

        <div className="form-container">
  <form onSubmit={handleSubmit} className='form-section' encType="multipart/form-data">
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label htmlFor="telegramTag">Telegram Tag:</label>
      <input
        type="text"
        id="telegramTag"
        value={formData.telegramTag}
        onChange={(e) => setFormData({ ...formData, telegramTag: e.target.value })}
      />
    </div>
    <button type="submit" className='submit-button'>
      Submit
    </button>
  </form>
</div>

      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Main;
