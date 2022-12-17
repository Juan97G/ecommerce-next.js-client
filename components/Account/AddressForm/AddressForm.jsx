import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import {createAddressApi, updateAddressApi} from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";
import {toast} from "react-toastify";

const AddressForm = ({setShowModal, setReloadAddress, newAddress, address}) => {

   /* DESTRUCTURING */
   const {auth, logout} = useAuth();

   /* STATES */
   const [loading, setLoading] = useState(false);

   /* FORMIK */
   const formik = useFormik({
      initialValues: initialValues(address),

      validationSchema: Yup.object(validationSchema()),

      onSubmit: (formData) => {
         newAddress
         ? createAddress(formData)
         : updateAddress(formData)
      }
   });

   /* FUNCTIONS */
   const createAddress = async (formData) => {
      setLoading(true);
      const formDataTemp = {
         ...formData,
         user: auth.idUser
      }
      const response = await createAddressApi(formDataTemp, logout);

      if(!response){
         toast.error("Error en la creación de la dirección");
         setLoading(false);
      } else {
         formik.resetForm();
         setLoading(false);
         setReloadAddress(true);
         toast.success("Dirección creada con éxito");
         setShowModal(false);
      }
   }

   const updateAddress = async (formData) => {
      setLoading(true);
      const formDataTemp = {
         ...formData,
         user: auth.idUser
      }

      const response = await updateAddressApi(address._id, formDataTemp, logout);

      if(!response){
         toast.error("Error al actualizar la dirección");
         setLoading(false);
      } else {
         toast.success("Dirección actualizada con éxito");
         setReloadAddress(true);
         setLoading(false);
         setShowModal(false);
      }
   }


   return (
      <Form onSubmit={formik.handleSubmit}>
         <Form.Input
            name="title"
            type="text"
            label="Titulo de la dirección"
            placeholder="Titulo de la dirección"
            value={formik.values.title}
            error={formik.errors.title}
            onChange={formik.handleChange}
         />

         <Form.Group widths="equal">
            <Form.Input
               name="name"
               type="text"
               label="Nombre completo"
               placeholder="Nombres y apellidos"
               value={formik.values.name}
               error={formik.errors.name}
               onChange={formik.handleChange}
            />
            <Form.Input
               name="address"
               type="text"
               label="Dirección"
               placeholder="Dirección"
               value={formik.values.address}
               error={formik.errors.address}
               onChange={formik.handleChange}
            />
         </Form.Group>
         <Form.Group widths="equal">
            <Form.Input
               name="city"
               type="text"
               label="Ciudad"
               placeholder="Ciudad"
               value={formik.values.city}
               error={formik.errors.city}
               onChange={formik.handleChange}
            />
            <Form.Input
               name="state"
               type="text"
               label="Departamento/Provincia"
               placeholder="Departamento/Provincia"
               value={formik.values.state}
               error={formik.errors.state}
               onChange={formik.handleChange}
            />
         </Form.Group>
         <Form.Group widths="equal">
            <Form.Input
               name="postalCode"
               type="text"
               label="Código Postal"
               placeholder="Código Postal"
               value={formik.values.postalCode}
               error={formik.errors.postalCode}
               onChange={formik.handleChange}
            />
            <Form.Input
               name="phone"
               type="text"
               label="Número de Teléfono"
               placeholder="Número de Teléfono"
               value={formik.values.phone}
               error={formik.errors.phone}
               onChange={formik.handleChange}
            />
         </Form.Group>
         <div className="actions">
            <Button className="submit" type="submit" loading={loading}>
               { newAddress ? "Crear Dirección" : "Actualizar Dirección" }
            </Button>
         </div>
      </Form>
   );
};

export default AddressForm;


const initialValues = (address) => {
   return {
      title: address?.title || "",
      name: address?.name || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      phone: address?.phone || ""
   }
}

const validationSchema = () => {
   return {
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      address: Yup.string().required(true),
      city: Yup.string().required(true),
      state: Yup.string().required(true),
      postalCode: Yup.string().required(true),
      phone: Yup.string().required(true)
   }
}
