import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export function AppProvider({children}){
  const [state, setState] = useState({});
  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  );
}
