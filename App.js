import React, { useEffect } from 'react';
import { Platform, View, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import MainComponent from './MainComponent';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './Theme/ThemeContext';

//https://jeniplayerbackend.vercel.app/graphql
//http://192.168.82.120:8000/graphql
const client = new ApolloClient({
  uri: 'https://jeniplayerbackend.vercel.app/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      SplashScreen.hide();
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

const ThemedApp = () => {
  const { theme} = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
