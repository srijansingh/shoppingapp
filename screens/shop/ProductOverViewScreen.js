import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem';

import * as cartAction from "../../store/actions/cart";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductOverViewScreen = (props) => {

    const products = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch()

    return (
        <FlatList 
        style={styles.flatlist}
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => (
               <ProductItem 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    image={itemData.item.imageUrl}
                    onViewDetail={() => {
                        props.navigation.navigate({routeName:'ProductDetails', params:{
                            productId:itemData.item.id,
                            productTitle:itemData.item.title
                        }})
                    }}

                    onAddToCart = {() => {
                        dispatch(cartAction.addToCart(itemData.item))
                    }}
               />
            )}
        />
    )
}

ProductOverViewScreen.navigationOptions = (navData) => {
    return {
        title:'All Products',
        headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Cart"
                    iconName="md-cart"
                    onPress={()=> {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
         ),
         headerLeft : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Menu"
                iconName="md-menu"
                onPress={()=> {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>
         )
    }
}

export default ProductOverViewScreen;

const styles = StyleSheet.create({
    flatlist:{
        width:'100%',
        padding:10
    }
})
