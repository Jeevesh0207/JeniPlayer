import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeSvg = ({ color = '#000', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <Path
      d="M18,21H6c-1.657,0-3-1.343-3-3V8.765c0-1.09,0.591-2.093,1.543-2.622l6-3.333 c0.906-0.503,2.008-0.503,2.914,0l6,3.333C20.409,6.672,21,7.676,21,8.765V18C21,19.657,19.657,21,18,21z"
      opacity=".35"
      fill={color}
    />
    <Path
      d="M15,21H9v-6c0-1.105,0.895-2,2-2h2c1.105,0,2,0.895,2,2V21z"
      fill={color}
    />
  </Svg>
);

export default HomeSvg;
