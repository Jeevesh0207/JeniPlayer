import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const OneBarMenuSvg = ({ color = '#000000', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
  >
    <G id="Menu / Menu_Alt_03">
      <Path
        id="Vector"
        d="M5 17H13M5 12H19M5 7H13"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </G>
  </Svg>
);

export default OneBarMenuSvg;
