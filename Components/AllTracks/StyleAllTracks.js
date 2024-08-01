import {
    StyleSheet,
    Dimensions
} from 'react-native'

import { fonts } from '../../constants'

const screenWidth = Dimensions.get('window').width;
const imageBoxWidth = 50;
const downloadBoxWidth = 50;
const threeDotBoxWidth = 50;
const gap = 8
const padding = gap * 5 + 20;

const songDetailsBoxWidth = screenWidth - (imageBoxWidth + downloadBoxWidth + threeDotBoxWidth + padding);

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
        outercontainer:{
            flex:1,
            // paddingLeft: 10,
            // paddingRight: 10,
            backgroundColor: colors.background,
            position:'relative',
            alignItems:'center'
        },
        container: {
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            // backgroundColor: colors.background_C1,
        },
        top_banner: {
            width: '100%',
            height: 250,
        },
        head_nav: {
            width: '100%',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            position: 'absolute',
            zIndex: 1,
        },
        back_box: {
            width: 40,
            height: 40,
        },
        back_btn: {
            width: 38,
            aspectRatio: 1,
            // backgroundColor: colors.background,
            borderRadius: 5,

        },
        small_poster_box: {
            width: 55,
            aspectRatio: 1,
            marginTop: 30,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'none',
        },
        search_box: {
            width: 40,
            height: 40,
        },
        search_btn: {
            width: 38,
            aspectRatio: 1,
            // backgroundColor: colors.background,
            borderRadius: 5,

        },
        poster_container: {
            width: '100%',
            height: 250,
            marginTop: 30
        },
        poster_box: {
            width: 180,
            aspectRatio: 1,
            borderRadius: 5,
            overflow: 'hidden',
        },
        option_row: {
            width: '100%',
            height: 55,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
        },
        option_heart: {
            width: 45,
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: colors.background,
            paddingTop:2,
            borderColor:colors.bordercolor,
            borderWidth:0.5,
        },
        option_play: {
            width: 45,
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: colors.background,
            borderColor:colors.bordercolor,
            borderWidth:0.5,
            marginRight:20
        },
        option_threedot: {
            width: 45,
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: colors.background,
            borderColor:colors.bordercolor,
            borderWidth:0.5,
            marginRight:2
        },
        track_title_box: {
            width: '100%',
            height: 40,
            marginTop: 5,
        },
        track_title: {
            fontSize: 17,
            fontFamily: fonts.book,
            color: colors.text
        },
        track_desc_box: {
            width: '100%',
            height: 20,
            marginBottom: 15
        },
        track_desc: {
            fontSize: 13,
            fontFamily: fonts.book,
            color: colors.desc,
        },
        songs_container: {
            width: '100%',
            flex: 1,
        },
        song_box: {
            width: '100%',
            height: 60,
            gap: gap,
            padding: 3,
            justifyContent: 'space-between'
        },
        song_left: {
            gap: gap
        },
        song_image_box: {
            width: 50,
            aspectRatio: 1,
            borderRadius: 3,
            overflow: 'hidden',
            position:'relative'
        },
        song_animated_box:{
            position:'absolute',
            top:0,
            bottom:0,
            left:0,
            right:0,
            zIndex:1,
            backgroundColor:'rgba(0,0,0,0.8)'
        },
        song_image: {
            width: '100%',
            height: '100%'
        },
        song_details_box: {
            width: songDetailsBoxWidth,
            height: 50,
            justifyContent: 'center'
        },
        song_details_title: {
            fontSize: 12,
            fontFamily: fonts.book,
            color: colors.text
        },
        song_details_desc: {
            fontSize: 11,
            fontFamily: fonts.regular,
            marginTop: 5,
            color: colors.desc
        },
        song_right: {
            gap: gap - 6
        },
        song_download_box: {
            width: 40,
            aspectRatio: 1,
        },
        song_three_dot: {
            width: 40,
            aspectRatio: 1,
        },
        loading_box: {
            flex: 1,
            backgroundColor: colors.background,
            paddingLeft: 10,
            paddingRight: 10
        },
        loading_text: {
            fontSize: 18,
            fontFamily: fonts.regular,
            marginTop: 5
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
            padding: 10
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
            backgroundColor: colors.background,
            borderRadius: 3
        },
        error_btn_report: {
            backgroundColor: '#8B0000'
        },
        error_btn_text: {
            fontSize: 14,
            fontFamily: fonts.regular
        },
        lineargradient:{
            width:'100%',
            height:200,
            position:'absolute',
        }
    })
}
export { createStyles }