import axios from 'axios'

const OrderModule = {

    state: { 

        orders: [],
        orders_loading: false,

    },

    mutations: {

        setOrders(context,data){
            context.orders = data;
        },

        setOrdersLoading(context, value){
            context.orders_loading = value;
        },

        clearOrder(context){
          context.orders = [];
          context.orders_loading = false;
        },

    },

    actions: {

        editOrder(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
                // if updating existing Order and User data
                axios.put(context.getters.getServerAddress + '/order',data,{ headers: { Authorization: `Bearer ${token}` }})
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
    
        addOrder(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
              // creating new Order and new User
              axios.post(context.getters.getServerAddress +'/order',data,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteOrder(context,id){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
            // creating new Order and new User
            axios.delete(context.getters.getServerAddress + '/order/' + id,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteManyOrders(context,ids){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
            console.log("deleteMany");
            console.log(ids);
            // creating new Order and new User
            axios.delete(context.getters.getServerAddress + '/order',{ data: ids, headers: { Authorization: `Bearer ${token}` }})
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

      getAllOrders(context, silent=false){
            //get all Orders and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik order")
            context.commit('setOrdersLoading',true);
            let token = localStorage.getItem('jwtToken')
            axios.get(context.getters.getServerAddress +'/order', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save Orders data in vuex store
                console.log(data)
                context.commit('setOrders',data.data.result);
                context.commit('setOrdersLoading',false);
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
                context.commit('setOrdersLoading',false);
              }); 
        },


        getOneOrder(context, id){
          //get all Orders and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik one order")
          context.commit('setOrdersLoading',true);
          let token = localStorage.getItem('jwtToken')
          return axios.get(context.getters.getServerAddress +'/order/' + id, { headers: { Authorization: `Bearer ${token}` } })
            .then( (data) => {
    
             
              //connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
              
             
    
              //save Orders data in vuex store
              console.log(data);
              return data.data.result;
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
              context.commit('setOrdersLoading',false);
            }); 
        },
      
        getOrderData(context, id){
            let res = context.state.orders.find(order => order.order.order_id == id);
            return res;
        },
        
    },

    getters: {

        getOrders(context){
            return context.orders;
        },

        getOrdersLoading(context){
            return context.orders_loading;
        },  

    },
};

export default OrderModule;