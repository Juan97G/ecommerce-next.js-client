import React, {useState, useEffect} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import useCart from "../hooks/useCart";
import {getGameByUrlApi} from "../api/game";
import SummaryCart from "../components/Cart/SummaryCart";
import ShippingAddress from "../components/Cart/ShippingAddress";
import Payment from "../components/Cart/Payment";


const Cart = () => {

   /* DESTRUCTURING */
   const {getProductsCart} = useCart();
   const products = getProductsCart();

   return !products ? <EmptyCart /> : <FullCart products={products} />
};

export default Cart;


const EmptyCart = () => {
   return (
      <BasicLayout className="empty-cart">
         <h2>No hay productos en el carrito...</h2>
      </BasicLayout>
   )
}

const FullCart = ({products}) => {

   const [productsData, setProductsData] = useState(null);
   const [reloadCart, setReloadCart] = useState(false);
   const [address, setAddress] = useState(null);

   useEffect(() => {
      (async () => {
         const productsTmp = [];
         for await (const product of products){
            const data = await getGameByUrlApi(product);
            productsTmp.push(data);
         }

         setProductsData(productsTmp);
      })()
      setReloadCart(false);
   }, [reloadCart]);


   return (
      <BasicLayout className="full-cart">
         <SummaryCart
            products={productsData}
            reloadCart={reloadCart}
            setReloadCart={setReloadCart}
         />
         <ShippingAddress
            setAddress={setAddress}
         />

         { address &&
            <Payment
               products={productsData}
               address={address}
            />
         }
      </BasicLayout>
   )
}