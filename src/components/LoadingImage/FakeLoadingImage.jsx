import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../components/GlobalVariable/GlobalProvider';

function FakeLoadingImage() {
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  const id = globalVariable; 
  console.log(id);

  async function fetchData() {
    const apiUrl = `https://batyr-swap.duckdns.org/api/faces/${id}`;
    console.log(id); 
  
    try {
      const response = await axios.get(apiUrl);
      let conv_image = response.data.data.converted_image;
      console.log('Response:' + conv_image);
      if(conv_image == undefined){
        delayedFetchData();
        setIsLoading(true);
      }else{
        setIsLoading(false);
        setImageSrc('https://batyr-swap.duckdns.org' + conv_image);
        conv_image = '';
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function delayedFetchData() {
    setTimeout( () => {
      fetchData();
    }, 10000);
  }

    fetchData();

  return (
    <div>
      {isLoading ? 
      (<div>Загрузка...
         <p>Ваше фото готовится</p>
      </div>):
       (<div>
        <img
        src={imageSrc}
        alt="Image"
        style={{ display: 'block' }}
      />
      </div>)}
    </div>
  );
}

export default FakeLoadingImage;
