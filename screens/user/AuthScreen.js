import React, {useReducer, useCallback, useState, useEffect} from 'react'
import { StyleSheet, Text,Button, ScrollView, KeyboardAvoidingView, View, ActivityIndicator, Alert } from 'react-native'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import color from "../../constant/color";
import {LinearGradient} from "expo-linear-gradient"
import { useDispatch } from 'react-redux';
import * as authAction from "../../store/actions/auth";


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
};


  

const AuthScreen = (props) => {

    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isError,setError] = useState(null)
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
         email:'',
         password:''
        },
        inputValidities: {
            email:false,
            password:false
        },
        formIsValid:  false
      });

    const authHandler = async() => {
        let action;
        if(isLogin){
          action =   authAction.login(
                formState.inputValues.email,
                formState.inputValues.password
            )
        }
        else{
            action = authAction.signup(
                formState.inputValues.email,
                formState.inputValues.password
            )
        }
        setError(null)
        setIsLoading(true)

        try {
            await dispatch(action);
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }

       
    }

    
    useEffect(()=>{
        if(isError){
            Alert.alert('An error occurred', isError, [
                {text:'Okay'}
            ])
        }
  },[isError])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    

      


    return (
        <KeyboardAvoidingView 
        behavior="padding"
        keyboardVerticalOffset={50}
           
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3df']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
                <Input 
                    id="email"
                    label="E-Mail"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter valid email address"
                    onInputChange={inputChangeHandler}
                    initialValue=""

                />

                <Input 
                    id="password"
                    label="Password"
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="Please enter valid password"
                    onInputChange={inputChangeHandler}
                    initialValue=""

                />
                <View style={styles.button}>
                   {
                       isLoading ? 
                       <ActivityIndicator size="small" color={color.primary} />
                       :
                       <Button 
                            title={isLogin ? "Login" : "Sign Up"} 
                            color={color.primary} 
                            onPress={authHandler} 
                        />
                   }
                    <Button 
                        title={isLogin ? "Switch to Signup" : "Switch to Login"} 
                        color={color.accent} 
                        onPress={()=>{
                            setIsLogin(prev => !prev)
                        }}
                    />
                </View>
                </ScrollView>
            </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}



AuthScreen.navigationOptions = (navData) => {
    return {
        title:'Authentication'
    }
}

export default AuthScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    authContainer:{
        width:'90%',
        padding:10
    },
    button:{
        height:80,
        justifyContent:'space-between',
        marginVertical:5

    }
    
})
