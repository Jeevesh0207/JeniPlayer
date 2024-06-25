import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NoDataSvg = ({ color = '#222222', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M4 11.2C4 10.0799 4 9.51984 4.21799 9.09202C4.40973 8.71569 4.71569 8.40973 5.09202 8.21799C5.51984 8 6.0799 8 7.2 8H8.5012C9.05213 8 9.32759 8 9.58285 8.06868C9.80903 8.12953 10.0228 8.22963 10.2143 8.36443C10.4305 8.51656 10.6068 8.72818 10.9595 9.15141L12.5 11H14.8C15.9201 11 16.4802 11 16.908 11.218C17.2843 11.4097 17.5903 11.7157 17.782 12.092C18 12.5198 18 13.0799 18 14.2V16.8C18 17.9201 18 18.4802 17.782 18.908C17.5903 19.2843 17.2843 19.5903 16.908 19.782C16.4802 20 15.9201 20 14.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V11.2Z"
      fill={color}
      fillOpacity="0.25"
    />
    <Path
      d="M7 8.2C7 7.0799 7 6.51984 7.21799 6.09202C7.40973 5.71569 7.71569 5.40973 8.09202 5.21799C8.51984 5 9.0799 5 10.2 5H11.5012C12.0521 5 12.3276 5 12.5829 5.06868C12.809 5.12953 13.0228 5.22963 13.2143 5.36443C13.4305 5.51656 13.6068 5.72818 13.9595 6.15141L15.5 8H17.8C18.9201 8 19.4802 8 19.908 8.21799C20.2843 8.40973 20.5903 8.71569 20.782 9.09202C21 9.51984 21 10.0799 21 11.2V13.8C21 14.9201 21 15.4802 20.782 15.908C20.5903 16.2843 20.2843 16.5903 19.908 16.782C19.4802 17 18.9201 17 17.8 17H10.2C9.0799 17 8.51984 17 8.09202 16.782C7.71569 16.5903 7.40973 16.2843 7.21799 15.908C7 15.4802 7 14.9201 7 13.8V8.2Z"
      fill={color}
    />
  </Svg>
);

export default NoDataSvg;
