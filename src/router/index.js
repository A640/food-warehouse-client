import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    children:[
      {
        path: 'employees',
        name: 'Admin_Employees',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/EmployeeTable.vue'),
      },
      {
        path: 'customers',
        name: 'Admin_Customers',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/CustomerTable.vue'),
      },
      {
        path: 'vehicles',
        name: 'Admin_Vehicles',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/VehicleTable.vue'),
      },
      {
        path: 'producers',
        name: 'Admin_Producers',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/ProducerTable.vue'),
      },
    ]
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register/success',
    name: 'RegisterSuccess',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterSuccess.vue')
  },

  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/PopupContents/WarehousePopup.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
