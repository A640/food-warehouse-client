import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adress: "localhost",
    port: 8090,
    employees: [],
    employees_loading: false,

    customers: [],

    no_connection: false,
    reconnected: false,
  },
  mutations: {
    setEmployees(context,data){
      context.employees = data;
    },
    setNoConnection(context,value){
      context.no_connection = value;
      context.reconnected = false;
    },
    setReconnected(context,value){
      context.reconnected = value;
    },
    setEmployeesLoading(context, value){
      context.employees_loading = value;
    }
  },
  actions: {
    login(context,credentials){
      return new Promise(function(resolve,reject){

        console.log(context.getters.getServerAddress);

        axios.post(context.getters.getServerAddress +'/login', credentials)
          .then((response) =>{
            //if connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);

            //check if 
            if (response.status === 200) {
              const jwtToken = response.headers['authorization'];
              if (jwtToken) {
                  localStorage.setItem('jwtToken', jwtToken);
                  console.log("zalogowaned")
                  const permission = response.data['permission'];
                  resolve(permission)
              }
              else{
                reject("opcja 1");
              } 
            }else{
              reject("opcja 2")
            }
          })
          .catch( (error) =>{
            console.log("erroror");
            console.log(error.toJSON());
            if(error.toJSON().message == "Network Error"){
              //if can't connect to server

              context.dispatch('noConnectionChange',true);

            }else if (error.response) {
              // Request made and server responded

              //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);

              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              if(error.response.status == 403){
                reject("bad credentials")
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          });
      });
    },

    register(context,data){
      return new Promise(function(resolve,reject){

        console.log(context.getters.getServerAddress);
        console.log(data);

        axios.post(context.getters.getServerAddress +'/register',data)
          .then((response) =>{
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);

            if (response.status === 200) {
              let created = response.data['result'];
              created = created.created;

              if(created) {
                resolve(true)
              }
              else{
                reject("cannot create")
              } 
            }else{
              reject("cannot create")
            }
          })
          .catch( (error) =>{

            if(error.toJSON().message == "Network Error"){
              //if can't connect to server

              context.dispatch('noConnectionChange',true);

            }else if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);

              if(error.response.status == 400){
                reject("cannot create")
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          });
      });
    },

    checkLogin(context,login){
      return new Promise(function(resolve,reject){
        let obj = {username: login};

        axios.post(context.getters.getServerAddress +'/register/username',obj)
          .then((response) =>{
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);

            if (response.status === 200) {
              let isUsed = response.data['result'];
              isUsed = isUsed.usernameExists;
        
              if(isUsed) {
                resolve(true)
              }
              else{
                resolve(false)
              } 
            }else{
              reject("Błąd przy połączeniu")
            }
          }).catch( (error) =>{

            if(error.toJSON().message == "Network Error"){
              //if can't connect to server

              context.dispatch('noConnectionChange',true);

            }else{
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
            
              reject(error)
            }
            
          }); 
        
      });
    },

    checkEmail(context,email){
      return new Promise(function(resolve,reject){
        let obj = {email: email};

        axios.post(context.getters.getServerAddress +'/register/email',obj)
          .then((response) =>{
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);

            if (response.status === 200) {
              let isUsed = response.data['result'];
              isUsed = isUsed.emailExists;
        
              if(isUsed) {
                resolve(true)
              }
              else{
                resolve(false)
              } 
            }else{
              reject("Błąd przy połączeniu")
            }
          }).catch( (error) =>{

            if(error.toJSON().message == "Network Error"){
              //if can't connect to server

              context.dispatch('noConnectionChange',true);

            }else{
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
            
              
            }
            reject(error);
          });
      });
    },

    editEmployee(context,data){
      return new Promise(function(resolve,reject){
        //get authorization token
        let token = localStorage.getItem('jwtToken')

          // if updating existing Employee and User data
          axios.put(context.getters.getServerAddress + '/employee/' + data.personal_data.employee_id ,data,{ headers: { Authorization: `Bearer ${token}` }})
          .then((response) =>{
            console.log(response);

            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);

            if (response.status === 200) {
              //if updated successfully
              resolve(true);

            }else{
              reject(response);
            }

          })
          .catch( (error) =>{

            if(error.toJSON().message == "Network Error"){
              //if can't connect to server

              context.dispatch('noConnectionChange',true);

            }else{
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
              
            }
            reject(error);
          });

        
      });
    },

    addEmployee(context,data){
      return new Promise(function(resolve,reject){
        //get authorization token
        let token = localStorage.getItem('jwtToken')

        // creating new Employee and new User
        axios.post(context.getters.getServerAddress +'/employee',data,{ headers: { Authorization: `Bearer ${token}` }})
          .then((response) =>{

            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);

            if (response.status === 200) {
              // if added successfully
              resolve(true)
                
            }else{
              reject(response)
            }

          })
          .catch( (error) =>{

            if(error.toJSON().message == "Network Error"){
              //if can't connect to server

              context.dispatch('noConnectionChange',true);

            }else{
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
            
              reject(error)
            }
            
          });
        
      });
    },

    getAllEmployees(context, silent=false){
      //get all Employees and their User info from server
      //silent option is mainly for not hide reconnected banner

      console.log("Gecik employee")
      context.commit('setEmployeesLoading',true);
      let token = localStorage.getItem('jwtToken')
      axios.get(context.getters.getServerAddress +'/employee', { headers: { Authorization: `Bearer ${token}` }})
        .then( (data) => {

          if(!silent){
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);
          }
         

          //save Employees data in vuex store
          console.log(data)
          context.commit('setEmployees',data.data.result);
          context.commit('setEmployeesLoading',false);
        })
        .catch( (error) =>{

          if(error.toJSON().message == "Network Error"){
            //if can't connect to server

            context.dispatch('noConnectionChange',true);

          }else{
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            if(!silent){
               //if connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
            }
           
          }
          context.commit('setEmployeesLoading',false);
        }); 
    },

    getEmployeeData(context, id){
      let res = context.state.employees.find(employee => employee.personal_data.employee_id == id);
      return res.personal_data;
    },

    getAccountData(context,id){
      //search for account data in employees if not found, search in customers
      let res = context.state.employees.find(employee => employee.account.userId == id);
      if(!res && context.state.customers){
        context.state.customers.find(customer => customer.account.userId == id);
      }
      return res.account;
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
    }


  },
  modules: {
  },
  getters: {
    getServerAddress(context){
      return 'http://' + context.adress + ':' + String(context.port)
    },
    getEmployees(context){
      return context.employees;
    },
    getNoConnection(context){
      return context.no_connection;
    },
    getReconnected(context){
      return context.reconnected;
    },
    getEmployeesLoading(context){
      return context.employees_loading;
    }
  }
})
