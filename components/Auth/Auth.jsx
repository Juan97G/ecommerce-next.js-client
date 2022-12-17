import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = (props) => {

   /* DESTRUCTURING */
   const {onCloseModal, setTitleModal} = props;


   /* STATES */
   const [showLogin, setShowLogin] = useState(true);


   /* FUNCTIONS */
   const showLoginForm = () => {
      setShowLogin(true);
      setTitleModal("Iniciar Sesión");
   }

   const showRegisterForm = () => {
      setShowLogin(false);
      setTitleModal("Crear Nuevo Usuario");
   }

   return showLogin
            ? (
               <LoginForm
                  showRegisterForm={showRegisterForm}
                  onCloseModal={onCloseModal}
               />
              )
            : (
               <RegisterForm showLoginForm={showLoginForm} />
              )

};

export default Auth;
