import React from 'react';
import { createStackNavigator } from "react-navigation-stack"
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen"
import color from "../constant/color"
import { createAppContainer } from "react-navigation"
import ProductDetailScreen from "../screens/shop/ProductDetailScreen"
import CartScreen from "../screens/shop/CartScreen"
import { createDrawerNavigator } from "react-navigation-drawer"
import OrdersScreen from "../screens/shop/OrdersScreen"
import { Ionicons } from "@expo/vector-icons"

const ProductNavigator = createStackNavigator({
    ProductOverview : {
        screen : ProductOverViewScreen
    },
    ProductDetails:{
        screen:ProductDetailScreen
    },
    Cart:{
        screen:CartScreen
    }
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name="md-cart"  size={23} color={drawerConfig.tintColor}  />
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: color.primary
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerTintColor:'white'
    }
})


const OrderNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name="md-list"  size={23} color={drawerConfig.tintColor}  />
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: color.primary
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerTintColor:'white'
    }
}

)

const ShopNavigator = createDrawerNavigator({
    Products : ProductNavigator,
    Orders: OrderNavigator
},{
    contentOptions:{
        activeTintColor: color.primary
    }
})


export default   createAppContainer(ShopNavigator)