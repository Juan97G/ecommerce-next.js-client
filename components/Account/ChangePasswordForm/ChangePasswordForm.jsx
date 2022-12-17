import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import {updatePasswordApi} from "../../../api/user";
import * as Yup from "yup";
import {toast} from "react-toastify";

const ChangePasswordForm = (props) => {

   /* DESTRUCTURING */
   const {user, logout} = props;

   /* STATES */
   const [loading, setLoading] = useState(false);

   /* FORMIK */
   const formik = useFormik({
      initialValues: initialValues(),

      validationSchema: Yup.object(validationSchema()),

      onSubmit: async (formData) => {
         setLoading(true);

         const response = updatePasswordApi(user.id, formData.password, logout);

         if(!response){
            toast.error("Error al actualizar la contraseña");
         } else {
            toast.success("Contraseña actualizada con éxito");
            logout();
         }

         setLoading(false);
      }
   });

   return (
      <div className="change-password-form">
         <h4>Cambia tu contraseña</h4>
         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
               <Form.Input
                  name="password"
                  type="password"
                  placeholder="Tu nueva contraseña"
                  value={formik.values.password}
                  error={formik.errors.password}
                  onChange={formik.handleChange}
               />
               <Form.Input
                  name="repeatPassword"
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  value={formik.values.repeatPassword}
                  error={formik.errors.repeatPassword}
                  onChange={formik.handleChange}
               />
            </Form.Group>
            <Button className="submit" loading={loading}>
               Actualizar
            </Button>
         </Form>
      </div>
   );
};

export default ChangePasswordForm;


const initialValues = () => {
   return {
      password: "",
      repeatPassword: ""
   }
}

const validationSchema = () => {
   return {
      password: Yup.string()
                   .required(true)
                   .oneOf([Yup.ref("repeatPassword")], true),

      repeatPassword: Yup.string()
                         .required(true)
                         .oneOf([Yup.ref("password")], true)
   }
}
