import PostIndex from "../pages/posts/PostIndex.vue";
import {createRouter, createWebHistory} from "vue-router";
import Login from "../pages/auth/Login.vue";
import useAuthStore from "../store/auth/useAuthStore.js";
import PostDetail from "../pages/posts/PostDetail.vue";
import Registration from "../pages/auth/Registration.vue";

const setMeta = (isAuthenticated, isGuestOnly) => {
  return {
    isAuthenticated,
    isGuestOnly
  }
}

const routes = [
  {
    path: '/',
    redirect: '/posts', // component: PostIndex
    meta: setMeta(false, false),
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false),
  },
  {
    path: '/posts/:id',
    component: PostDetail,
    meta: setMeta(true, false),
  },
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true),
  },
  {
    path: '/registration',
    component: Registration,
    meta: setMeta(false, true),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
/**
 * 전역 네비게이션 가드 (Global Before Guards)
 * 화면(페이지)이 전환되기 전에 항상 실행되는 함수입니다. 주로 로그인 인증 처리 및 접근 권한 제어에 사용됩니다.
 *
 * @param {Object} to 사용자가 이동하려고 하는 대상(목적지) 라우트 정보 객체
 * @param {Object} from 사용자가 현재 머물고 있는 떠나기 전(출발지) 라우트 정보 객체
 * @param {Function} next 다음 단계로 넘어가기 위해 반드시 호출해야 하는 콜백 함수. (예: next()는 정상 이동, next('/login')은 리다이렉트)
 */
router.beforeEach(async (to, from, next) => {
  // authStore
  const authStore = useAuthStore();

  // accessToken이 존재하지 않을 때
  if (!authStore.isLoggedIn) {
    try {
      await authStore.reissue();
    } catch (e) {
      // alert('로그인 기간이 만료되었습니다.\n다시 로그인 해주세요.');
      // return next('/login');
    }
  }
  // 인증이 필요한 페이지인데, 로그인이 안 된 경우 로그인 페이지로 이동
  if (to.meta.isAuthenticated && !authStore.isLoggedIn)
    return next('/login');
  
  if (to.meta.isGuestOnly && authStore.isLoggedIn)
    return next('/');
  
  // 나머지는 통과
  next();
});

export default router;