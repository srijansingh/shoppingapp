import React from 'react'
import { StyleSheet, Text, View, FlatList,Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import color from "../../constant/color";
import CartItem from '../../components/shop/CartItem';
import * as cartAction from "../../store/actions/cart";
import * as orderAction from "../../store/actions/order";
const CartScreen = (props) => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItem = useSelector(state => {
        const listItem = [];
        for(const key in state.cart.items){
            listItem.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return listItem.sort((a,b)=>a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button 
                    color={color.accent} 
                    title="Order Now" 
                    disabled={cartItem.length === 0}
                    onPress={()=>{
                        dispatch(orderAction.addOrder(cartItem, cartTotalAmount))
                    }}
                />
            </View>
            <FlatList 
                data={cartItem}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove = {()=> {
                            dispatch(cartAction.removeFromCart(itemData.item.productId))
                        }}
                        deletable={true}

                    />
                )}
            />
        </View>
    )
}



CartScreen.navigationOptions = () => {
    return {
        title:'My Cart'
    }
}

export default CartScreen

const styles = StyleSheet.create({
    screen:{
        margin:20,

    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        elevation:3,
        borderRadius:10,
        backgroundColor:'white'
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18,

    },
    amount:{
        color:color.accent
    }
})
