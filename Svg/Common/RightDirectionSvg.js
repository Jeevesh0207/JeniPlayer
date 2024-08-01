import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RightDirectionSvg = ({ color = "#000", size = 24 }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            color={color}
            fill="none"
        >
            <Path
                d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
};
export default RightDirectionSvg;
