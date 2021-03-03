import axios from 'axios'

const VehicleModule = {

    state: { 

        vehicles: [],
        vehicles_loading: false,

    },

    mutations: {

        setVehicles(context,data){
            context.vehicles = data;
        },

        setVehiclesLoading(context, value){
            context.vehicles_loading = value;
        },

        clearVehicle(context){
          context.vehicles = [];
          context.vehicles_loading = false;
        },

    },

    actions: {

        editVehicle(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
                // if updating existing Vehicle and User data
                axios.put(context.getters.getServerAddress + '/vehicle',data,{ headers: { Authorization: `Bearer ${token}` }})
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
    
        addVehicle(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
              // creating new Vehicle and new User
              axios.post(context.getters.getServerAddress +'/vehicle',data,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteVehicle(context,id){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
            // creating new Vehicle and new User
            axios.delete(context.getters.getServerAddress + '/vehicle/' + id,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteManyVehicles(context,ids){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
            console.log("deleteMany");
            console.log(ids);
            // creating new Vehicle and new User
            axios.delete(context.getters.getServerAddress + '/vehicle',{ data: ids, headers: { Authorization: `Bearer ${token}` }})
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

      getAllVehicles(context, silent=false){
            //get all Vehicles and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik vehicle")
            context.commit('setVehiclesLoading',true);
            let token = localStorage.getItem('jwtToken')
            axios.get(context.getters.getServerAddress +'/vehicle', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save Vehicles data in vuex store
                console.log(data)
                context.commit('setVehicles',data.data.result);
                context.commit('setVehiclesLoading',false);
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
                context.commit('setVehiclesLoading',false);
              }); 
        },

        getSupplierVehicle(context, silent=false){
          //get all Vehicles and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik vehicle")
          context.commit('setVehiclesLoading',true);
          let token = localStorage.getItem('jwtToken')
          return axios.get(context.getters.getServerAddress +'/supplier/vehicle', { headers: { Authorization: `Bearer ${token}` } })
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Vehicles data in vuex store
              console.log('s-vehicle',data)
              context.commit('setVehiclesLoading',false);
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
    
                if(!silent){
                   //if connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }

                if(error.response.status == 403){
                  context.dispatch('forbiddenResponse');
                }
               
              }
              context.commit('setVehiclesLoading',false);
            }); 
      },
      
        getVehicleData(context, id){
            let res = context.state.vehicles.find(vehicle => vehicle.car_info.car_id == id);
            res.car_info.driver_id = res.driver.personal_data.employee_id;
            return res.car_info;
        },
        
    },

    getters: {

        getVehicles(context){
            return context.vehicles;
        },

        getVehiclesLoading(context){
            return context.vehicles_loading;
        },  

    },
};

export default VehicleModule;