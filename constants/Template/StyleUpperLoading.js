import {
    StyleSheet
} from 'react-native'
const createStyles = (color) => {
    return StyleSheet.create({
        banner: {
            height: 5,
            backgroundColor: '#E0E0E0', // Background color of the banner
            overflow: 'hidden',
        },
        loadingBar: {
            width: '100%',
            height: '100%',
            backgroundColor: color.solidcolor, // Color of the loading bar
        },
    });
}

export default createStyles