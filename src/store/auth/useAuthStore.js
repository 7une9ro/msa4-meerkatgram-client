import {defineStore} from "pinia";
import {ref} from "vue";
import myAxios from "../../api/myAxios.js";
import useMyErrorStore from "../error/useMyErrorStore.js";

const useAuthStore = defineStore('authStore', () => {
  
  // 1. State
  const isLoggedIn = ref(false);
  const accessToken = ref('');
  const userInfo = ref(null);
  
  // 2. Getters
  
  // 3. Actions
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }
  
  const login = async (loginForm) => {
    try {
      const url = '/api/login';
      
      const res = await myAxios.post(url, loginForm);
      
      const data = res.data.data;
      
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
      
    } catch (error) {
      if (error.response) {
        if (error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }
      useMyErrorStore().setErrorInfo(error);
    }
  }
  
  const reissue = async () => {
    try {
      const url = '/api/reissue-token';
      
      // [Q] POST 요청인데 왜 url만 전달하고 추가적인 인자값(body)은 주지 않나요?
      // [A] JWT 재발급을 위한 Refresh Token은 주로 보안(XSS 방어 등)을 위해 브라우저의 'HttpOnly 쿠키'에 저장됩니다.
      // 브라우저는 서버로 요청을 보낼 때 해당 도메인의 쿠키를 자동으로 Request Header에 포함하여 전송합니다.
      // 따라서 프론트엔드 코드에서 명시적으로 Refresh Token을 꺼내어 바디(body)에 담아 보낼 필요가 없습니다.
      const res = await myAxios.post(url);
      const data = res.data.data;
      
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;
      
    } catch (error) {
      clearAuthStore();
    }
  }

  const logout = async () => {
    try {
      const url = '/api/logout';
      await myAxios.post(url);

    } catch (error) {

    } finally {
      clearAuthStore();
    }
  }
  
  const registration = async (data) => {
    try {
      const url = '/api/registration';

      await myAxios.post(url, data);
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  return {
    // State
    isLoggedIn,
    accessToken,
    userInfo,
    
    // Getters
    
    // Actions
    login,
    reissue,
    logout,
    registration
  }
});

export default useAuthStore;