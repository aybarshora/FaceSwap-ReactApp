import React, { useState, useEffect } from 'react';

function FakeLoadingImage({ imageUrl }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 10000); 

    return () => {
      clearTimeout(loadingTimeout); 
    };
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <img
        src={imageUrl}
        alt="Image"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default FakeLoadingImage;
