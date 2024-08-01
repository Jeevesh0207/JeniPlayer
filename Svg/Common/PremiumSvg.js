import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PremiumSvg = ({ color = "#000", size = 57 }) => {
    return (
        <Svg
            width={size}
            height={size}
            color={color}
            fill={color}
            viewBox="0 -5.47 56.254 56.254"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                id="diamond_premium"
                data-name="diamond premium"
                d="M494.211,354.161l1.174-1.366H482.552L469.8,367.5h12.94Zm-8.4,13.336H510.05l-6.589-7.664-5.528-6.429-8.354,9.713Zm-15.856,2.329,24.1,25.356L482.53,369.826Zm40.824,0h-2.1l-8.829,0H485.083l12.774,28.1.082.178,12.17-26.8Zm-8.94,25.322,24.057-25.32H513.337Zm24.215-27.65L513.3,352.8H500.478l12.642,14.7Z"
                transform="translate(-469.802 -352.795)"
            />
        </Svg>
    )
}
export default PremiumSvg;