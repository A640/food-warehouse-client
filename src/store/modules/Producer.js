import axios from 'axios'

const ProducerModule = {

    state: { 

        producers: [],
        producers_loading: false,

    },

    mutations: {

        setProducers(context,data){
            context.producers = data;
        },

        setProducersLoading(context, value){
            context.producers_loading = value;
        },

        clearProducer(context){
          context.producers = [];
          context.producers_loading = false;
        },

    },

    actions: {

        editProducer(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
                // if updating existing Producer and User data
                axios.put(context.getters.getServerAddress + '/producer',data,{ headers: { Authorization: `Bearer ${token}` }})
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
    
        addProducer(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
              // creating new Producer and new User
              axios.post(context.getters.getServerAddress +'/producer',data,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteProducer(context,id){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
            // creating new Producer and new User
            axios.delete(context.getters.getServerAddress + '/producer/' + id,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteManyProducers(context,ids){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
            console.log("deleteMany");
            console.log(ids);
            // creating new Producer and new User
            axios.delete(context.getters.getServerAddress + '/producer',{ data: ids, headers: { Authorization: `Bearer ${token}` }})
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

      getAllProducers(context, silent=false){
            //get all Producers and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik producer")
            context.commit('setProducersLoading',true);
            let token = localStorage.getItem('jwtToken')
            axios.get(context.getters.getServerAddress +'/producer', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save Producers data in vuex store
                console.log(data)
                context.commit('setProducers',data.data.result);
                context.commit('setProducersLoading',false);
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
                context.commit('setProducersLoading',false);
              }); 
        },
      
        getProducerData(context, id){
            let res = context.state.producers.find(producer => producer.maker_data.maker_id == id);
            return res.maker_data;
        },
        getProducerAddress(context, id){
          let res = context.state.producers.find(producer => producer.maker_data.maker_id == id);
          return res.address;
      },
        
    },

    getters: {

        getProducers(context){
            return context.producers;
        },

        getProducersLoading(context){
            return context.producers_loading;
        },  

    },
};

export default ProducerModule;