import React from 'react';
import Svg, { G, Circle } from 'react-native-svg';

const ThreeDotSvg = ({ color = '#000', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill="none"
  >
    <G>
      <Circle cx="256" cy="53.333" r="53.333" fill={color} />
      <Circle cx="256" cy="256" r="53.333" fill={color} />
      <Circle cx="256" cy="458.667" r="53.333" fill={color} />
    </G>
  </Svg>
);

export default ThreeDotSvg;
