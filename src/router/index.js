import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/new-user',
  //   name: 'newUser',
  //   component: () => import(/* webpackChunkName: "login" */ '../pages/NewUser.vue'),
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '/tags',
  //   name: 'tags',
  //   component: () => import(/* webpackChunkName: "home" */ '../pages/Tags.vue'),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: '/customer',
  //   name: 'customer',
  //   component: () => import(/* webpackChunkName: "newCustomer" */ '../pages/NewCustomer.vue'),
  //   props: true,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
