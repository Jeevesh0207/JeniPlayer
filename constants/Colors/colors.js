
import { useSelector } from "react-redux";

const useColors = () => {
    const { theme } = useSelector(state => state.getTheme)
    return {
        hawkesBlue: '#e1d9fc',
        electricViolet1: '#6c44fc',
        heliotrope1: '#9e82fc',
        melrose1: '#b49cfc',
        heliotrope2: '#8c6afc',
        cornflowerBlue1: '#805efc',
        melrose2: '#b4a4fc',
        cornflowerBlue2: '#7c54fc',
        electricViolet2: '#744afc',
        cornflowerBlue3: '#7454fc',
        dodgerBlueLight: '#1f9bfc',
        dodgerBlueMedium: '#4f60fc',
        dodgerBlueBright: '#14acfc',
        dodgerBlueDark: '#3d76fc',
        dodgerBlueSky: '#14a4fc',
        dodgerBlueAqua: '#09b5fc',
        dodgerBlueOcean: '#3087fc',
        dodgerBlueDeep: '#446bfc',
        dodgerBlueRich: '#347cfc',
        dodgerBlueIntense: '#248cfc',
        text: theme ? '#000' : '#fff',
        background: theme ? '#fff' : '#000',
    }
};



export default useColors