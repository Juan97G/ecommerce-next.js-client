import React, {useState} from 'react';
import {Button} from "semantic-ui-react";
import {useRouter} from "next/router";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import {size} from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import {paymentCartApi} from "../../../../api/cart";

const FormPayment = (props) => {

   /* DESTRUCTURING */
   const {products, address} = props;
   const {auth, logout} = useAuth();
   const {removeAllProductsCart} = useCart();

   /* STATES */
   const [loading, setLoading] = useState(false);

   /* HOOKS */
   const stripe = useStripe();
   const elements = useElements();
   const router = useRouter();

   /* FUNCTIONS */
   const handleSubmit = async (ev) => {
      ev.preventDefault();
      setLoading(true);

      if(!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.createToken(cardElement);

      if(result.error){
         toast.error(result.error.message);
      } else {
         const response = await paymentCartApi(result.token, products, auth.idUser, address, logout);

         if(size(response) > 0){
            toast.success("Pedido realizado satisfactoriamente");
            removeAllProductsCart();
            router.push("/orders");
         } else {
            toast.error("Error al realizar el pedido");
         }
      }

      setLoading(false);
   }

   return (
      <form className="form-payment" onSubmit={handleSubmit}>
         <CardElement />
         <Button
            type="submit"
            loading={loading}
            disabled={!stripe}
         >
            Pagar
         </Button>
      </form>
   );
};

export default FormPayment;
