import React, { createContext, useState } from 'react';


const CoinContext = createContext<{ coin: number, setCoin: any }>({ coin: 0, setCoin: '' });


function CoinProvider({ children }: any) {
  const [coin, setCoin] = useState<number>(0);

  return (
    <CoinContext.Provider value={{ coin, setCoin }}>
      {children}
    </CoinContext.Provider>
  );
}



export { CoinContext, CoinProvider };
