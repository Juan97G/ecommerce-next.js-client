import React, {useState, useEffect} from 'react';
import {Grid, Button} from "semantic-ui-react";
import {size, map} from "lodash";
import Link from "next/link";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import {getAllAddressApi} from "../../../api/address";

const ShippingAddress = (props) => {

   /* DESTRUCTURING */
   const {setAddress} = props;
   const {auth, logout} = useAuth();

   /* STATES */
   const [addresses, setAddresses] = useState(null);
   const [addressActive, setAddressActive] = useState(null);

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getAllAddressApi(auth.idUser, logout);
         setAddresses(response || []);
      })()
   }, [])

   /* FUNCTIONS */
   const changeAddress = (address) => {
      setAddressActive(address._id);
      setAddress(address);
   }

   return (
      <div className="shipping-address">
         <div className="title">Dirección de envío</div>
         <div className="data">
            { size(addresses) === 0
               ? (
                  <h3>No hay direcciones... <Link href="/account"><a>Añadir tu primera dirección</a></Link></h3>
                 )
               : (
                  <Grid>
                     {map(addresses, (address) => (
                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                           <div className={classNames("address", {
                              active: addressActive === address._id
                           })}
                           onClick={() => changeAddress(address)}
                           >
                              <p>{address.title}</p>
                              <p>{address.name}</p>
                              <p>{address.address}</p>
                              <p>{address.city}, {address.state} {address.postalCode}</p>
                              <p>{address.phone}</p>
                           </div>
                        </Grid.Column>
                     ))}
                  </Grid>
                 )
            }
         </div>
      </div>
   );
};

export default ShippingAddress;
