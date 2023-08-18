import React, { useState, useEffect } from 'react';

function FakeLoadingImage({ imageUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');


  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
      setImageSrc(imageUrl);
    }, 10000); 

    return () => {
      clearTimeout(loadingTimeout); 
    };
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <img
        src={imageSrc}
        alt="Image"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default FakeLoadingImage;
