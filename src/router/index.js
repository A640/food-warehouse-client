import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
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
      {
        path: 'warehouses',
        name: 'Admin_Warehouses',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/WarehouseTable.vue'),
      },
      {
        path: 'products',
        name: 'Admin_Products',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/ProductTable.vue'),
      },
    ]
  },
  {
    path: '/manager',
    name: 'Manager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manager.vue'),
    children:[
      {
        path: 'employees',
        name: 'Manager_Employees',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/EmployeeTable-Manager.vue'),
      },
      {
        path: 'customers',
        name: 'Manager_Customers',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/CustomerTable-Manager.vue'),
      },
      {
        path: 'vehicles',
        name: 'Manager_Vehicles',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/VehicleTable.vue'),
      },
      {
        path: 'producers',
        name: 'Manager_Producers',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/ProducerTable.vue'),
      },
      {
        path: 'warehouses',
        name: 'Manager_Warehouses',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/WarehouseTable.vue'),
      },
      {
        path: 'products',
        name: 'Manager_Products',
        component: () => import(/* webpackChunkName: "about" */ '../components/Tables/ProductTable.vue'),
      },
      {
        path: 'stats',
        name: 'Manager_Stats',
        component: () => import(/* webpackChunkName: "about" */ '../components/Manager/Stats.vue'),
        children:[
          {
            path: 'orders',
            name: 'Manager_Stats_Orders',
            component: () => import(/* webpackChunkName: "about" */ '../components/Stats/Orders.vue'),
          },
          {
            path: 'sell-profit',
            name: 'Manager_Stats_Sell-Profit',
            component: () => import(/* webpackChunkName: "about" */ '../components/Stats/Profit.vue'),
          },
          {
            path: 'top-products',
            name: 'Manager_Stats_Top-Products',
            component: () => import(/* webpackChunkName: "about" */ '../components/Stats/Products.vue'),
          },
        ],
      },
      {
        path: 'system-alerts',
        name: 'Manager_Alerts',
        component: () => import(/* webpackChunkName: "about" */ '../components/Manager/SystemAlerts.vue'),
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
    path: '/store',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/main/Store.vue'),
    children:[
      {
        path: '',
        name: 'Store_Grid',
        component: () => import(/* webpackChunkName: "about" */ '../components/Store/ProductGrid.vue'),
      },
      {
        path: 'product/:id',
        name: 'Store_Detail',
        component: () => import(/* webpackChunkName: "about" */ '../components/Store/ProductDetails.vue'),
        props: true,
      },
      {
        path: 'cart',
        name: 'Store_Cart',
        component: () => import(/* webpackChunkName: "about" */ '../components/Store/Cart.vue'),
        props: true,
      },
      {
        path: 'order-complete',
        name: 'Order_Success',
        component: () => import(/* webpackChunkName: "about" */ '../components/Store/Cart/OrderSuccess.vue'),
        props: true,
      },
      {
        path: 'order-complete2',
        name: 'Order_Warning',
        component: () => import(/* webpackChunkName: "about" */ '../components/Store/Cart/OrderWarning.vue'),
        props: true,
      },

      {
        path: '404',
        name: 'Store404',
        component: () => import(/* webpackChunkName: "about" */ '../components/Store/Store404.vue'),
        props: true,
      },
    ]
  },

  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/Customer/OrderMini.vue')
  },

  {
    path: '/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "about" */ '@/views/main/Payment.vue'),
    props: true,
  },
  {
    path: '/customer/orders',
    component: () => import(/* webpackChunkName: "about" */ '@/views/main/CustomerOrders.vue'),
    children:[
      {
        path: '',
        name: 'Customer_Orders',
        component: () => import(/* webpackChunkName: "about" */ '@/components/Customer/OrderList.vue'),
      },
      {
        path: 'details/:id',
        name: 'Order_Details',
        component: () => import(/* webpackChunkName: "about" */ '@/components/Customer/OrderDetails.vue'),
        props: true,
      },
      {
        path: 'order-404',
        name: 'Order_404',
        component: () => import(/* webpackChunkName: "about" */ '@/components/Customer/Order404.vue'),
      },
    ]
  },
  {
    path: '/customer/account',
    name: 'Customer_Account',
    component: () => import(/* webpackChunkName: "about" */ '@/views/main/CustomerAccount.vue'),
    
  },


  
]

const router = new VueRouter({
  routes
})

export default router
