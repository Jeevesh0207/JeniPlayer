import {
    StyleSheet
} from 'react-native'

import { fonts } from '../../constants';

const createStyles = (colors) => {
    return StyleSheet.create({
        makecenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        makealigncenter: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        container: {
            flex: 1,
            backgroundColor:colors.background,
            paddingLeft:10,
            paddingRight:10
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
            fontFamily: fonts.book,
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
            borderRadius: 5,
        },
    })
}

export { createStyles };