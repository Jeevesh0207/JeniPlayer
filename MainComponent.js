import React, { useState, useEffect, useCallback } from 'react';
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
  AuthPage,
  Login,
  SignUp,
  Otp,
  Reset,
} from './Components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setLaunchData, setTrackData, setUserData, setFetchTrack, setFavouriteSong } from './redux/actions';
import { setupPlayer } from './trackPlayerServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';
import { useNavigationState } from '@react-navigation/native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import axios from 'axios';

import { API_URL } from "@env"

const Stack = createNativeStackNavigator();

const GET_LAUNCH_DATA = gql`
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
  const { loading, error, data } = useQuery(GET_LAUNCH_DATA, { fetchPolicy: 'cache-and-network' });
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const currentRouteName = useNavigationState((state) => state?.routes[state?.index]?.name);
  const { isDisplay, isReady } = useSelector((state) => state.getTrackPlayerData);
  const { isUserLogin } = useSelector((state) => state.getUserData);
  const { email } = useSelector((state) => state.getUserData);

  const setup = useCallback(async () => {
    const isSetup = await setupPlayer();
    dispatch(setTrackData({ isReady: isSetup }));
  }, [dispatch]);

  useEffect(() => {
    setup();
  }, [setup]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardStatus(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardStatus(false));

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

  useEffect(() => {
    const checkUserAuth = async () => {
      const user = await getData('cookies');
      dispatch(setUserData({ isUserLogin: !!user }));
    };
    checkUserAuth();
  }, [dispatch]);

  useEffect(() => {
    async function checkUserLogin() {
      const result = await getData('loginUserData');
      if (result !== null) {
        dispatch(
          setUserData({
            fullName: result.fullName,
            email: result.email,
          })
        );
      }
    }
    checkUserLogin();
  }, [dispatch]);

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
      try {
        const storedData = await getData('TrackData');
        if (storedData && isReady) {
          const { queue, currentTrack, currentTrackIndex } = storedData;
          if (queue && currentTrack) {
            await TrackPlayer.add(queue);
            await TrackPlayer.skip(currentTrackIndex);
            dispatch(
              setTrackData({
                isDisplay: true,
                queue,
                currentTrack,
                currentTrackIndex,
                songStatus: true,
              })
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStorageData();
  }, [isReady, dispatch]);

  useEffect(() => {
    async function getfetchtrack() {
      const fetchtrack = await getData('fetchtrack');
      dispatch(setFetchTrack(fetchtrack))
    }
    getfetchtrack()
  }, [])

  useEffect(() => {
    async function getfavouritetrack() {
      try {
        const response = await axios.post(API_URL + '/favourite', { email })
        const result = response.data
        if(result.ok){
          dispatch(setFavouriteSong({
            songs:result?.favourites ?? [],
            songsId:result?.songArrayId
          }))
        }else{
          console.log(result.message)
        }
      } catch (error) {
        console.log("FAVOURITE : ",error.message)
      }
    }
    getfavouritetrack()
  }, [email])
  


  if (loading) {
    return <Loading size={200} bgColor="#fff" />;
  }

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  // const toastConfig = {
  //   success: (props) => (
  //     <BaseToast
  //       {...props}
  //       text1NumberOfLines={2}
  //       text2NumberOfLines={2}
  //     />
  //   ),
  //   error: (props) => (
  //     <ErrorToast
  //       {...props}
  //       text1NumberOfLines={2}
  //       text2NumberOfLines={2}
  //     />
  //   ),
  // };

  return (
    <>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} options={{ presentation: 'fullScreenModal', animation: 'simple_push' }} />
        <Stack.Screen name="search" component={Search} options={{ presentation: 'fullScreenModal', animation: 'simple_push' }} />
        <Stack.Screen name="library" component={Library} options={{ presentation: 'fullScreenModal', animation: 'simple_push' }} />
        <Stack.Screen name="profile" component={Profile} options={{ presentation: 'fullScreenModal', animation: 'simple_push' }} />
        <Stack.Screen name="alllist" component={VerticalList} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="tracks" component={AllTracks} options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
        <Stack.Screen name="tracksearch" component={TrackSearch} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="authpage" component={AuthPage} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="login" component={Login} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="signup" component={SignUp} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="otp" component={Otp} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="reset" component={Reset} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
      {currentRouteName !== 'authpage' && currentRouteName !== 'login' && currentRouteName !== 'signup' && currentRouteName !== 'otp' && currentRouteName !== 'reset' && (
        <>
          {isDisplay && !keyboardStatus && isUserLogin && <MiniPlayer />}
          {!keyboardStatus && <Navbar />}
        </>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default MainComponent;
