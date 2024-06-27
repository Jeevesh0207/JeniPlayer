import{
    View,
    Text,
} from 'react-native'
import { useTheme } from '../../../Theme/ThemeContext';
import createStyles from './StyleLargePlayer';

const LargePlayer = () =>{
    const {theme} = useTheme();
    const {colors} = theme;
    const styles = useMemo(() => createStyles(colors), [colors]);
    return(
        <View>
            <Text>MiniPlayer</Text>
        </View>
    )
}


export default LargePlayer