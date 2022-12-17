import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {registerApi} from "../../../api/user";

const RegisterForm = (props) => {

   /* DESTRUCTURING */
   const {showLoginForm} = props;
   
   /* STATES */
   const [loading, setLoading] = useState(false);

   /* FORMIK */
   const formik = useFormik({
      initialValues: initialValues(),

      validationSchema: Yup.object(validationSchema()),

      onSubmit: async (formData) => {
         setLoading(true);
         const response = await registerApi(formData);
         console.log(response);

         if(response?.jwt){
            toast.success("Registro Exitoso!");
            showLoginForm();
         } else {
            toast.error("Error en el registro.");
         }

         setLoading(false);
      }
   })

   return (
      <Form className="login-form" onSubmit={formik.handleSubmit}>
         <Form.Input
            name="name"
            type="text"
            placeholder="Nombres"
            onChange={formik.handleChange}
            error={formik.errors.name}
         />

         <Form.Input
            name="lastname"
            type="text"
            placeholder="Apellidos"
            onChange={formik.handleChange}
            error={formik.errors.lastname}
         />

         <Form.Input
            name="username"
            type="text"
            placeholder="Nombre de Usuario"
            onChange={formik.handleChange}
            error={formik.errors.username}
         />

         <Form.Input
            name="email"
            type="text"
            placeholder="Email"
            onChange={formik.handleChange}
            error={formik.errors.email}
         />

         <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password}
         />

         <div className="actions">
            <Button type="button" basic onClick={showLoginForm}>
               Iniciar Sesión
            </Button>
            <Button type="submit" className="submit" loading={loading}>
               Registrar
            </Button>
         </div>
      </Form>
   );
};

export default RegisterForm;


function initialValues(){
   return {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: ""
   }
}

function validationSchema(){
   return {
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
      username: Yup.string().required(true),
      email: Yup.string().email().required(true),
      password: Yup.string().required(true)
   }
}