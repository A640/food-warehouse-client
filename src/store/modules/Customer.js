import axios from 'axios'

const CustomerModule = {

    state: { 

        customers: [],
        customers_loading: false,

    },

    mutations: {

        setCustomers(context,data){
            context.customers = data;
        },

        setCustomersLoading(context, value){
            context.customers_loading = value;
        },

    },

    actions: {

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

        editCustomer(context,data){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
              // if updating existing Customer and User data
              axios.put(context.getters.getServerAddress + '/customer',data,{ headers: { Authorization: `Bearer ${token}` }})
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

                  if(error.response.status == 403){
                    context.dispatch('forbiddenResponse');
                  }
    
                  
                  
                }
                reject(error);
              });
    
            
          });
      },
  
      addCustomer(context,data){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
            // creating new Customer and new User
            axios.post(context.getters.getServerAddress +'/customer',data,{ headers: { Authorization: `Bearer ${token}` }})
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

                  if(error.response.status == 403){
                    context.dispatch('forbiddenResponse');
                  }
                
                  reject(error)
                }
                
              });
            
          });
      },

    deleteCustomer(context,id){
        return new Promise(function(resolve,reject){
          //get authorization token
          let token = localStorage.getItem('jwtToken')
  
          // creating new Customer and new User
          axios.delete(context.getters.getServerAddress + '/customer/' + id,{ headers: { Authorization: `Bearer ${token}` }})
            .then((response) =>{
  
              //connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
              console.log(response);
              if (response.status === 200) {
                // if added successfully
                if(response.data.result.deleted){
                  resolve(true)
                }
                else{
                  reject("serverBlockDelete")
                }
                
                  
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

                if(error.response.status == 403){
                  context.dispatch('forbiddenResponse');
                }
              
                reject(error)
              }
              
            });
          
        });
    },

    deleteManyCustomers(context,ids){
        return new Promise(function(resolve,reject){
          //get authorization token
          let token = localStorage.getItem('jwtToken')
          console.log("deleteMany");
          console.log(ids);
          // creating new Customer and new User
          axios.delete(context.getters.getServerAddress + '/customer',{ data: ids, headers: { Authorization: `Bearer ${token}` }})
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

                if(error.response.status == 403){
                  context.dispatch('forbiddenResponse');
                }
              
                reject(error)
              }
              
            });
          
        });
    },

    getAllCustomers(context, silent=false){
          //get all Customers and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik customer")
          context.commit('setCustomersLoading',true);
          let token = localStorage.getItem('jwtToken')
          axios.get(context.getters.getServerAddress +'/customer', { headers: { Authorization: `Bearer ${token}` } })
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Customers data in vuex store
              console.log(data)
              context.commit('setCustomers',data.data.result);
              context.commit('setCustomersLoading',false);
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

                if(error.response.status == 403){
                  context.dispatch('forbiddenResponse');
                }
               
              }
              context.commit('setCustomersLoading',false);
            }); 
      },

      
  
        getCustomerData(context, id){
          let res = context.state.customers.find(customer => customer.personal_data.customer_id == id);
          return res.personal_data;
        },
          
        getAddressData(context, id){
          let res = context.state.customers.find(customer => customer.personal_data.customer_id == id);
          return res.address;
        },
    },

    getters: {

        getCustomers(context){
            return context.customers;
        },

        getCustomersLoading(context){
            return context.customers_loading;
        },  

    },
};

export default CustomerModule;