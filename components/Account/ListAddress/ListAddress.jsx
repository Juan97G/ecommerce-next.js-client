import React, {useState, useEffect} from 'react';
import {getAllAddressApi, deleteAddressApi} from "../../../api/address";
import {map, size} from "lodash";
import {Grid, Button} from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import {toast} from "react-toastify";

const ListAddress = ({reloadAddress, setReloadAddress, openModal}) => {

   /* DESTRUCTURING */
   const {auth, logout} = useAuth();

   /* STATES */
   const [addresses, setAddresses] = useState(null);

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getAllAddressApi(auth.idUser, logout);
         setAddresses(response || []);
         setReloadAddress(false);
      })()
   }, [reloadAddress])

   if(!addresses) return null;

   return (
      <div className="list-address">
         {  size(addresses) === 0
            ? (<h3>No existe ninguna dirección...</h3>)
            : (
               <Grid>
                  { map(addresses, (address) => (
                    <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                        <Address
                           address={address}
                           logout={logout}
                           setReloadAddress={setReloadAddress}
                           openModal={openModal}
                        />
                    </Grid.Column>
                  ))}
               </Grid>
            )
         }
      </div>
   );
};

export default ListAddress;


const Address = ({address, logout, setReloadAddress, openModal}) => {

   /* DESTRUCTURING */
   const {title, name, address: adr, state, city, postalCode, phone} = address;

   /* STATES */
   const [loading, setLoading] = useState(false);

   /* FUNCTIONS */
   const deleteAddress = async () => {
      setLoading(true);
      const response = await deleteAddressApi(address._id, logout);

      if(response){
         setReloadAddress(true);
         toast.success("La dirección ha sido eliminada satisfactoriamente");
      } else {
         toast.error("Error al eliminar la dirección");
      }

      setLoading(false);
   }
   
   return (
      <div className="address">
         <p>{title}</p>
         <p>{name}</p>
         <p>{adr}</p>
         <p>{state}, {city} {postalCode}</p>
         <p>{phone}</p>

         <div className="actions">
            <Button primary onClick={() => openModal(`Editar: ${title}`, address)}>Editar</Button>
            <Button onClick={deleteAddress} loading={loading}>Eliminar</Button>
         </div>
      </div>
   )
}
