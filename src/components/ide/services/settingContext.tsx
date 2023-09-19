import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define a type for the setting object
type Setting = {
  fullScreen: boolean;
  fontSize: number;
  theme: string;
};

// Create a context with the default value
const SettingContext = createContext<{ setting: Setting; setSetting: Dispatch<SetStateAction<Setting>> } | undefined>(undefined);

type SettingProviderProps = {
  children: ReactNode;
};

function SettingProvider({ children }: any) {
  // Initialize the setting state with the default value
  const [setting, setSetting] = useState<Setting>(defaultSetting);

  return (
    <SettingContext.Provider value={{ setting, setSetting }}>
      {children}
    </SettingContext.Provider>
  );
}

// Define the default setting
const defaultSetting: Setting = {
  fullScreen: false,
  fontSize: 16,
  theme: 'dracula',
};

export { SettingContext, SettingProvider };
