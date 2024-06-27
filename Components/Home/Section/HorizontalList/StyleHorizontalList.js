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
            width: '100%',
            height: 220,
            paddingLeft:10,
            paddingRight:10
        },
        head: {
            width: '100%',
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        module_name: {
            fontSize: 16,
            fontFamily: fonts.book,
            color: colors.text
        },
        more: {
            fontSize: 12,
            fontFamily: fonts.regular,
            color: colors.text,
            padding: 5
        },
        box_container: {
            width: '100%',
            height: 200,
            paddingTop: 5,
            display: 'flex',
            flexDirection: 'row',
        },
        box: {
            width: 120,
            height: 180,
        },
        image_box: (module_template) => ({
            width: '100%',
            height: 120,
            borderRadius: (module_template === "topArtist") ? 100 : 10,
            overflow: 'hidden',
        }),
        poster: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1
        },
        title: (module_template) => ({
            fontSize: 12,
            fontFamily: fonts.book,
            marginTop: 8,
            color: colors.text,
            overflow: 'hidden',
            textAlign: (module_template === "topArtist") ? 'center' : 'flex-start'
        }),
        desc: (module_template) => ({
            fontSize: 11,
            marginTop: 2,
            fontFamily: fonts.regular,
            color: colors.desc,
            overflow: 'hidden',
            textAlign: (module_template === "topArtist") ? 'center' : 'flex-start'
        })
    })
}

export { createStyles }