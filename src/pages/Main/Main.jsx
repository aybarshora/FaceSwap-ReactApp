import './Main.css';
import example from './example.png';
import React, { useEffect, useState } from "react";
import person from './person.png';
import batyr from './eee1.png';
import axios from 'axios';
import  Popup  from '../../components/Popup/Popup';
import Profile from '../../components/Webcam/Profile'

function Main() {

  const [name, setName] = useState('');
  const [sex, setSex] = useState();
  const [yourImage, setYourImage] = useState('');
  const [chosenImage, setChosenImage] = useState(null);
  const [email, setEmail] = useState('');
  const [telegramTag, setTelegramTag] = useState('');
  const [imageForView, setImageForView] = useState(null)

  const [showPopup, setShowPopup] = useState(false);

  const handleOptionChange = (option) => {
    setSex(option);
  };

  async function fetchImageAsBlob(imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  }

  function blobToFile(blob, fileName) {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  const fileName = "batyyr.png"
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    setShowPopup(true)

    const formData = new FormData();
    formData.append('id', null);
    formData.append('name', name);
    formData.append('sex', sex);
    formData.append('your_image', yourImage);
    formData.append('email', email);
    formData.append('telegram_tag', telegramTag);

    let idOfPhoto;

    try{
    const response = await axios({
      method: "post",
      url: 'http://104.248.26.55:8000/api/faces',
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
    idOfPhoto = response.data.data.id; 

  } catch (error) {
    console.error('Error:', error);
  }

axios({
  method: "put",
  url: `http://104.248.26.55:8000/api/generate-random-image/${idOfPhoto}`,

})
  .then((res) => {
    this.info = res.statusText;
  })
  .catch((err) => console.log(err.response));
}

  const handleReceiveData = (data) => {
    
    fetchImageAsBlob(data)
    .then((blob) => {
      const file = blobToFile(blob, fileName);
      setYourImage(file);;
      setImageForView(URL.createObjectURL(file));
      setChosenImage(file)

    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };
 
   function handleChange(e) {
      console.log(e.target.files[0]);
      setImageForView(URL.createObjectURL(e.target.files[0]));
      setYourImage(e.target.files[0]);
   
  }

  return (
    <div>
   
   { showPopup && (<Popup />)}
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
    <Profile  sendDataToParent={handleReceiveData} />
    <div className="lower-section">
      
      {yourImage ? ( <div><img src={imageForView} alt="Photo" id="upload-photo" /> <label> Change photo <input type="file" onChange={handleChange} /> </label> </div> 
       ) : ( <div> <img src={person} alt="Photo" id="upload-photo" /> <label>Photo from device <input type="file" onChange={handleChange} /></label> </div>) }
    </div>  
  
    {/* Form Section */}

    <label>
        I want to be represented as:
        <div>
      <button
        onClick={() => handleOptionChange(1)}
        className={sex === 1 ? 'active' : ''}
      >
        Man
      </button>
      <button
        onClick={() => handleOptionChange(2)}
        className={sex === 2 ? 'active' : ''}
      >
        Woman
      </button>
      <button
        onClick={() => handleOptionChange(3)}
        className={sex === 3 ? 'active' : ''}
      >
        Boy
      </button>
      <button
        onClick={() => handleOptionChange(4)}
        className={sex === 4 ? 'active' : ''}
      >
        Girl
      </button>
     
    </div>
      </label>
    
    <form onSubmit={handleSubmit} className='form-section' encType="multipart/form-data">
     
   <label>
    Name:
   <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
   </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Telegram Tag:
        <input type="text" value={telegramTag} onChange={(e) => setTelegramTag(e.target.value)} />
      </label>
      <button className='submit-button'>
  Submit
</button>
    </form>
 </div>
 <div className="bottom"></div>
 </div>
 
  );

}

export default Main;
