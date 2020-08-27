import React,{useState} from 'react';

import * as Font from "expo-font";
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';

import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

import ReduxThunk from "redux-thunk"
import NavigationContainer from './navigation/NavigationContainer';
const fetchFont = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const rootReducer = combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders:orderReducer,
  auth:authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading
              startAsync={fetchFont} 
              onFinish={()=>setDataLoaded(true)} 
            />;
  }


  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
