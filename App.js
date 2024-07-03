import React, {useEffect,useState} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import MainComponent from './MainComponent';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider, useTheme} from './Theme/ThemeContext';

//https://jeniplayerbackend.vercel.app/graphql
//http://192.168.68.120:8000/graphql
const client = new ApolloClient({
  uri: 'http://192.168.1.102:8000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
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
};

const ThemedApp = () => {
  const {theme} = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
