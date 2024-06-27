import {
    StyleSheet
} from 'react-native'

import {fonts } from '../../../../constants'

const createStyles = (colors) => {
    return StyleSheet.create({
        makecenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        home_nav: {
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor:colors.background,
            paddingLeft:10,
            paddingRight:10,
        },
        home_nav_left: {
            width: 200,
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        home_nav_right: {
            width: 40,
            height: '100%',
        },
        logo_box: {
            width: 40,
            height: 40,
            backgroundColor: '#fff',
            shadowColor: colors.bordercolor,
            elevation: 3,
            borderRadius: 30
        },
        logo: {
            width: 25,
            height: 25,
            marginRight: 3
        },
        name_box: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        logo_text: {
            fontSize: 16,
            fontFamily: fonts.regular,
            marginLeft: 8,
            color: colors.text
        },
        username: {
            fontSize: 13,
            marginLeft: 8,
            fontFamily: fonts.book,
            color: colors.desc,
        },
        search_icon_box: {
            width: 38,
            aspectRatio: 1,
            backgroundColor: colors.background,
            borderRadius: 5,
        }
    })
}

export {createStyles}