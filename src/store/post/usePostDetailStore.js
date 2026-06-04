import {defineStore} from "pinia";
import {ref} from "vue";
import myAxios from "../../api/myAxios.js";

const usePostDetailStore = defineStore(
  'postDetailStore', () => {

    // 1. State
    const post = ref();
    
    // 2. Getter
    
    // 3. Actions
    const getPost = async (id) => {
      try {
        const url = `/api/posts/${id}`;
        
        const res = await myAxios.get(url);
        post.value = res.data.data;
      } catch (error) {
        throw error;
      }
    }   
    
    return {
      // State
      post,
      
      // Getter
      
      // Actions
      getPost
    };
});

export default usePostDetailStore;