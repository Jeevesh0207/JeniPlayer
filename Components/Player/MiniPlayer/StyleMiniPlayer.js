import {
    StyleSheet,
    Dimensions
} from 'react-native'
import { fonts } from '../../../constants'

const width = Dimensions.get('window').width

const playerBoxHeight = 55
const Outerpadding = 6
const gap = 6
const FixHeight = playerBoxHeight - 2 * Outerpadding
const IconWidth = 35
const DetailBoxWidth = (width * 0.95) - (2 * Outerpadding) - (3 * gap) - FixHeight - 2 * IconWidth - 6

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
            width: '100%',
            height: playerBoxHeight,
            position: 'absolute',
            bottom: 75,
            backgroundColor: 'transparent',
            paddingLeft:3,
            paddingRight:3
        },
        outerplayerbox: {
            width: '95%',
            height: playerBoxHeight + 3,
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderRadius: 6,
            overflow: 'hidden',
            alignItems: 'center'
        },
        playerbox: {
            width: '100%',
            height: playerBoxHeight,
            borderRadius: 6,
            paddingLeft: Outerpadding,
            paddingRight: Outerpadding,
            gap: gap,
        },
        poster_box: {
            width: FixHeight,
            height: FixHeight,
            backgroundColor: "pink",
            borderRadius: 4
        },
        detailbox: {
            width: DetailBoxWidth,
            height: FixHeight,
            justifyContent: 'center'
        },
        title: {
            fontSize: 12,
            fontFamily: fonts.book,
            marginBottom: 4
        },
        desc: {
            fontSize: 11,
            fontFamily: fonts.regular
        },
        fav_box: {
            width: IconWidth,
            height: FixHeight,
        },
        playpausebox: {
            width: IconWidth,
            height: FixHeight,
        },
        progressbox: {
            width: '100%',
            height: 3,
            justifyContent:'flex-end',
            alignItems:'center',
            position:'absolute',
            bottom:0,
            borderRadius:4,
            overflow:'hidden'
        },
        progressbar: {
            width: '100%',
            height: 3,
            zIndex:1,
            marginLeft:-10,
            marginRight:-10,
            transform:[{scaleY:1.1}]
        }
    })
}

export default createStyles