import React, { useEffect } from 'react'
import { StyleSheet,ActivityIndicator, View, AsyncStorage } from 'react-native'
import color from "../constant/color";
import * as authAction from "../store/actions/auth";
import { useDispatch } from 'react-redux';

const StartupScreen = (props) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('Auth');
                return;
            }
            const transformData = JSON.parse(userData)
            const {token, userId, expiryDate} = transformData;

            const expirationDate = new Date(expiryDate);
            
            if(expirationDate <= new Date() || !token || !userId ){
                props.navigation.navigate('Auth');
                return;
            }
            const expiryTime = expirationDate.getTime() - new Date().getTime();
            props.navigation.navigate('Shop')
            dispatch(authAction.authenticate(userId, token, expiryDate));
        }

        tryLogin()
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={color.primary} />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    screen:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }
})
