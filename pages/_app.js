import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {useMemo, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import jwtDecode from "jwt-decode";
import {getToken, setToken, removeToken} from "../api/token";
import {
   addProductCartApi,
   getProductsCartApi,
   countProductsCart,
   removeProductCartApi,
   removeAllProductsCartApi
} from "../api/cart";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {

   const [auth, setAuth] = useState(undefined);
   const [reloadUser, setReloadUser] = useState(false);
   const [totalProductsCart, setTotalProductsCart] = useState(0);
   const [reloadCart, setReloadCart] = useState(false);

   const router = useRouter();

   useEffect(() => {
      const token = getToken();
      if(token){
         setAuth({
            token,
            idUser: jwtDecode(token).id
         });
      } else {
         setAuth(null);
      }

      setReloadUser(false);
   }, [reloadUser]);

   useEffect(() => {
      setTotalProductsCart(countProductsCart());
      setReloadCart(false);
   }, [reloadCart, auth]);

   

   const login = (token) => {
      setToken(token);
      setAuth({
         token,
         idUser: jwtDecode(token).id
      });
   }

   const logout = () => {
      if(auth){
         removeToken();
         setAuth(null);
         router.push("/");
      }
   }

   const authData = useMemo(
      () => ({
         auth,
         login,
         logout,
         setReloadUser,
      }), [auth]
   )

   /*--------------------------------------------------*/

   const addProduct = (product) => {
      const token = getToken();
      if(token){
         addProductCartApi(product);
         setReloadCart(true);
      } else {
         toast.warning("Debes iniciar sesión para comprar un juego");
      }
   }

   const removeProduct = (product) => {
      removeProductCartApi(product);
      setReloadCart(true);
   }

   const cartData = useMemo(
      () => ({
         productsCart: totalProductsCart,
         getProductsCart: getProductsCartApi,
         addProductCart: (product) => addProduct(product),
         removeProductCart: (product) => removeProduct(product),
         removeAllProductsCart: removeAllProductsCartApi
      }), [totalProductsCart]
   )

   if(auth === undefined) return null;

  return (
        <AuthContext.Provider value={authData}>
           <CartContext.Provider value={cartData}>
              <Component {...pageProps} />
              <ToastContainer
                 position="top-right"
                 autoClose={5000}
                 hideProgressBar
                 newestOnTop
                 closeOnClick
                 rtl={false}
                 pauseOnFocusLoss={false}
                 draggable
                 pauseOnHover
              />
           </CartContext.Provider>
        </AuthContext.Provider>
  )
}

export default MyApp;
