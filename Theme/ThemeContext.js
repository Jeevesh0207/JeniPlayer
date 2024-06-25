import React, { createContext, useState, useMemo, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme as PaperDefaultTheme, MD2DarkTheme as PaperDarkTheme } from 'react-native-paper';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme);

  const lightTheme = useMemo(() => ({
    ...PaperDefaultTheme,
    myOwnProperty: true,
    colors: {
      ...PaperDefaultTheme.colors,
      background: '#fff',
      text: '#000',
      hawkesBlue: '#e1d9fc',
      electricViolet1: '#6c44fc',
      heliotrope1: '#9e82fc',
      melrose1: '#b49cfc',
      heliotrope2: '#8c6afc',
      cornflowerBlue1: '#805efc',
      melrose2: '#b4a4fc',
      cornflowerBlue2: '#7c54fc',
      electricViolet2: '#744afc',
      cornflowerBlue3: '#7454fc',
      dodgerBlueLight: '#1f9bfc',
      dodgerBlueMedium: '#4f60fc',
      dodgerBlueBright: '#14acfc',
      dodgerBlueDark: '#3d76fc',
      dodgerBlueSky: '#14a4fc',
      dodgerBlueAqua: '#09b5fc',
      dodgerBlueOcean: '#3087fc',
      dodgerBlueDeep: '#446bfc',
      dodgerBlueRich: '#347cfc',
      dodgerBlueIntense: '#248cfc',

    },
  }), []);

  const darkTheme = useMemo(() => ({
    ...PaperDarkTheme,
    myOwnProperty: true,
    colors: {
      ...PaperDarkTheme.colors,
      background: '#000',
      text: '#fff',
      hawkesBlue: '#e1d9fc',
      electricViolet1: '#6c44fc',
      heliotrope1: '#9e82fc',
      melrose1: '#b49cfc',
      heliotrope2: '#8c6afc',
      cornflowerBlue1: '#805efc',
      melrose2: '#b4a4fc',
      cornflowerBlue2: '#7c54fc',
      electricViolet2: '#744afc',
      cornflowerBlue3: '#7454fc',
      dodgerBlueLight: '#1f9bfc',
      dodgerBlueMedium: '#4f60fc',
      dodgerBlueBright: '#14acfc',
      dodgerBlueDark: '#3d76fc',
      dodgerBlueSky: '#14a4fc',
      dodgerBlueAqua: '#09b5fc',
      dodgerBlueOcean: '#3087fc',
      dodgerBlueDeep: '#446bfc',
      dodgerBlueRich: '#347cfc',
      dodgerBlueIntense: '#248cfc',
    },
  }), []);

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
