import React, { useEffect } from 'react';
import Svg, { Line } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const AnimatedPlaySong = ({ color = '#fff', size = 21 }) => {
  const progress1 = useSharedValue(2);
  const progress2 = useSharedValue(2);
  const progress3 = useSharedValue(2);
  const progress4 = useSharedValue(2);

  const width = size 
  const height = size 

  useEffect(() => {
    progress1.value = withRepeat(
      withTiming(22, { duration: 600, easing: Easing.linear }),
      -1,
      true
    );
    progress2.value = withRepeat(
      withTiming(22, { duration: 500, easing: Easing.linear }),
      -1,
      true
    );
    progress3.value = withRepeat(
      withTiming(22, { duration: 700, easing: Easing.linear }),
      -1,
      true
    );
    progress4.value = withRepeat(
      withTiming(22, { duration: 500, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const animatedProps1 = useAnimatedProps(() => ({
    y2: progress1.value,
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    y2: progress2.value,
  }));

  const animatedProps3 = useAnimatedProps(() => ({
    y2: progress3.value,
  }));

  const animatedProps4 = useAnimatedProps(() => ({
    y2: progress4.value,
  }));

  return (
    <Svg width={width} height={height} viewBox="0 0 21 24" >
      <AnimatedLine
        x1="2"
        y1="22"
        x2="2"
        animatedProps={animatedProps1}
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <AnimatedLine
        x1="8"
        y1="22"
        x2="8"
        animatedProps={animatedProps2}
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <AnimatedLine
        x1="14"
        y1="22"
        x2="14"
        animatedProps={animatedProps3}
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <AnimatedLine
        x1="20"
        y1="22"
        x2="20"
        animatedProps={animatedProps4}
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </Svg>
  );
};

export default AnimatedPlaySong;
