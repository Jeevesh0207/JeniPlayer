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
const MarginRightofPlay = 5
const DetailBoxWidth = (width * 0.95) - (2 * Outerpadding) - (3 * gap) - FixHeight - 3 * IconWidth - 6 - MarginRightofPlay

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
            paddingRight:3,
        },
        outerplayerbox: {
            width: '95%',
            height: playerBoxHeight + 3,
            flexDirection: 'column',
            backgroundColor: colors.background,
            borderRadius: 6,
            alignItems: 'center',
            overflow:'hidden'
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
            borderRadius: 4,
            overflow:'hidden'
        },
        detailbox: {
            width: DetailBoxWidth,
            height: FixHeight,
            justifyContent: 'center'
        },
        song_image: {
            width: '100%',
            height: '100%'
        },
        title: {
            fontSize: 12,
            fontFamily: fonts.book,
            marginBottom: 4,
            color:colors.text
        },
        desc: {
            fontSize: 11,
            fontFamily: fonts.regular,
            color:colors.desc
        },
        volumebox:{
            width: IconWidth,
            height: FixHeight,
        },
        volumesliderbox:{
           position:'absolute',
           bottom:50,
           width:40,
           height:120,
           backgroundColor:colors.desc,
           alignItems:'center',
           justifyContent:'center',
           paddingTop:20,
           paddingBottom:20,
           borderRadius:10
        },
        volumeslider:{
            width:'85%',
            height:'100%',
        },
        fav_box: {
            width: IconWidth,
            height: FixHeight,
        },
        playpausebox: {
            width: IconWidth,
            height: FixHeight,
            marginRight:MarginRightofPlay,
        },
        progressbox: {
            width: '95%',
            height: 3,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:0,
            borderRadius:4,
            overflow:'hidden'
        },
        progressbar: {
            width: '100%',
        },
        lineargradient:{
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            alignItems:'center'
        }
    })
}

export default createStyles