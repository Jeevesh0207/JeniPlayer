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
            width: '100%',
            height: 350,
            marginBottom: 10,
            alignItems: 'center',
        },
        banner_container: (width) => ({
            width: width - 10,
            height: '100%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            overflow: 'hidden',
            position: 'relative',
        }),
        banner_image: (width) => ({
            width: width,
            height: '100%',
        }),
        carousel: {
            height: 370,
        },
        paginationContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
        },
        activeDot: {
            backgroundColor: colors.solidcolor_C1,
        },
        inactiveDot: {
            backgroundColor: colors.solidcolor_NC1,
        },
        lineargradient: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 200,
        }
    })
}


export { createStyles }