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
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingLeft: 10,
            paddingRight: 10,
        },
        search_box: {
            width: '100%',
            height: 45,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 10,
            borderWidth: 1,
            borderColor:colors.iconactive
        },
        search_input_box: {
            width: '85%',
            height: '100%'
        },
        search_input: {
            width: '100%',
            height: '100%',
            backgroundColor: colors.background,
            color: colors.text,
            paddingLeft: 10,
            letterSpacing: 0.4,
            fontFamily: fonts.book
        },
        search_icon_box: {
            width: '15%',
            height: '100%',
            backgroundColor: colors.background,
        },
        song_box: {
            width: '100%',
            height: 60,
            gap: gap,
            padding: 3,
            justifyContent: 'space-between',
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
        },
        noresult_container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        noresult_text: {
            fontSize: 18,
            fontFamily: fonts.regular,
            color: colors.text
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
        
    })
}
export { createStyles }