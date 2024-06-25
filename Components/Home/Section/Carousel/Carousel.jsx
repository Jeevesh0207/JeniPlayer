import React, { useState, useCallback, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { createStyles } from './StyleCarousel';
import { useTheme } from '../../../../Theme/ThemeContext';

const width = Dimensions.get('window').width;

const BannerData = [
  {
    img: 'https://i1.sndcdn.com/avatars-Dii2Q9OzhnVZ8Rhu-gokaWA-t500x500.jpg',
  },
  {
    img: 'https://i1.sndcdn.com/artworks-FIUxAUtMGupos6ao-jRtCKg-t500x500.jpg',
  },
  {
    img: 'https://raw.githubusercontent.com/Jeevesh27/imagecdn/e93e9a1b312f46b6bdb352a91a32117b56122129/Night%20Music%20Festi%20val.png',
  },
];

const CarouselContainer = () => {
  const {theme} = useTheme()
  const {colors} = theme
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.banner_container(width)}>
        <Image
          style={styles.banner_image(width)}
          source={{ uri: item.img }}
          contentPosition={'top center'}
          alt="jpg"
        />
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.2)',
            `${colors.background}`,
          ]}
          locations={[0, 0.5, 1]}
          style={styles.lineargradient}
          pointerEvents="none"
        />
      </View>
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
            currentIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      )),
    [currentIndex, styles]
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
          activeOffsetX: [-10, 10],
        }}
      />
      <View style={styles.paginationContainer}>{paginationDots}</View>
    </View>
  );
};

export default CarouselContainer;
