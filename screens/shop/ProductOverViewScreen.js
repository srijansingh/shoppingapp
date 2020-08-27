import React,{useState,useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem';
import * as productAction from "../../store/actions/product"
import * as cartAction from "../../store/actions/cart";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import color from '../../constant/color';

const ProductOverViewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const products = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch();


    const loadProduct = useCallback(async () => {
        setError(null)
        setIsLoading(true);
        try{
            await dispatch(productAction.fetchProduct());
        }catch(err){
            setError(err.message)
        }

        setIsLoading(false)
    }, [dispatch,setIsLoading,setError]);

    useEffect(() => {
        loadProduct();
    }, [dispatch,loadProduct]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProduct);
        return () => {
            willFocusSub.remove();
        }
    }, [loadProduct]);

    if(error){
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>An Error Occurred</Text>
                <Button title="Try Again" onPress={loadProduct} color={color.primary} />
            </View>
        )
    }

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={color.primary} />
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No product found.</Text>
            </View>
        )
    }

    return (
        <FlatList 
        onRefresh={loadProduct}
        refreshing={isLoading}
        style={styles.flatlist}
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => (
               <ProductItem 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    image={itemData.item.imageUrl}
                    onSelect={() => {
                        props.navigation.navigate({routeName:'ProductDetails', params:{
                            productId:itemData.item.id,
                            productTitle:itemData.item.title
                        }})
                    }}
                   
                    
               >
                   <Button color={color.primary} title="View Details" 
                    onPress={() => {
                            props.navigation.navigate({routeName:'ProductDetails', params:{
                                productId:itemData.item.id,
                                productTitle:itemData.item.title
                            }})
                        }
                   }/>
                    <Button color={color.primary} title="Add to Cart" 

                        onPress={() => {
                            dispatch(cartAction.addToCart(itemData.item))
                        }}
                    />

               </ProductItem>
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
    },
    centered:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    error:{
        padding:10
    }
})
