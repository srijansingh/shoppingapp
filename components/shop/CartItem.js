import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Ionicons} from "@expo/vector-icons"

const CartItem = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.itemdata}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemdata}> 
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                {
                    props.deletable && (
                        <TouchableOpacity style={styles.remove} onPress={props.onRemove}>
                            <Ionicons 
                                name="md-trash"   
                                size= {23}
                                color="red"
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    card:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
      margin:5,
        backgroundColor:'white',
        elevation:3,
        borderRadius:5,
        overflow:'hidden'
    },
    itemdata:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16,
        paddingHorizontal:5
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    amount:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    remove:{
        marginLeft:15
    }
})
