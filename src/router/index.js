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
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/CargoPacking/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/new-cargo-packing',
    name: 'newCargoPacking',
    component: () => import(/* webpackChunkName: "newCargoPacking" */ '../views/CargoPacking/NewCargoPacking.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cargo-packing-edit/:id',
    name: 'cargoPackingEdit',
    component: () => import(/* webpackChunkName: "cargoPackingEditing" */ '../views/CargoPacking/NewCargoPacking.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cargo-packing-details/:id',
    name: 'cargoPackingDetails',
    component: () =>
      import(/* webpackChunkName: "cargoPackingDetails" */ '../views/CargoPacking/CargoPackingDetails.vue'),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: '/eggs',
    name: 'eggs',
    component: () => import(/* webpackChunkName: "eggs" */ '../views/Eggs/Eggs.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/new-eggs',
    name: 'newEggs',
    component: () => import(/* webpackChunkName: "newEggs" */ '../views/Eggs/NewEggs.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/User/Users.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user-edit/:id',
    name: 'userEdit',
    component: () => import(/* webpackChunkName: "userEdit" */ '../views/User/NewUser.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/new-user',
    name: 'newUser',
    component: () => import(/* webpackChunkName: "newUser" */ '../views/User/NewUser.vue'),
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
    path: '/customers/new-customer',
    name: 'newCustomer',
    component: () => import(/* webpackChunkName: "newCustomer" */ '../views/Customer/NewCustomer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customers/edit/:id',
    name: 'customerEdit',
    component: () => import(/* webpackChunkName: "customerEditing" */ '../views/Customer/NewCustomer.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customers/customer-details/:id',
    name: 'customerDetails',
    component: () => import(/* webpackChunkName: "customerDetails" */ '../views/Customer/CustomerDetails.vue'),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: '/intermediary/new-intermediary-customer',
    name: 'newIntermediaryCustomer',
    component: () =>
      import(/* webpackChunkName: "newIntermediaryCustomer" */ '../views/Intermediary/NewIntermediaryCustomer.vue'),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: '/intermediary/intermediary-customers',
    name: 'intermediaries',
    component: () => import(/* webpackChunkName: "intermediaries" */ '../views/Intermediary/IntermediaryCustomers.vue'),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: '/intermediary/intermediary-details/:id',
    name: 'intermediaryDetails',
    component: () => import(/* webpackChunkName: "intermediaries" */ '../views/Intermediary/IntermediaryDetails.vue'),
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: '/intermediary/new-intermediary/:id',
    name: 'intermediaryEdit',
    component: () =>
      import(/* webpackChunkName: "cargoPackingEditing" */ '../views/Intermediary/NewIntermediaryCustomer.vue'),
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
