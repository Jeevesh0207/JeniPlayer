import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CloseSvg = ({ color = '#000000', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <Path
      d="M8 8L16 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8L8 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseSvg;
