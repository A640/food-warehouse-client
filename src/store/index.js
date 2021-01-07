import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import EmployeeModule from './modules/Employee.js'
import AccountModule from './modules/Account.js'
import CustomerModule from './modules/Customer.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    adress: "localhost",
    port: 8090,

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

  },

  modules: {

    employee: EmployeeModule,
    account: AccountModule,
    customer: CustomerModule,
    
  },

  getters: {

    getServerAddress(context){
      return 'http://' + context.adress + ':' + String(context.port)
    },

    getNoConnection(context){
      return context.no_connection;
    },

    getReconnected(context){
      return context.reconnected;
    },
    
  },

})
