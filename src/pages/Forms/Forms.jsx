import React, {useState } from "react";
import axios from 'axios';
import Popup from '../../components/Popup/Popup';
import Profile from '../../components/Webcam/Profile';
import '../Main/Main.css'
import { useNavigate } from 'react-router-dom';
import person from '../Main/person.png';
import './Forms.css'
import { useGlobalContext } from '../../components/GlobalVariable/GlobalProvider';


const Forms = () => {

    const navigate = useNavigate();
    const { globalVariable, setGlobalVariable } = useGlobalContext();


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
  
    const [formErrors, setFormErrors] = useState({
      name: '',
      email: '',
      sex: '',
      yourImage: ''
    });
  
    const handleValidation = () => {
      const { name, email, sex, yourImage } = formData;
      let isValid = true;
      const errors = {};
      
      if(!yourImage){
        errors.yourImage = "Вам нужно отправить изображение.";
        isValid = false;
    
      }
  
      if (!name) {
        errors.name = 'Поле имени не может быть пустым.';
        isValid = false;
      }
  
      if (!email) {
        errors.email = 'Поле почта не может быть пустым.';
        isValid = false;
      } else if (!isValidEmail(email)) {
        errors.email = 'Пожалуйста, введите корректный адрес электронной почты.';
        isValid = false;
      }
  
      if(!sex){
        errors.sex = 'Поле представления не может быть пустым.';
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
  
      const { name, sex, yourImage, email } = formData;
  
      const formDataToSend = new FormData();
      formDataToSend.append('id', null);
      formDataToSend.append('name', name);
      formDataToSend.append('sex', sex);
      formDataToSend.append('your_image', yourImage);
      formDataToSend.append('email', email);
  
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
        setGlobalVariable(idOfPhoto);

        console.log('idOFPhoto ' + idOfPhoto);
        console.log('starting put req')
        axios({
          method: "put",
          url: `https://batyr-swap.duckdns.org/api/generate-random-image/${idOfPhoto}`,
        })
          .then((res) => {  
            console.log("put res " + res.statusText);
          })
          console.log('end put req')
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
          console.log('Error:', error);
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
      
      <div className="lower-section">
        <Profile className="profile-div" sendDataToParent={handleReceiveData} showPopup={showPopup} />
       <div className="block-div">
       <h2 className="text-h2">Ваше фото:</h2>
          {formData.yourImage ? (
            <div >
              <img src={formData.imageForView} alt="Photo" id="upload-photo" className="img-after" />
              <label className="btn-photo">
                Выбрать фото с устройства<input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleChange} /> </label>
            </div>
          ) : (
            <div className="block-div">
              <img src={person} alt="Photo" id="upload-photo" />
              <label className="btn-photo" >
              Выбрать фото с устройства  <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleChange} />
              </label>
            </div>
            
          )}</div>
           <span className="error-message">{formErrors.yourImage}</span>
        </div>

        {/* Form Section */}
        <div className="gender">
        <label>
        Я хочу быть представлен(а) как:  
          <div className="button-container">
            <button
              onClick={() => handleOptionChange(1)}
              className={formData.sex === 1 ? 'active' : ''}
            >
              Мужчина
            </button>
            <button
              onClick={() => handleOptionChange(2)}
              className={formData.sex === 2 ? 'active' : ''}
            >
              Женщина
            </button>
            <button
              onClick={() => handleOptionChange(3)}
              className={formData.sex === 3 ? 'active' : ''}
            >
              Мальчик
            </button>
            <button
              onClick={() => handleOptionChange(4)}
              className={formData.sex === 4 ? 'active' : ''}
            >
              Девочка
            </button>
            
          </div>
         
        </label>
        <span className="error-message">{formErrors.sex}</span>
        </div>

        <div className="form-container">
  <form onSubmit={handleSubmit} className='form-section' encType="multipart/form-data">
    <div className="form-group">
      <label htmlFor="name">Имя*</label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <span className="error-message">{formErrors.name}</span>
       
    </div>
    <div className="form-group">
      <label htmlFor="email">Почта*</label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
       <span className="error-message">{formErrors.email}</span>
    </div>
    <button type="submit" className='submit-button'>
    Отправить
    </button>
  </form>


      </div>
      <div/>
    </div>
 
  );
}

export default Forms;
