import {
    StyleSheet,
    Dimensions
}from 'react-native'

import { fonts } from '../../../constants'

const screenWidth = Dimensions.get('window').width;
const imageBoxWidth = 50;
const downloadBoxWidth = 50;
const threeDotBoxWidth = 50;
const gap = 8
const padding = gap * 5 + 20;

const songDetailsBoxWidth = screenWidth - (imageBoxWidth + downloadBoxWidth + threeDotBoxWidth + padding);

const createStyles = (colors) =>{
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
        container:{
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: colors.background
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
        search_box: {
            width: '100%',
            height: 45,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 10,
            borderWidth: 1,
            borderColor:colors.bordercolor
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
            // backgroundColor: colors.background_C1,
        },
        song_box: {
            width: '100%',
            height: 60,
            gap: gap,
            // padding: 3,
            justifyContent: 'space-between',
        },
        song_left: {
            gap: gap
        },
        song_image_box: {
            width: 50,
            aspectRatio: 1,
            borderRadius: 3,
            overflow: 'hidden'
        },
        song_image: {
            width: '100%',
            height: '100%'
        },
        song_details_box: {
            width: songDetailsBoxWidth,
            height: 50,
            justifyContent: 'center',
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
        noresult_container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        noresult_text: {
            fontSize: 18,
            fontFamily: fonts.regular,
            color: colors.text
        }
    })
}


export default createStyles