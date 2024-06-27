import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme as PaperDefaultTheme, MD2DarkTheme as PaperDarkTheme } from 'react-native-paper';
import LightTheme from './LightTheme';
import DarkTheme from './DarkTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme);
  const [type,setType] = useState("default")

  const lightTheme = useMemo(() => ({
    ...PaperDefaultTheme,
    myOwnProperty: true,
    colors: {
      ...LightTheme[type],
    },
  }), [type]);

  const darkTheme = useMemo(() => ({
    ...PaperDarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme[type],
    },
  }), [type]);

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleType = (type) =>{
    setType(type)
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme,type, toggleTheme,toggleType}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
