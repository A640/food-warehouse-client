import axios from 'axios'

const EmployeeModule = {

    state: { 

        employees: [],
        employees_loading: false,

    },

    mutations: {

        setEmployees(context,data){
            context.employees = data;
        },

        setEmployeesLoading(context, value){
            context.employees_loading = value;
        },

    },

    actions: {

        editEmployee(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
                // if updating existing Employee and User data
                axios.put(context.getters.getServerAddress + '/employee',data,{ headers: { Authorization: `Bearer ${token}` }})
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

                    if(error.response.status == 403){
                      context.dispatch('forbiddenResponse');
                    }
                  
                    reject(error)
                  }
                  
                });
              
            });
        },

      deleteEmployee(context,id){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
            // creating new Employee and new User
            axios.delete(context.getters.getServerAddress + '/employee/' + id,{ headers: { Authorization: `Bearer ${token}` }})
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

      deleteManyEmployees(context,ids){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
            console.log("deleteMany");
            console.log(ids);
            // creating new Employee and new User
            axios.delete(context.getters.getServerAddress + '/employee',{ data: ids, headers: { Authorization: `Bearer ${token}` }})
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

      getAllEmployees(context, silent=false){
            //get all Employees and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik employee")
            context.commit('setEmployeesLoading',true);
            let token = localStorage.getItem('jwtToken')
            axios.get(context.getters.getServerAddress +'/employee', { headers: { Authorization: `Bearer ${token}` } })
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

                  if(error.response.status == 403){
                    context.dispatch('forbiddenResponse');
                  }
                 
                }
                context.commit('setEmployeesLoading',false);
              }); 
        },
      
        getEmployeeData(context, id){
            let res = context.state.employees.find(employee => employee.personal_data.employee_id == id);
            return res.personal_data;
        },
        
    },

    getters: {

        getEmployees(context){
            return context.employees;
        },

        getEmployeesLoading(context){
            return context.employees_loading;
        },  

    },
};

export default EmployeeModule;