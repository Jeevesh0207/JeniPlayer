import React, { useEffect, useRef,useMemo } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../Theme/ThemeContext';
import createStyles from './StyleUpperLoading';
const UpperLoading = () => {
  const screenWidth = Dimensions.get('window').width;
  const translateX = useRef(new Animated.Value(-screenWidth)).current;
  const { theme } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: screenWidth,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -screenWidth,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  return (
    <View style={styles.banner}>
      <Animated.View style={[styles.loadingBar, { transform: [{ translateX }] }]} />
    </View>
  );
};



export default UpperLoading;
