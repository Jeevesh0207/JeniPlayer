import {
    StyleSheet,
} from 'react-native'

import { fonts } from '../../constants'

const createStyles =  (colors) =>{
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
        error_box: {
            flex: 1,
            backgroundColor: colors.background,
            paddingLeft: 10,
            paddingRight: 10
        },
        error_text: {
            fontSize: 16,
            fontFamily: fonts.regular,
            marginTop: 10,
            textAlign: 'center',
            lineHeight: 30,
            padding: 10,
            color:colors.text
        },
        error_btn_box: {
            width: '100%',
            height: 50,
            marginTop: 10,
            flexDirection: 'row',
            gap: 20
        },
        error_btn: {
            width: 100,
            height: 40,
            backgroundColor: colors.dodgerBlueDark,
            borderRadius: 3
        },
        error_btn_report: {
            backgroundColor: '#8B0000'
        },
        error_btn_text: {
            fontSize: 14,
            fontFamily: fonts.regular,
            color:'#fff'
        }
    })

}

export {createStyles}