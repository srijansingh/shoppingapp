import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/order";

const initialState = {
    items:{},
    totalAmount:0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addeProduct = action.product;
            const prodPrice = addeProduct.price;
            const prodTitle = addeProduct.title;

            let updatedNewCartItem;

            if(state.items[addeProduct.id]){
                updatedNewCartItem = new CartItem (
                    state.items[addeProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addeProduct.id].sum + prodPrice
                );
            }else{
                updatedNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
                
            }
            return {
                ...state,
                items:{...state.items, [addeProduct.id]:updatedNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            };

        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.pid];
            const currentQty = state.items[action.pid].quantity;
            let updatedCartItems;
            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedItem.quantity - 1, 
                    selectedItem.productPrice, 
                    selectedItem.productTitle, 
                    selectedItem.sum - selectedItem.productPrice
                )
                updatedCartItems = {...state.items, [action.pid]:updatedCartItem}
            }else{
                updatedCartItems = { ...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items:updatedCartItems,
                totalAmount:state.totalAmount - selectedItem.productPrice
            };
        
            case ADD_ORDER:
                return initialState;
    };
    
        
    return state;
}