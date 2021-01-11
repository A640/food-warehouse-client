import axios from 'axios'

const AccountModule = {

    state: { 
        login: '',
        remember_me: true,
        addresses: [],
        addresses_loading: false,
    },

    mutations: {
        setLogin(context,login){
          context.login = login;
        },
        setAddresses(context,addresses){
          context.addresses = addresses;
        },
        setAddressesLoading(context,value){
          context.addresses_loading = value;
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

                  console.log("Login response",response);
      
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
      
        getAllAddresses(context,silent=false){
          console.log("Gecik addresy")
          context.commit('setAddressesLoading',true);
          let token = localStorage.getItem('jwtToken')
          axios.get(context.getters.getServerAddress +'/account/address', { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Addresses data in vuex store
              console.log(data)
              context.commit('setAddresses',data.data.result);
              context.commit('setAddressesLoading',false);
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
              context.commit('setAddressesLoading',false);
            }); 
        } , 
      
        getAccountData(context,id){
            //search for account data in employees if not found, search in customers
            let res = context.getters.getEmployees.find(employee => employee.account.user_id == id);
            console.log("acc")
            console.log(res);
            if(res == undefined){
              res = context.getters.getCustomers.find(customer => customer.account.user_id == id);
            }
            return res.account;
        },


       
    },

    getters: {
        getAddresses(context){
          return context.addresses;
        },
        getAddressesLoading(context){
          return context.addresses_loading;
        }
    },
};

export default AccountModule;