import React, { createContext, useState } from 'react';


// Create a context with the default value
const NightContext = createContext<{ isNight: boolean, setIsNight: any }>({ isNight: false, setIsNight: '' });


function NightProvider({ children }: any) {
  const [isNight, setIsNight] = useState<boolean>(false);

  return (
    <NightContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </NightContext.Provider>
  );
}



export { NightContext, NightProvider };
