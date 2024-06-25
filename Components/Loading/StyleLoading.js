import {
    StyleSheet,
} from 'react-native'
const styles = StyleSheet.create({
    loadingcontainer: (bgColor) => ({
        flex:1,
        zIndex: 2,
        backgroundColor: (bgColor) ? bgColor : 'rgba(243,118,70,0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    image: (size) => ({
        width: (size) ? size : 150,
        height: (size) ? size : 150,
    })

})

export default styles