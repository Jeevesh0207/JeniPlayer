import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const PauseSvg = ({ color = '#000000', size = 48, strokeWidth = 4 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="48" height="48" fill="transparent" />
    <Path
      d="M16 12V36"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M32 12V36"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PauseSvg;
