import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, G, Circle, Ellipse, Path } from 'react-native-svg';

const SadSvg = ({ size = 200 }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => startAnimation());
    };

    startAnimation();
  }, [scaleValue]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width={size}
        height={size}
      >
        <Defs>
          <LinearGradient id="a" x1="50" y1="22.624" x2="50" y2="79.344" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#f5e6c8" />
            <Stop offset="0.509" stopColor="#f8c788" />
            <Stop offset="1" stopColor="#f5e6c8" />
          </LinearGradient>
        </Defs>
        <G transform="scale(0.8)">
          <G>
            <G>
              <G>
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f8b26a"
                  strokeWidth="3"
                  fill="url(#a)"
                />
              </G>
            </G>
            <G>
              <G>
                <G>
                  <Ellipse
                    cx="34.921"
                    cy="39.083"
                    rx="5.44"
                    ry="10.583"
                    fill="#000"
                  />
                </G>
                <G>
                  <Path
                    d="M40.361 24.667l-15.028 9.666"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    fill="none"
                  />
                </G>
              </G>
            </G>
            <G>
              <G>
                <G>
                  <Ellipse
                    cx="65.079"
                    cy="39.083"
                    rx="5.44"
                    ry="10.583"
                    fill="#000"
                  />
                </G>
                <G>
                  <Path
                    d="M59.639 24.667l15.028 9.666"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    fill="none"
                  />
                </G>
              </G>
            </G>
            <G>
              <Path
                d="M65 70.241c0 6.787-6.716 2.584-15 2.584s-15 4.203-15-2.584c0-6.787 6.716-12.288 15-12.288s15 5.501 15 12.288z"
                fill="#000"
              />
            </G>
          </G>
        </G>
      </Svg>
    </Animated.View>
  );
};

export default SadSvg;
