import {
    Dimensions,
    StyleSheet
} from 'react-native'
import { fonts } from '../../../constants'

const width = Dimensions.get('window').width

const IconBoxWidth = 100
const gap = 10
const SongDetailWidth = width - 4 * 10 - 100 - gap

const LyricsTextBox = 50 + 3 * 2  // (3*2 margin)

const LyricsContainerHeight = LyricsTextBox * 5 

const createStyles = (colors) => {
    return StyleSheet.create({
        makecenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        makecolalign: {
            justifyContent: 'center'
        },
        makealigncenter: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        paddingconatiner: {
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: colors.background,
            position: 'relative'
        },
        container: {
            flex: 1,
        },
        head: {
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between'
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
            
        },
        back_btn: {
            width: 38,
            aspectRatio: 1,
            borderRadius: 5,
        },
        threedotbox: {
            width: 40,
            height: '100%',
        },
        threedotbtn: {
            width: 38,
            aspectRatio: 1,
            borderRadius: 5,
        },
        carouselcontainer: {
            width: '100%',
            height: 400,
            justifyContent:'center',
            alignItems:'center',
        },
        banner_container: {
            width: width - 20,
            height: 400,
            overflow: 'hidden',
            paddingLeft: 10,
            paddingRight: 10,
        },
        banner_image: {
            width: 300,
            height: 300,
            borderRadius: 5,
            // overflow: 'hidden',
            backgroundColor:'orange',
            zIndex:1,
        },
        carousel: {
            height: 400,
            backgroundColor:'pink'
        },
        song_image_box: {
            width: '100%',
            height: 400,
            paddingLeft: 20,
            paddingRight: 20,
        },
        song_image: {
            width: '100%',
            height: 300,
            borderRadius: 10,
            overflow: 'hidden'
        },
        songdetailbox: {
            width: '100%',
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: gap,
            paddingLeft: 10,
            paddingRight: 10
        },
        songdetailleft: {
            width: SongDetailWidth,
            height: '100%',
        },
        title: {
            fontSize: 18,
            fontFamily: fonts.book,
            marginBottom: 2,
            color: colors.text
        },
        desc: {
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.desc
        },
        songdetailright: {
            width: IconBoxWidth,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 5
        },
        songdetailiconbox: {
            width: 40,
            height: '100%',
        },
        sliderbox: {
            width: '100%',
            height: 40,
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            position: 'relative'
        },
        sliderleftval: {
            position: 'absolute',
            left: 0,
            bottom: -2,
            fontSize: 9,
            fontFamily: fonts.book,
            paddingLeft: 8,
            color: colors.text
        },
        sliderrightval: {
            position: 'absolute',
            right: 0,
            bottom: -2,
            fontSize: 9,
            fontFamily: fonts.book,
            paddingRight: 8,
            color: colors.text
        },
        progressbar: {
            width: '100%',
        },
        alloptionsbox: {
            width: '100%',
            height: 90,
            paddingLeft: 10,
            paddingRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        optionmiddlecontainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
        },
        playbox: {
            width: 60,
            height: 60,
            backgroundColor: colors.text,
            borderRadius: 50
        },
        lyricsbox: {
            width: '100%',
            height: 350,
            // marginBottom: 20,
            marginTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
            position:'relative'
        },
        lyricscontainer:(color)=>({
            width: '100%',
            height: 330,
            backgroundColor: '#1f1f1f',
            borderRadius: 10,
            overflow: 'hidden',
            justifyContent:'flex-start'
        }),
        lyricsheadbox: {
            width: '100%',
            height: 40,
            justifyContent: 'center',
            paddingLeft: 15
        },
        lyricsheadtext: {
            fontSize: 14,
            letterSpacing: 0.1,
            fontFamily: fonts.regular,
            color: colors.text,
            zIndex:1
        },
        lineargradient: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingLeft: 10,
            paddingRight: 10
        },
        lyrictextconatiner:{
           width:'100%',
           maxHeight:LyricsContainerHeight, 
           overflow:'hidden',
        },
        lyricstextbox:{
          width:'100%',
          minHeight:40,
          marginTop:3,
          marginBottom:3,
          paddingLeft:15,
          paddingRight:15 
        },
        lyricstext:{
            fontFamily:fonts.regular,
            fontSize:16,
        },
        lyricspressable:{
            margin:0,
            padding:0,
        },
    })
}

export default createStyles