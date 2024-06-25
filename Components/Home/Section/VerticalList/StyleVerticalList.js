import {
    StyleSheet
} from 'react-native'

import { fonts } from '../../../../constants'

const createStyles = (colors) => {
    return StyleSheet.create({
        makecenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: colors.background
        },
        head: {
            width: '100%',
            height: 60,
            position: 'relative'
        },
        head_title_box: {
            height: '100%',
        },
        head_title_text: {
            fontSize: 18,
            fontFamily: fonts.medium,
            color: colors.text
        },
        back_box: {
            width: 40,
            height: '100%',
            position: 'absolute',
            left: 0
        },
        back_btn: {
            width: 38,
            aspectRatio: 1,
            backgroundColor: '#fff',
            borderRadius: 5,
            shadowColor: colors.dodgerBlueDeep,
            elevation: 3
        },
        search_box: {
            width: '100%',
            height: 45,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 10,
            borderWidth: 0.5
        },
        search_input_box: {
            width: '85%',
            height: '100%'
        },
        search_input: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            color: colors.background,
            paddingLeft: 10,
            letterSpacing: 0.4,
            fontFamily: fonts.regular
        },
        search_icon_box: {
            width: '15%',
            height: '100%',
            backgroundColor: '#fff'
        },
        tracks_container: {
            flex: 1,
            marginTop: 5,
        },
        box: (numColumns) => ({
            flex: 1 / numColumns,
            height: 180,
            margin: 5,
        }),
        image_box: (module_template) => ({
            width: '100%',
            aspectRatio: 1,
            borderRadius: (module_template === "topArtist") ? 100 : 10,
            overflow: 'hidden',
        }),
        poster: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9
        },
        title: (module_template) => ({
            fontSize: 14,
            fontFamily: fonts.regular,
            marginTop: 8,
            color: colors.text,
            overflow: 'hidden',
            textAlign: (module_template === "topArtist") ? 'center' : 'flex-start'
        }),
        desc: (module_template) => ({
            fontSize: 12,
            fontFamily: fonts.regular,
            marginTop: 2,
            color: 'gray',
            overflow: 'hidden',
            textAlign: (module_template === "topArtist") ? 'center' : 'flex-start'
        }),
        noresult_container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        noresult_text: {
            fontSize: 18,
            fontFamily: fonts.regular,
            color: colors.text
        }
    })
}
export { createStyles }