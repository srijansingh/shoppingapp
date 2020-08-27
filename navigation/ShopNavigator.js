import React from 'react';
import { createStackNavigator } from "react-navigation-stack"
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen"
import color from "../constant/color"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import ProductDetailScreen from "../screens/shop/ProductDetailScreen"
import CartScreen from "../screens/shop/CartScreen"
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer"
import OrdersScreen from "../screens/shop/OrdersScreen"
import { Ionicons } from "@expo/vector-icons"
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProduct from '../screens/user/EditProduct';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { View, SafeAreaView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authAction from "../store/actions/auth"







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


const AdminNavigator = createStackNavigator({
    UsersProduct: UserProductScreen,
    Edit: EditProduct
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name="md-contact"  size={23} color={drawerConfig.tintColor}  />
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
    Orders: OrderNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor: color.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{flex:1, paddingTop:36}}>
                <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
                    <DrawerItems {...props} />
                    <Button 
                        title="Logout" 
                        color={color.primary} 
                        onPress={() => {
                            dispatch(authAction.logout())
                        }}    
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: {
        screen:AuthScreen
    }
})


const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth:AuthNavigator,
    Shop: ShopNavigator
})

export default   createAppContainer(MainNavigator)