import{
    View,
    Text
}from 'react-native'
import { useMemo } from 'react';
import { useTheme } from '../../../Theme/ThemeContext';
import { createStyles } from './StyleQueueList';
import { Image } from 'expo-image';
import he from 'he'

const QueueList = ({setModalQueueVisible}) =>{
    const { theme } = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(colors), [colors]);
    return(
        <View>
            <Text>Queue</Text>
        </View>
    )
}

export default QueueList