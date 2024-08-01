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
        bannerContainer: {
            flex: 1,
            position:'relative'
        },
        banner: {
            width: '100%',
            height: '100%'
        },

        container: {
            position:'absolute',
            top:0,
            left:0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingLeft:20,
            paddingRight:20
        },
        title:{
            fontSize:25,
            fontFamily:fonts.book,
            color:'#fff',
            textAlign:'center'
        },
        subtitle:{
            fontSize:15,
            fontFamily:fonts.book,
            color:'#fff',
            marginBottom:30,
            marginTop:30,
            textAlign:'center',
            lineHeight:25
        },
        posterbox:{
            width:150,
            aspectRatio:1,
            borderRadius:100,
            overflow:'hidden'
        },
        poster:{
            width:'100%',
            height:'100%',
        },
        button:{
            backgroundColor: colors.solidcolor,
            width:'90%',
            height:45,
            borderRadius: 5,
            marginTop:10,
            marginBottom:10
        },
        buttonText:{
            fontSize:14,
            fontFamily:fonts.book,
            color:'#fff',
            textAlign:'center'
        }

    })
}

export { createStyles };