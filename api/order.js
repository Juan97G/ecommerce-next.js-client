import {BASE_PATH} from "../utils/constants";
import {authFetch} from "../utils/fetch";

export const getOdersApi = async (idUser, logout) => {
   try {
      const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;

      return authFetch(url, null, logout);
   } catch (e) {
      console.log(e);
      return null;
   }
}