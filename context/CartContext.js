import {createContext} from "react";

const CartContext = createContext({
   productsCart: 0,
   getProductsCart: () => null,
   addProductCart: () => null,
   removeProductCart: () => null,
   removeAllProductsCart: () => null
});

export default CartContext;