import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import color from '../../constant/color'
import CartItem from './CartItem'
import {Ionicons } from "@expo/vector-icons";

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <TouchableNativeFeedback 
                onPress={()=>{
                    setShowDetails(prev => !prev)
                }}
            >
                <View style={styles.summary}>
                    <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                    <Text style={styles.data}>{props.date}</Text>
                    <View>
                        <Ionicons name={showDetails ? "ios-arrow-up" : "ios-arrow-down"}  size={20} color={color.primary} />
                    </View>
                </View>
            </TouchableNativeFeedback>
           
            {
                showDetails && (
                    <View style={styles.details}>
                    {
                        props.item.map((list) => {
                         return   <CartItem 
                            key={list.productId}
                            quantity={list.quantity}
                            title={list.productTitle}
                            amount={list.sum}
                        
                            />
                        })
                    }
                </View>
                )
            }
        </View>
    )
}



export default OrderItem

const styles = StyleSheet.create({
    orderItem:{
        elevation:1,
        backgroundColor:'white',
        borderRadius:5,
       
        alignItems:'center',
        margin:5,
        overflow:'hidden'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingVertical:20,
        paddingHorizontal:15
    },
    totalAmount:{
     fontFamily:'open-sans-bold',
     fontSize:16,
     color:color.primary   
    },
    date:{
        fontFamily:'open-sans',
        fontSize:1,
        color:'#888' 
    },
    details:{
        width:'100%'
    }
})
