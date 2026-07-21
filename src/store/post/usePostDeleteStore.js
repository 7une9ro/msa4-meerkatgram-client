import {defineStore} from "pinia";
import myAxios from "../../api/myAxios.js";

const usePostDeleteStore = defineStore('postDeleteStore', () => {

  // 1. State

  // 2. Getter

  // 3. Actions
  const deletePost = async (id) => {
    try {
      const url = `/api/posts/${id}`;

      await myAxios.delete(url);
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
    deletePost,
  }
});

export default usePostDeleteStore;