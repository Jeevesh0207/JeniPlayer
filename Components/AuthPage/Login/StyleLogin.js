import {
    StyleSheet
} from 'react-native'

import { fonts } from '../../../constants';

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
            position: 'relative',
            backgroundColor: colors.background
        },
        banner: {
            width: '100%',
            height: '100%'
        },

        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor:'rgba(0,0,0,0.7)'
        },
        title: {
            fontSize: 35,
            fontFamily: fonts.magic,
            color: '#fff',
            marginBottom: 20,
            textAlign: 'center'
        },
        subtitle: {
            fontSize: 15,
            fontFamily: fonts.book,
            color: '#fff',
            marginBottom: 20,
            paddingHorizontal:15,
            textAlign: 'center',
            lineHeight:25
        },
        button: {
            backgroundColor: colors.solidcolor,
            width: '90%',
            height: 45,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 10
        },
        buttonText: {
            fontSize: 15,
            fontFamily: fonts.book,
            color: '#fff',
            textAlign: 'center'
        },
        inputbox: {
            fontSize: 16,
            fontFamily: fonts.book,
            color: '#fff',
        },
        forgotbtn: {
            width: '100%',
            alignItems: 'flex-end',
            fontFamily: fonts.regular
        },
        forgottext: {
            fontSize: 13,
            fontFamily: fonts.regular,
            color: '#fff',
        },
        btn: {
            backgroundColor: colors.solidcolor,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
            paddingVertical: 10
        },
        btntext:{
            fontFamily:fonts.book,
            fontSize:14
        },
        createcontainer:{
            width:'100%',
            height:20,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
        },
        createbox:{
            fontFamily:fonts.book,
            fontSize:14,
            color:'#fff',
        },
        createtext:{
            fontFamily:fonts.regular,
            fontSize:14,
            color:colors.solidcolor,
            marginLeft:5
        }

    })
}

export { createStyles };