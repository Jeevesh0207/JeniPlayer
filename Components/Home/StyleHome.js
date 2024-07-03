import {
    StyleSheet
} from 'react-native'

const createStyles = (colors) => {
    return StyleSheet.create({
        makecenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            backgroundColor:colors.background,
            position:'relative',
        },
        banner: {
            width: '100%',
            height: 160,
            backgroundColor: '#4899',
            borderRadius: 20,
            overflow: 'hidden',
            marginTop: 10,
            marginBottom: 10,
        },
        banner_image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        lineargradient:{
            position:'absolute',
            width:'100%',
            height:200,
        }
    })
}

export { createStyles }