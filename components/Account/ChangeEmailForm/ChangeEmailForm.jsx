import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {updateEmailApi} from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";


const ChangeEmailForm = (props) => {

   /* DESTRUCTURING */
   const {user, logout} = props;
   const {setReloadUser} = useAuth();

   /* STATES */
   const [loading, setLoading] = useState(false);

   /* FORMIK */
   const formik = useFormik({
      initialValues: initialValues(),

      validationSchema: Yup.object(validationSchema()),

      onSubmit: async (formData) => {
         setLoading(true);
         const response = await updateEmailApi(user.id, formData.email, logout);

         if(!response || response?.statusCode === 400){
            toast.error("Error al actualizar el Email");
         } else {
            setReloadUser(true);
            formik.handleReset();
            toast.success("Email actualizado con éxito");
         }

         setLoading(false);
      }
   });

   return (
      <div className="change-email-form">
         <h4>Cambia tu email <span>(Tu Email actual: {user.email})</span></h4>

         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
               <Form.Input
                  name="email"
                  placeholder="Tu nuevo email"
                  value={formik.values.email}
                  error={formik.errors.email}
                  onChange={formik.handleChange}
               />
               <Form.Input
                  name="repeatEmail"
                  placeholder="Confirma tu nuevo email"
                  value={formik.values.repeatEmail}
                  error={formik.errors.repeatEmail}
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

export default ChangeEmailForm;


const initialValues = () => {
   return {
      email: "",
      repeatEmail: ""
   }
}

const validationSchema = () => {
   return {
      email: Yup.string()
                .email(true)
                .required(true)
                .oneOf([Yup.ref("repeatEmail")], true),

      repeatEmail: Yup.string()
                      .email(true)
                      .required(true)
                      .oneOf([Yup.ref("email")], true)
   }
}
