import {View, Text, Animated, Easing} from 'react-native';
import {useRef, useEffect} from 'react';
import styles from './StyleLoading';
import LottieView from 'lottie-react-native';
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const Loading = ({size, bgColor}) => {
  const animationProgress = useRef(new Animated.Value(0));
  const startAnimation = () => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        animationProgress.current.setValue(0);
        startAnimation();
      }
    });
  };
  useEffect(() => {
    startAnimation();
  }, []);
  return (
    <View style={styles.loadingcontainer(bgColor)}>
      <View>
        <AnimatedLottieView
          style={styles.image(size)}
          source={require('../../assets/Lottie/Loding.json')}
          progress={animationProgress.current}
        />
      </View>
    </View>
  );
};

export default Loading;
