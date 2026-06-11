import {defineStore} from "pinia";
import myAxios from "../../api/myAxios.js";

const usePostCreateStore = defineStore('postCreateStore', () => {

  // 1. State
  
  // 2. Getter
  
  // 3. Actions
  const create = async (data) => {
    try {
      const url = '/api/posts/create';

      const res = await myAxios.post(url, data);
      
      return res.data.data.id;
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  return {
    // 1. State

    // 2. Getter

    // 3. Actions
    create,
  }
});

export default usePostCreateStore;