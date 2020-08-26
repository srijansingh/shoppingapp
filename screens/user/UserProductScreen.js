import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import color from '../../constant/color'
import * as productAction from "../../store/actions/product";



const UserProductScreen = (props) => {

   

    const userProduct = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?','You product will be deleted!', [
            {text:'No', style:'default'},
            {
                text:'Yes', style:'destructive', 
                onPress: () => 
                    dispatch(productAction.deleteProduct(id)
                ) 
            }
        ] )
    }

    return (
        <FlatList
            style={styles.flatlist}
            data={userProduct}
            keyExtractor={item => item.id}
            renderItem = {itemData => {
                return (
                    <ProductItem 
                        price={itemData.item.price}
                        title={itemData.item.title}
                        image={itemData.item.imageUrl}
                        onSelect={() => {
                            props.navigation.navigate({routeName:'ProductDetails', params:{
                                productId:itemData.item.id,
                                productTitle:itemData.item.title
                            }})
                        }}
                       
                    >
                        <Button color={color.primary} title="Edit Details" 
                            onPress={() => {
                                props.navigation.navigate({routeName:'Edit', params:{
                                    productId:itemData.item.id,
                                    productTitle:itemData.item.title
                                }})
                            }}
                        />
                        <Button color={color.primary} title="Delete" 

                            onPress={deleteHandler.bind(this, itemData.item.id)}
                        />
                    </ProductItem>
                )
            }}
        />
    )
}

UserProductScreen.navigationOptions = (navData) => {
    return {
        title:'Admin Products',
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
        ),
        headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                
            <Item 
                title="Add"
                iconName="md-add"
                onPress={()=>{
                    navData.navigation.navigate({routeName:'Edit', params:{
                        productTitle:'Add Product'
                    }})
                }}
            />
          
        </HeaderButtons>
        )
    }
}

export default UserProductScreen

const styles = StyleSheet.create({
    flatlist:{
        width:'100%',
        padding:10
    }
})
