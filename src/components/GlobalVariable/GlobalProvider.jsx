import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState('');

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
