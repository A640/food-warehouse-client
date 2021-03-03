import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '@/router'

import EmployeeModule from './modules/Employee.js'
import AccountModule from './modules/Account.js'
import CustomerModule from './modules/Customer.js'
import VehicleModule from './modules/Vehicle.js'
import ProducerModule from './modules/Producer.js'
import WarehouseModule from './modules/Warehouse.js'
import ProductModule from './modules/Product.js'
import StoreModule from './modules/Store.js'
import StatsModule from './modules/Stats.js'
import MessageModule from './modules/Message.js'
import OrderModule from './modules/Order.js'
import ComplaintModule from './modules/Complaint.js'
import BatchModule from './modules/Batch.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    store_name:  'HURTOWNIA DEMO',

    no_connection: false,
    reconnected: false,

  },

  mutations: {
    
    setNoConnection(context,value){
      context.no_connection = value;
      context.reconnected = false;
    },

    setReconnected(context,value){
      context.reconnected = value;
    },

    
    
  },

  actions: {


    clearEverything(context){
      context.commit('clearAccount');
      context.commit('clearBatch');
      context.commit('clearComplaint');
      context.commit('clearCustomer');
      context.commit('clearEmployee');
      context.commit('clearMessage');
      context.commit('clearOrder');
      context.commit('clearProducer');
      context.commit('clearProduct');
      context.commit('clearStats');
      context.commit('clearStore');
      context.commit('clearVehicle');
      context.commit('clearWarehouse');
    },

    noConnectionChange(context,noConnection){
      context.commit('setNoConnection',noConnection)
      console.log('noConnectionChange');
      if(noConnection){
        console.log('Trying to reconnect...');
        context.dispatch('retryConnection');
      }
      
    },

    retryConnection(context){

      if(context.getters.getNoConnection){
        // try to connect with server on ping address
        console.log("Ping");

        axios.get(context.getters.getServerAddress +'/ping')
        .then( () => {
          //if connnection was successfull

          context.commit('setNoConnection',false);
          context.commit('setReconnected',true);
        })
        .catch( () => {
          //if not connected to server
          context.commit('setNoConnection',true);

          // try reconnect after 5s
          setTimeout(function() {
            context.dispatch('retryConnection');
          }, 5000);
        })
      }
    },

    forbiddenResponse(){
      console.log("Got FORBIDDEN 403 response from server");
      //fallback to login component
      router.push({ name: 'Login'});
    }

  },

  modules: {

    employee: EmployeeModule,
    account: AccountModule,
    customer: CustomerModule,
    vehicle: VehicleModule,
    producer: ProducerModule,
    warehouse: WarehouseModule,
    product: ProductModule,
    store: StoreModule,
    stats: StatsModule,
    message: MessageModule,
    order: OrderModule,
    complaint: ComplaintModule,
    batch: BatchModule,
    
  },

  getters: {

    getNoConnection(context){
      return context.no_connection;
    },

    getReconnected(context){
      return context.reconnected;
    },

    getStoreName(context){
      return context.store_name;
    }
    
  },

})
