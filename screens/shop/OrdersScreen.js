import React, { useEffect, useCallback, useState } from 'react';
import {FlatList, Text, ActivityIndicator,StyleSheet, Button, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderAction from "../../store/actions/order";
import color from '../../constant/color';
const OrdersScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch();

    const loadOrder = useCallback(async () => {
        setError(null)
        setIsLoading(true);
        try{
            await dispatch(orderAction.fetchOrder());
        }catch(err){
            setError(err.message)
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(()=>{
        loadOrder();
    }, [dispatch])


    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadOrder);
        return () => {
            willFocusSub.remove();
        }
    }, [loadOrder]);


    if(error){
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>An Error Occurred</Text>
                <Button title="Try Again" onPress={loadOrder} color={color.primary} />
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

    if(!isLoading && orders.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No product found.</Text>
            </View>
        )
    }

    return (
       <FlatList 
        data={orders}
        renderItem={ItemData =>(
            <OrderItem
                item={ItemData.item.items}
                amount={ItemData.item.totalAmount}
                date={ItemData.item.readableDate}
            />
        )}
       />
    )
}



OrdersScreen.navigationOptions = (navData) => {
    return {
        title:'My Orders',
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

export default OrdersScreen

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