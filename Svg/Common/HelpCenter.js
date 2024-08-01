import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const HelpCenterSvg = ({ color = '#000', size = 24 }) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="1.5"
            />
            <Path
                d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <Path
                d="M11.992 17H12.001"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default HelpCenterSvg;
