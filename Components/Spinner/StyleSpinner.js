import { StyleSheet } from 'react-native';
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
        loading_box: {
            flex: 1,
            backgroundColor: colors.background,
            paddingLeft: 10,
            paddingRight: 10
        },
        loading_text: {
            fontSize: 17,
            fontFamily: fonts.regular,
            marginTop: 10,
            color: colors.text,
            textAlign: 'center',
        },
    });
}
export { createStyles }
