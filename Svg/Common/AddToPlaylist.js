import React from 'react';
import Svg, { Path } from 'react-native-svg';

const AddToPlaylistSvg = ({ color = '#000000', size = 24 }) => {
    const width = size
    const height = size
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            fill="none"
        >
            <Path
                d="M2 3L20 3"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2 10L15 10"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2 17L9 17"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18.25 19C18.25 20.6569 16.8509 22 15.125 22C13.3991 22 12 20.6569 12 19C12 17.3431 13.3991 16 15.125 16C16.8509 16 18.25 17.3431 18.25 19ZM18.25 19V10C18.6667 10.6 19 13.12 22 13.6"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
};

export default AddToPlaylistSvg