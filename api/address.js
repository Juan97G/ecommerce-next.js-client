import {BASE_PATH} from "../utils/constants";
import {authFetch} from "../utils/fetch";

export const createAddressApi = async (address, logout) => {
   try {
      const url = `${BASE_PATH}/addresses`;
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(address)
      }

      const result = await authFetch(url, params, logout);
      return result;
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const getAllAddressApi = async (idUser, logout) => {
   try {
      const url = `${BASE_PATH}/addresses?user=${idUser}`;

      const result = await authFetch(url, null, logout);
      if(result.statusCode === 500) throw "Error del servidor";

      return result;
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const deleteAddressApi = async (idAddress, logout) => {
   try {
      const url = `${BASE_PATH}/addresses/${idAddress}`;
      const params = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json"
         }
      }

      const result = await authFetch(url, params, logout);
      if(result.statusCode === 500) throw "Error del servidor";

      return true;
   } catch (e) {
      console.log(e);
      return false;
   }
}

export const updateAddressApi = async (idAddress, address, logout) => {
   try {
      const url = `${BASE_PATH}/addresses/${idAddress}`;
      const params = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(address)
      }

      const result = await authFetch(url, params, logout);
      if(result.statusCode === 500) throw "Error del servidor";

      return result;
   } catch (e) {
      console.log(e);
      return null;
   }
}