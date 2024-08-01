import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
// import { Image } from 'expo-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { createStyles } from './StyleCarousel';
import { useTheme } from '../../../../Theme/ThemeContext';
import { Image, Skeleton } from '@rneui/themed';
import axios from 'axios';
import {API_URL} from "@env"
const width = Dimensions.get('window').width;
import { useDispatch } from 'react-redux';
import { setTrackListID } from '../../../../redux/actions';
import { useNavigation } from '@react-navigation/native';
const BannerData = [
  {
    img: 'https://i1.sndcdn.com/avatars-Dii2Q9OzhnVZ8Rhu-gokaWA-t500x500.jpg'
  },
  {
    img: 'https://i1.sndcdn.com/artworks-FIUxAUtMGupos6ao-jRtCKg-t500x500.jpg'
  },
  {
    img: 'https://raw.githubusercontent.com/Jeevesh27/imagecdn/e93e9a1b312f46b6bdb352a91a32117b56122129/Night%20Music%20Festi%20val.png'
  }
];

const replace150with500 = (url) => url?.replace('150x150', '500x500') || url;

const CarouselContainer = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch()
  const navigation  = useNavigation()
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [BannerData,setBannerData]=useState([])

  const getMainBanner=async()=>{
    try {
      const response = await axios.get(API_URL+'/mainbannerdata')
      const result  = response.data
      if(result.ok){
        setCurrentIndex(0)
        setBannerData(result.data)
      }else{
        console.log(result.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getMainBanner()
  },[])

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.banner_container(width)} onPress={()=>{
        GoToAllTracks('tracks',item.token,item.type)
      }}>
        <Image
          style={styles.banner_image(width)}
          source={{ uri: replace150with500(item.image) }}
          contentPosition={'top center'}
          PlaceholderContent={
            <Skeleton
              width={'100%'}
              height={'100%'}
              LinearGradientComponent={LinearGradient}
              animation="wave"
            />
          }
          alt="jpg"
          transition={true}
        />
        <LinearGradient
          colors={['transparent', `${colors?.slidergradient}`]}
          style={styles.lineargradient}
          pointerEvents="none"
        />
      </TouchableOpacity>
    ),
    [styles, colors]
  );

  const paginationDots = useMemo(
    () =>
      BannerData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index ? styles.activeDot : styles.inactiveDot
          ]}
        />
      )),
    [currentIndex, styles]
  );

  const GoToAllTracks = useCallback(
    (route, token, type) => {
      const obj = {
        token,
        type
      };
      dispatch(setTrackListID(obj));
      navigation.navigate(route);
    },
    [dispatch, navigation]
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        style={styles.carousel}
        data={BannerData}
        mode="parallax"
        onSnapToItem={setCurrentIndex}
        parallaxScrollingScale={0.8}
        parallaxScrollingOffset={50}
        renderItem={renderItem}
        pagingEnabled
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10]
        }}
      />
      <View style={styles.paginationContainer}>{paginationDots}</View>
    </View>
  );
};

export default CarouselContainer;
