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
        poster_container:{
            width: '100%',
            height: 200,
        },
        poster_box:{
            width:120,
            aspectRatio:1,
            borderRadius:100,
            overflow:'hidden'
        },
        poster:{
            width:'100%',
            height:'100%'
        },
        poster_name:{
            fontSize:19,
            fontFamily:fonts.regular,
            marginTop:15,
            color:colors.text
        },
        plan_container:{
            width:'100%',
            height:75,
        },
        plan_box:{
            width:'100%',
            height:60,
            borderRadius:10,
            overflow:'hidden',
            flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor:colors.solidcolor,
            marginBottom:10
        },
        plan_box_left:{
            width:'80%',
            height:'100%',
            flexDirection:'row'
        },
        plan_image:{
            width:70,
            height:'100%',
        },
        plan_details:{
            width:'auto',
            height:'100%',
            justifyContent:'center'
        },
        plan_name:{
            fontSize:15,
            fontFamily:fonts.book,
            color:colors.background
        },
        plan_price:{
            fontSize:14,
            fontFamily:fonts.regular,
            color:colors.background,
            marginTop:5
        },
        plan_box_right:{
            width:60,
            height:'100%',
        },
        option_box:{
            width:'100%',
            height:50,
            overflow:'hidden',
            flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor:colors.background
        },
        option_box_left:{
            width:'80%',
            height:'100%',
            flexDirection:'row'
        },
        option_image:{
            width:70,
            height:'100%',
        },
        option_details:{
            width:'auto',
            height:'100%',
            justifyContent:'center'
        },
        option_name:{
            fontSize:14,
            fontFamily:fonts.book,
            color:colors.text
        },
        option_box_right:{
            width:60,
            height:'100%',
        },
        logoutcontainer:{
            flex:1,
            justifyContent:'flex-end',
            backgroundColor:'rgba(0,0,0,0.2)',
        },
        logout_box:{
           width:'100%',
           height:200,
           backgroundColor:colors.background,
           paddingLeft:10,
           paddingRight:10,
           borderTopLeftRadius:20,
           borderTopRightRadius:20,
           overflow:'hidden' ,
        },
        logoutheadtext:{
            width:'80%',
            fontSize:16,
            fontFamily:fonts.book,
            color:'#fff',
            marginBottom:20,
            paddingBottom:15,
            textAlign:'center',
            borderBottomColor:'gray',
            borderBottomWidth:1
        },
        logout_text:{
            fontSize:15,
            fontFamily:fonts.book,
            color:'#fff',
            marginBottom:15,
        },
        logout_btn_box:{
            width:'100%',
            height:50,
            flexDirection:'row',
            gap:20
        },
        logout_btn:{
            width:120,
            height:40,
            backgroundColor:colors.solidcolor,
            borderRadius:30
        },
        logout_btn_text:{
            fontSize:13,
            fontFamily:fonts.book,
            color:'#fff'
        },
        boldText:{
            textAlign:'center',
            paddingHorizontal:10,
            lineHeight:20,
            marginBottom:10
        }
    })
}

export { createStyles };