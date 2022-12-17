import {BASE_PATH} from "../utils/constants";


export const getPlatformsApi = async () => {
   try {
      const url = `${BASE_PATH}/platforms?_sort=position:asc`;
      const response = await fetch(url);
      const result = await response.json();

      return result;
   } catch (e) {
      console.log(e);
      return null;
   }
}