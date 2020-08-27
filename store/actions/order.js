import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER ='SET_ORDER';



export const fetchOrder = () => {
    return async (dispatch,getState) => {
        const token=getState().auth.token
        const userId=getState().auth.userId
        try{
            const response =  await fetch(`https://shop-e3152.firebaseio.com/orders/${userId}.json`);
            
            if(!response.ok){
                throw newError('Something went wrong')
            }
          const resData = await response.json();
          const loadedOrder = [];

          for(const key in resData){
            loadedOrder.push(new Order(
                key,
                resData[key].cartItems,
                resData[key].totalAmount,
                resData[key].date
              ));
          }
          
          dispatch({type:SET_ORDER, orders:loadedOrder})
        }catch(err){
            throw err;
        }

    }
} 

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch,getState) => { 
        const token=getState().auth.token
        const userId=getState().auth.userId
        const date = new Date();
        const response =  await fetch(`https://shop-e3152.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                cartItems,
                totalAmount,
                data: date.toISOString()
            })
        });

        const resData = await response.json();

        console.log(resData)

       dispatch({
        type: ADD_ORDER, 
        orderData: {id: resData.name, items:cartItems, amount:totalAmount, date:date} 
       })
}}