import React, {useState, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {getOdersApi} from "../api/order";
import {size, map} from "lodash";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import Order from "../components/Orders/Order";


const Orders = () => {

   /* ORDERS */
   const [orders, setOrders] = useState(null);

   /* DESTRUCTURING */
   const {auth, logout} = useAuth();

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getOdersApi(auth.idUser, logout);
         setOrders(response || []);
      })()
   }, [])

   return (
      <BasicLayout className="orders">
         <div className="orders__block">
            <div className="title">Mis Pedidos</div>
            <div className="data">
               { size(orders) === 0
                  ? (
                     <h2 style={{textAlign: 'center'}}>Todavía no ha realizado ningún pedido.</h2>
                  ) : (
                     <Grid>
                        {map(orders, (order) => (
                           <Grid.Column mobile={16} tablet={8} computer={8}>
                              <Order
                                 order={order}
                              />
                           </Grid.Column>
                        ))}
                     </Grid>
                  )
               }
            </div>
         </div>
      </BasicLayout>
   );
};

export default Orders;
