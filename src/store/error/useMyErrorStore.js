import {defineStore} from "pinia";
import {ref} from "vue";

const useMyErrorStore = defineStore(
  'myErrorStore', () => 
  {
    // 1. State (ref)
    const isError = ref(false);
    const errorCode = ref('');
    const errorMsg = ref('');
  
    // 2. Getters (computed)
    
    // 3. Actions (function)
    const setErrorInfo = (error) => {
      const errorData = error.response?.data || {code: 'UNKNOWN_ERROR', message: '예기치 못한 에러가 발생했습니다.'}
      isError.value = true;
      errorCode.value = errorData.code;
      errorMsg.value = errorData.message
    }
    
    const clearErrorInfo = () => {
      isError.value = false;
      errorCode.value = '';
      errorMsg.value = '';
    }
    
    return {
      // 1. State (ref)
      isError,
      errorCode,
      errorMsg,

      // 3. Actions (function)
      setErrorInfo,
      clearErrorInfo,
    }
  }
);

export default useMyErrorStore;