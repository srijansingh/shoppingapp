import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableNativeFeedback } from 'react-native'


const ProductItem = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onSelect} useForeground>
         <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:props.image}}/>
            </View>
            <View style={styles.detail}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price}</Text>
            </View>
            
            <View style={styles.action}>
                {props.children}
            </View>
               
        </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    product:{
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        minHeight:250,
        maxHeight:300,
        marginVertical:5,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    title:{
        fontSize:18,
        marginVertical:3,
        fontFamily:'open-sans-bold'
    },
    price:{
        fontSize:18,
        color:"#888"
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'23%',
        paddingHorizontal:20
    },
    detail:{
        alignItems:'center',
        height:'17%',
        padding:10
    },
    imageContainer:{
        width:'100%',
        height:'60%'
    }
})


export default ProductItem