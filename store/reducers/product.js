import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from "../actions/product";
import Product from "../../models/product";


const initialState = {
    availableProduct: [],
    userProducts: []
};

export default  (state = initialState, action) => {
    switch(action.type){
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts:state.userProducts.filter(product => product.id !== action.pid),
                availableProduct:state.availableProduct.filter(product => product.id !== action.pid)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title, 
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            )
            return {
                ...state,
                availableProduct: state.availableProduct.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT: 
           
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                    action.pid, 
                    state.userProducts[productIndex].ownerId, 
                    action.productData.title,
                    action.productData.imageUrl,
                    action.productData.description,
                    state.userProducts[productIndex].price
                )
            const updatedUserProduct = [...state.userProducts];
            updatedUserProduct[productIndex] = updatedProduct;

            const availableProductIndex = state.availableProduct.findIndex(
                product => product.id === action.pid
                );
            const updatedAvailableProduct = [...state.availableProduct];
            updatedAvailableProduct[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProduct:updatedAvailableProduct,
                userProducts:updatedUserProduct
            }
        case SET_PRODUCT:
            return {
                availableProduct:action.products,
                userProducts:action.userProducts
            }
    }
    return state;
}
