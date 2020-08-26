import React, {useState, useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as productAction from "../../store/actions/product";


const EditProduct = (props) => {

    const productId = props.navigation.getParam('productId');

    const available = useSelector(state => state.products.availableProduct);
    const detail = available.find(product => product.id === productId)


    const [title, setTitle] = useState(detail ? detail.title : '');
    const [price, setPrice] = useState('');
    const [imageUrl, setImage] = useState(detail ? detail.imageUrl : '')
    const [description, setDescription] = useState(detail ? detail.description : '')

    const dispatch = useDispatch();

    const submitHandler = useCallback(()=>{
        if(detail){
            dispatch(productAction.upateProduct(productId,title,description, imageUrl))
        }
        else{
            dispatch(productAction.createProduct(title,description, imageUrl, +price))
        }
        props.navigation.goBack();
    }, [dispatch,productId,title,description, imageUrl,price ])

    useEffect(()=>{
        props.navigation.setParams({submit : submitHandler})
    },[submitHandler])


    
    return (-
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView>
            <View style={styles.form}>
                <View style={styles.fonmControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title} 
                        onChangeText={text => setTitle(text)}
                        autoCapitalize='sentences'
                        keyboardType='default' 
                        autoCorrect
                    />
                </View>
                <View style={styles.fonmControl}>
                        <Text style={styles.label}>Image</Text>
                        <TextInput 
                            style={styles.input}  
                            value={imageUrl} 
                            onChangeText={text => setImage(text)}
                            keyboardType='numeric' 
                        />
                </View>
                {
                    !detail && (
                        <View style={styles.fonmControl}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} 
                            />
                        </View>
                    )
                }
                <View style={styles.fonmControl}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} 
                        />
                </View>
            </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}

EditProduct.navigationOptions = (navData) => {
    const title= navData.navigation.getParam('productTitle');
    const submit = navData.navigation.getParam('submit');
    return {
        title:title,
        headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                
            <Item 
                title="Save"
                iconName="md-checkmark"
                onPress={submit}
            />
          
        </HeaderButtons>
        )
    }
}

export default EditProduct

const styles = StyleSheet.create({
    form:{
        margin:20,
    },
    fonmControl:{
        width:'100%',
        elevation:2,
        marginVertical:5,
        backgroundColor:'#fff',
        padding:10,
        borderRadius:5
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        flexWrap:'wrap'
    }
})
