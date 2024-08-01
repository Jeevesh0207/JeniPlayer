import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme as PaperDefaultTheme, MD2DarkTheme as PaperDarkTheme } from 'react-native-paper';
import LightTheme from './LightTheme';
import DarkTheme from './DarkTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme);
  const [type,setType] = useState("forestwhisper")

  const getData = async (key) => {
    try {
      const Value = await AsyncStorage.getItem(key);
      return Value != null ? JSON.parse(Value) : null;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    async function getThemeType() {
      const data = await getData('modetype');
      if (data !== null) {
        setType(data)
      }
    }
    getThemeType();
  },[])

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

  // const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const currentTheme =  darkTheme

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const storeData = async (value, key) => {
    try {
      const Value = JSON.stringify(value);
      await AsyncStorage.setItem(key, Value);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleType = async(type) =>{
    setType(type)
    await storeData(type,'modetype')
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme,type, toggleTheme,toggleType}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
