import {BASE_PATH} from "../utils/constants";

export const getLastGamesApi = async (limit) => {
   try {
      const url = `${BASE_PATH}/games?_limit=${limit}&_sort=createdAt:desc`;
      const response = await fetch(url);
      const result = await response.json();

      return result;
   }catch (e) {
      console.log(e);
      return null;
   }
}

export const getGamesPlatformApi = async (platform, limit, start) => {
   try {
      const limitItems = `_limit=${limit}`;
      const sortItems = `_sort=createdAt:desc`;
      const startItems = `_start=${start}`;

      const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;

      const response = await fetch(url);
      return await response.json();
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const getTotalGamesPlatformApi = async (platform) => {
   try {
      const url = `${BASE_PATH}/games/count?platform.url=${platform}`;

      const response = await fetch(url);
      return await response.json();
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const getGameByUrlApi = async (path) => {
   try {
      const url = `${BASE_PATH}/games?url=${path}`;
      const response = await fetch(url);
      return await response.json();
   } catch (e) {
      console.log(e);
      return null;
   }
}

export const searchGamesApi = async (title) => {
   try {
      const url = `${BASE_PATH}/games?_q=${title}`;

      return (await fetch(url)).json();
   } catch (e) {
      console.log(e);
      return null;
   }
}