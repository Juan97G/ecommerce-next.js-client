import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {updateNameApi} from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
import * as Yup from 'yup';

const ChangeNameForm = (props) => {

   /* DESTRUCTURING */
   const {user, logout} = props;
   const {setReloadUser} = useAuth();

   /* STATES */
   const [loading, setLoading] = useState(false);

   /* FORMIK */
   const formik = useFormik({
      initialValues: initialValues(user),
      
      validationSchema: Yup.object(validationSchema()),

      onSubmit: async (datos) => {
         setLoading(true);
         const response = await updateNameApi(user.id, datos, logout);

         if(!response){
            toast.error("Error en la actualización de datos.");
         } else {
            setReloadUser(true);
            toast.success("Información actualizada con éxito!");
         }

         setLoading(false);
      }
   });

   return (
      <div className="change-name-form">
         <h4>Cambia tu nombre y apellido</h4>
         <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
               <Form.Input
                  name="name"
                  placeholder="Tus nombres"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name}
               />
               <Form.Input
                  name="lastname"
                  placeholder="Tus Apellidos"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  error={formik.errors.lastname}
               />
            </Form.Group>
            <Button className="submit" loading={loading}>
               Actualizar
            </Button>
         </Form>
      </div>
   );
};

export default ChangeNameForm;


const initialValues = (user) => {
   return {
      name: user.name || "",
      lastname: user.lastname || ""
   }
}

const validationSchema = () => {
   return {
      name: Yup.string().required(true),
      lastname: Yup.string().required(true)
   }
}