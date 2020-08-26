import React from 'react'
import { StyleSheet, Text, View, ScrollView,Image, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import color from "../../constant/color";
import * as cartAction from "../../store/actions/cart"

const ProductDetailScreen = (props) => {

    const productId = props.navigation.getParam('productId');

    const availableProduct = useSelector(state => state.products.availableProduct);

    const productDetails = availableProduct.find(product => product.id === productId);

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri:productDetails.imageUrl}} />
            <View style={styles.action}>
            <Button color={color.primary} title="Add to Cart"
                onPress = {() => {
                    dispatch(cartAction.addToCart(productDetails))
                }}

            />
            </View>
            <Text style={styles.price}>${productDetails.price.toFixed(2)}</Text>
            <Text style={styles.description}>{productDetails.description}</Text>
        </ScrollView>
    )
}


ProductDetailScreen.navigationOptions = (navData) => {
    const titles = navData.navigation.getParam('productTitle');

    return {
        title : titles
    }
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontSize:20,
        color:"#888",
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold'
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily:'open-sans-bold'
    },
    action:{
        marginVertical:10,
        alignItems:'center'
    }
})
