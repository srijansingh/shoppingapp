import React from 'react';
import {FlatList, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {

    const orders = useSelector(state => state.orders.orders)

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

