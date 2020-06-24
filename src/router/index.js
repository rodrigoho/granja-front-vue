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
    component: () => import(/* webpackChunkName: "home" */ '../views/CargoPacking/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/new-cargo-packing',
    name: 'newCargoPacking',
    component: () =>
      import(/* webpackChunkName: "newCargoPacking" */ '../views/CargoPacking/NewCargoPacking.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/eggs',
    name: 'eggs',
    component: () => import(/* webpackChunkName: "eggs" */ '../views/Eggs.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import(/* webpackChunkName: "customers" */ '../views/Customer/Customers.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/new-customer',
    name: 'newCustomer',
    component: () =>
      import(/* webpackChunkName: "newCustomer" */ '../views/Customer/NewCustomer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
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
