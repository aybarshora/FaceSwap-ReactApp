import React, {useState } from "react";
import axios from 'axios';
import Popup from '../../components/Popup/Popup';
import Profile from '../../components/Webcam/Profile';
import example from './example.png';
import person from './person.png';
import './Main.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    sex: null,
    yourImage: '',
    chosenImage: null,
    email: '',
    telegramTag: '',
    imageForView: null,
  });

  const initialFormData = {
    name: '',
    sex: null,
    yourImage: '',
    chosenImage: null,
    email: '',
    telegramTag: '',
    imageForView: null,
  };

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

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    sex: '',
    telegramTag: '',
    yourImage: ''
  });

  const handleValidation = () => {
    const { name, email, sex, telegramTag, yourImage } = formData;
    let isValid = true;
    const errors = {};
    
    if(!yourImage){
      errors.yourImage = "You have to submit an image";
      isValid = false;
  
    }

    if (!name) {
      errors.name = 'Name field cannot be empty';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Email field cannot be empty';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if(!sex){
      errors.sex = 'Representation field cannot be empty';
      isValid = false;
    }

    if(!telegramTag){
      errors.telegramTag ='Telegram Tag field cannot be empty';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    const validationReturn = handleValidation();

    if(validationReturn){
      
      navigate("/thank-you");
       
      console.log(`handleValitation: ${handleValidation()}`);

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
        url: 'https://batyr-swap.duckdns.org/api/faces',
        data: formDataToSend,
        headers: {
          "content-type": `multipart/form-data; boundary=${formDataToSend._boundary}`,
        },
      });

      const idOfPhoto = response.data.data.id;
      console.log(idOfPhoto);
      axios({
        method: "put",
        url: `https://batyr-swap.duckdns.org/api/generate-random-image/${idOfPhoto}`,
      })
        .then((res) => {
          console.log(res.statusText);
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.error('Error:', error);
    }
    
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

  const resetFormData = () => {
    setFormData(initialFormData);
    setShowPopup(false);
  };

  return (
    <div>
    
      {showPopup && <Popup  resetFormData={resetFormData} />}
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
        <Profile sendDataToParent={handleReceiveData} showPopup={showPopup} />
        <h2 className="text-h2">Your image:</h2>
          {formData.yourImage ? (
            <div>
           
              <img src={formData.imageForView} alt="Photo" id="upload-photo" />
              <label className="btn-photo">
                Chose another photo from device<input type="file" onChange={handleChange} /> </label>
             
            </div>
          ) : (
            <div>
              <img src={person} alt="Photo" id="upload-photo" />
              <label className="btn-photo" >
                Chose photo from device <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleChange} />
              </label>
            </div>
            
          )}
           <span className="error-message">{formErrors.yourImage}</span>
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
        <span className="error-message">{formErrors.sex}</span>
        </div>

        <div className="form-container">
  <form onSubmit={handleSubmit} className='form-section' encType="multipart/form-data">
    <div className="form-group">
      <label htmlFor="name">Name*</label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <span className="error-message">{formErrors.name}</span>
       
    </div>
    <div className="form-group">
      <label htmlFor="email">Email*</label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
       <span className="error-message">{formErrors.email}</span>
    </div>
    <div className="form-group">
      <label htmlFor="telegramTag">Telegram Tag*</label>
      <input
        type="text"
        id="telegramTag"
        value={formData.telegramTag}
        onChange={(e) => setFormData({ ...formData, telegramTag: e.target.value })}
      />
       <span className="error-message">{formErrors.telegramTag}</span>
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
