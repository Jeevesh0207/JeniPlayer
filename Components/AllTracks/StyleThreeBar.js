import {
    StyleSheet,
    Dimensions
} from 'react-native'

import { fonts } from '../../constants'

const createThreeStyles = (colors) => {
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
        maincontainer:{
            flex:1,
            backgroundColor:'rgba(0,0,0,0.5)',
            paddingLeft:20,
            paddingRight:20,
            justifyContent:'flex-end'
        },
        container:{
            width:'100%',
            height:450,
            backgroundColor:colors.background,
            borderRadius:5,
            marginBottom:10
        },
        posterbox:{
            width:'100%',
            height:100,
            alignItems:'center'
        },
        poster:{
           width:150,
           height:150,
           borderRadius:5,
           marginTop:-90,
           overflow:'hidden' 
        },
        title:{
            width:'100%',
            minHeight:20,
            marginTop:4,
            alignItems:'center',
        },
        desc:{
            width:'100%',
            minHeight:20,
            alignItems:'center',
        },
        titletext:{
            fontSize:12,
            fontFamily:fonts.book,
            textAlign:'center',
            paddingLeft:10,
            paddingRight:10
        },
        desctext:{
            fontSize:11,
            fontFamily:fonts.regular,
            textAlign:'center',
            paddingLeft:10,
            paddingRight:10
        },
        poster_image:{
            width:'100%',
            height:'100%'
        },
        optionscontainer:{
            width:'100%',
            height:270,
            marginTop:18
        },
        rowbox:{
         width:'100%',
         height:40,
         flexDirection:'row',
         marginTop:2,
         marginBottom:2
        },
        rowbannerbox:{
            width:60,
            height:'100%',
        },
        rowtext:{
           fontSize:13,
           fontFamily:fonts.book,
           color:colors.text 
        },
        closebox:{
            paddingLeft:10,
            paddingRight:10
        },
        closecontainer:{
            width:'100%',
            height:40,
            backgroundColor:colors.background,
            marginTop:10,
            borderRadius:5,
            borderColor:colors.text,
            borderWidth:0.5,
        },
        closetext:{
            fontSize:13,
            fontFamily:fonts.book,
            color:colors.text
        }
    })
}
export { createThreeStyles }