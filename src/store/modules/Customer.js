import axios from 'axios'

const AccountModule = {

    state: { 

        customers: [],
        customers_loading: false,

    },

    mutations: {

        setEmployees(context,data){
            context.customers = data;
        },

        setEmployeesLoading(context, value){
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

export default AccountModule;