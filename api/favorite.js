import {BASE_PATH} from "../utils/constants";
import {authFetch} from "../utils/fetch";
import {size} from "lodash";


export const isFavoriteApi = async (idUser, idGame, logout) => {
   try {
      const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;

      return await authFetch(url, null, logout);
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const addFavoriteApi = async (idUser, idGame, logout) => {
   try {
      const dataFound = await isFavoriteApi(idUser, idGame, logout);
      if(size(dataFound) > 0 || !dataFound){
         return "Este juego ya lo tienes como favorito.";
      } else {
         const url = `${BASE_PATH}/favorites`;
         const params = {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               user: idUser,
               game: idGame
            })
         }

         return await authFetch(url, params, logout);
      }
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const removeFavoriteApi = async (idUser, idGame, logout) => {
   try {
      const dataFound = await isFavoriteApi(idUser, idGame, logout);
      if(size(dataFound) > 0){
         const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
         const params = {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json"
            }
         }

         return await authFetch(url, params, logout);
      }
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const getFavoritesApi = async (idUser, logout) => {
   try {
      const url = `${BASE_PATH}/favorites?user=${idUser}`;
      return await authFetch(url, null, logout);
   }catch (e) {
      console.log(e);
      return null;
   }
}