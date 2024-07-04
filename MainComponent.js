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
  MiniPlayer
} from './Components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLyrics, setLaunchData, setTrackData } from './redux/actions';
import { setupPlayer } from './trackPlayerServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';

const Stack = createNativeStackNavigator();

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
    getMoodRomance: getPlaylistByMood(query: "Romance") {
      id
      title
      token
      type
      desc
      image
    }
    getMoodSad: getPlaylistByMood(query: "Sad") {
      id
      title
      token
      type
      desc
      image
    }
    getMoodDance: getPlaylistByMood(query: "Dance") {
      id
      title
      token
      type
      desc
      image
    }
    getMoodWorkout: getPlaylistByMood(query: "Workout") {
      id
      title
      token
      type
      desc
      image
    }
    getMoodParty: getPlaylistByMood(query: "Party") {
      id
      title
      token
      type
      desc
      image
    }
    getMoodDevotional: getPlaylistByMood(query: "Devotional") {
      id
      title
      token
      type
      desc
      image
    }
    getMoodKpop: getPlaylistByMood(query: "k-pop") {
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
  const { isDisplay, isReady } = useSelector(
    (state) => state.getTrackPlayerData
  );

  useEffect(() => {
    const setup = async () => {
      const isSetup = await setupPlayer();
      dispatch(setTrackData({ isReady: isSetup }));
    };
    setup();
  }, [dispatch]);

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
  }, [data, dispatch]);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getStorageData = async () => {
      const { queue, currentTrack, currentTrackIndex } = await getData(
        'TrackData'
      );
      if (currentTrack && isReady && queue) {
        await TrackPlayer.add(queue);
        await TrackPlayer.skip(currentTrackIndex);
        const Obj = {
          isDisplay: true,
          queue: queue,
          currentTrack: currentTrack,
          currentTrackIndex: currentTrackIndex,
          songStatus: true
        };
        dispatch(setTrackData(Obj));
      }
    };
    getStorageData();
  }, [isReady, dispatch]);

  if (loading) {
    return <Loading size={200} bgColor={'#fff'} />;
  }

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push'
          }}
        />
        <Stack.Screen
          name="search"
          component={Search}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push'
          }}
        />
        <Stack.Screen
          name="library"
          component={Library}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push'
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            presentation: 'fullScreenModal',
            animation: 'simple_push'
          }}
        />
        <Stack.Screen
          name="alllist"
          component={VerticalList}
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name="tracks"
          component={AllTracks}
          options={{ presentation: 'fullScreenModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="tracksearch"
          component={TrackSearch}
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom'
          }}
        />
      </Stack.Navigator>
      {isDisplay && !keyboardStatus && <MiniPlayer />}
      {!keyboardStatus && <Navbar />}
    </>
  );
};

export default MainComponent;
