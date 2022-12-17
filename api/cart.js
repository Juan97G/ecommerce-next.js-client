import {BASE_PATH, CART} from "../utils/constants";
import {toast} from "react-toastify";
import {size, includes, remove} from "lodash";
import {authFetch} from "../utils/fetch";

export const getProductsCartApi = () => {
   const cart = localStorage.getItem(CART);

   if(!cart){
      return null;
   } else {
      const products = cart.split(",");
      return products;
   }
}

export const addProductCartApi = (product) => {
   const cart = getProductsCartApi();

   if(!cart){
      localStorage.setItem(CART, product);
      toast.success("Producto añadido al carrito");
   } else {
      const productFound = includes(cart, product);

      if(productFound){
         toast.warning("El producto ya existe en el carrito");
      } else {
         cart.push(product);
         localStorage.setItem(CART, cart);
         toast.success("Producto añadido correctamente");
      }
   }
}

export const countProductsCart = () => {
   const cart = getProductsCartApi();

   if(!cart){
      return 0;
   } else {
      return size(cart);
   }
}

export const removeProductCartApi = (product) => {
   const cart = getProductsCartApi();

   remove(cart, (item) => {
      return item === product
   })

   if(size(cart) > 0){
      localStorage.setItem(CART, cart);
   } else {
      localStorage.removeItem(CART);
   }
}

export const paymentCartApi = async (token, products, idUser, address, logout) => {
   try {
      const addressShipping = address;
      delete addressShipping.user;
      delete addressShipping.createdAt;

      const url = `${BASE_PATH}/orders`;
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            token,
            products,
            idUser,
            address: addressShipping
         })
      }

      return await authFetch(url, params, logout);
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const removeAllProductsCartApi = () => {
   localStorage.removeItem(CART);
}