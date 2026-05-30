import axios from "axios";
import useAuthStore from "../store/auth/useAuthStore.js";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";

const myAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  headers: {
    'Content-Type': 'application/json'
  },
  
  withCredentials: true,
});

myAxios.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  let accessToken = authStore.accessToken;
  const denyUrl = /^\/api\/reissue-token$/;

  if (!denyUrl.test(config.url) && authStore.isLoggedIn) {
    // AccessToken 만료 확인
    const claims = jwtDecode(accessToken);
    const now = dayjs().unix();
    const expiredTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();

    if (now >= expiredTime) {
      try {
        await authStore.reissue();
        accessToken = authStore.accessToken;
      } catch (error) {
        console.error(error?.response);
      }
    }
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default myAxios;