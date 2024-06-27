import React, { useState, useEffect } from 'react';
import { Keyboard, Text } from 'react-native';
import {
  Home,
  Search,
  Library,
  Profile,
  Navbar,
  VerticalList,
  Loading,
  AllTracks,
  TrackSearch,
  MiniPlayer,
} from './Components';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setLaunchData } from './redux/actions';
const typeDefs = gql`
  query GET_LAUNCH_DATA {
    trending {
      id
      title
      token
      type
      desc
      image
    }
    newReleaseHindi: newReleases(language: "hindi") {
      id
      title
      token
      type
      image
      desc
    }
    newReleaseEnglish: newReleases(language: "english") {
      id
      title
      token
      type
      image
      desc
    }
    topArtist {
      id
      title
      token
      type
      desc
      image
    }
    topCharts {
      id
      title
      token
      type
      desc
      image
    }
    topPlaylistHindi: topPlaylist(language: "hindi") {
      id
      title
      token
      type
      desc
      image
    }
    topPlaylistEnglish: topPlaylist(language: "english") {
      id
      title
      token
      type
      desc
      image
    }
  }
`;

const MainComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(typeDefs);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setLaunchData(data));
    }
  }, [data]);

  if (loading) {
    return <Loading size={200} bgColor={'#fff'} />;
  }

  if (error) {
    return <Text> {console.log(error)} Error</Text>;
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home" component={Home}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push',
          }} />
        <Stack.Screen name="search" component={Search}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push',
          }} />
        <Stack.Screen name="library" component={Library}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push',
          }} />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push',
          }}
        />
        <Stack.Screen
          name="alllist"
          component={VerticalList}
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="tracks"
          component={AllTracks}
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="tracksearch"
          component={TrackSearch}
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
      <MiniPlayer />
      {!keyboardStatus && <Navbar />}
    </>
  );
};

export default MainComponent;
