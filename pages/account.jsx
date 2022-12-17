import React, {useState, useEffect} from 'react';
import {Icon} from "semantic-ui-react";
import {useRouter} from "next/router";
import {getMeApi} from "../api/user";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

const Account = () => {

   const router = useRouter();
   
   /* STATES */
   const [user, setUser] = useState(undefined);

   /* DESTRUCTURING */
   const {auth, logout} = useAuth();

   /* USE EFFECT */
   useEffect(() => {
      (async () => {
         const response = await getMeApi(logout);
         setUser(response || null);
      })()
   }, [auth]);


   if(user === undefined) return null;
   if(!auth && !user) {
      router.replace("/");
      return null;
   }

   return (
      <BasicLayout className="account">
         <Configuration
            user={user}
            logout={logout}
         />

         <Addresses />
      </BasicLayout>
   );
};

export default Account;



const Configuration = (props) => {

   /* DESTRUCTURING */
   const {user, logout} = props;

   return (
      <div className="account__configuration">
         <div className="title">Configuración</div>
         <div className="data">
            <ChangeNameForm
               user={user}
               logout={logout}
            />
            <ChangeEmailForm
               user={user}
               logout={logout}
            />
            <ChangePasswordForm
               user={user}
               logout={logout}
            />
         </div>
      </div>
   )
}

const Addresses = () => {

   /* STATES */
   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("");
   const [formModal, setFormModal] = useState(null);
   const [reloadAddress, setReloadAddress] = useState(false);

   const openModal = (title, address) => {
      setTitleModal(title);
      setFormModal(
         <AddressForm
            setShowModal={setShowModal}
            setReloadAddress={setReloadAddress}
            newAddress={!address}
            address={address || null}
         />
      );
      setShowModal(true);
   }

   return(
      <div className="account__addresses">
         <div className="title">
            Direcciones
            <Icon name="plus" link onClick={() => openModal("Nueva Dirección")} />
         </div>
         <div className="data">
            <ListAddress
               reloadAddress={reloadAddress}
               setReloadAddress={setReloadAddress}
               openModal={openModal}
            />
         </div>


         <BasicModal
            show={showModal}
            setShow={setShowModal}
            title={titleModal}
         >
            {formModal}
         </BasicModal>
      </div>
   )
}
