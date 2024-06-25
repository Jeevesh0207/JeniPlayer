import {
    StyleSheet
} from 'react-native'

import { fonts } from '../../constants'

const createStyles = (colors) => {
    return StyleSheet.create({
        makecenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            width: '100%',
            height: 70,
            backgroundColor: colors.background,
            position: 'static',
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'row'
        },
        nav_btn: {
            flex: 1,
            height: '100%',
            flexDirection: 'column'
        },
        btn_text: {
            fontSize: 10,
            fontFamily: fonts.regular,
            color: '#b8b8b8'
        }
    })

}
export default createStyles