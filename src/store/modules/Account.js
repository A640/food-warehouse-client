import axios from 'axios'
import router from '@/router'

const AccountModule = {

    state: { 
        login: '',
        name: '',
        remember_me: true,
        addresses: [],
        custom_addresses: [],
        addresses_loading: false,
        account: {},
        account_loading: false,

        employee_account: {},
        employee_account_loading: false,
    },

    mutations: {
        setLogin(context,login){
          context.login = login;
        },
        setName(context,name){
          context.name = name;
        },
        setAccount(context,account){
          context.account = account;
        },
        setAccountLoading(context,value){
          context.account_loading = value;
        },
        setEmployeeAccount(context,account){
          context.employee_account = account;
        },
        setEmployeeAccountLoading(context,value){
          context.employee_account_loading = value;
        },
        setAddresses(context,addresses){
          context.addresses = addresses;
        },
        addAddress(context,address){
          context.custom_addresses.push(address);
        },
        deleteAddress(context,a_id){
          let index = context.custom_addresses.findIndex(a => a.address_id == a_id)
          console.log("adIndex",index)
          context.custom_addresses.splice(index,1);
        },
        setAddressesLoading(context,value){
          context.addresses_loading = value;
        },

        clearAccount(context){
          context.login =  '';
          context.name =  '';
          context.remember_me =  true;
          context.addresses =  [];
          context.custom_addresses =  [];
          context.addresses_loading =  false;
          context.account =  {};
          context.account_loading =  false;

          context.employee_account =  {};
          context.employee_account_loading =  false;
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


        logout(context){
            localStorage.setItem('jwtToken', null);
            context.dispatch('clearEverything').then(() => {
                router.push({ name: 'Login'});
            }) 
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

        getName(context,silent=false){
          console.log("Gecik name")

          let token = localStorage.getItem('jwtToken')
          axios.get(context.getters.getServerAddress +'/account/name', { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Addresses data in vuex store
              console.log(data)
              context.commit('setName',data.data.result);
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
            }); 
        } , 


        getAccount(context,silent=false){
          console.log("Gecik name")

          context.commit('setAccountLoading',true);

          let token = localStorage.getItem('jwtToken')
          return  axios.get(context.getters.getServerAddress +'/account', { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Addresses data in vuex store
              console.log(data)
              context.commit('setAccount',data.data.result);
              context.commit('setAccountLoading',false);
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
              context.commit('setAccountLoading',false);
            }); 
        } , 

        getEmployeeAccount(context,silent=false){
          console.log("Gecik name")

          context.commit('setEmployeeAccountLoading',true);

          let token = localStorage.getItem('jwtToken')
          return  axios.get(context.getters.getServerAddress +'/employee/account', { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Addresses data in vuex store
              console.log(data)
              context.commit('setEmployeeAccount',data.data.result);
              context.commit('setEmployeeAccountLoading',false);
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
              context.commit('setEmployeeAccountLoading',false);
            }); 
        } , 

        

        updateAccount(context,obj){
          console.log("Update Account")

          context.commit('setAccountLoading',true);

          let token = localStorage.getItem('jwtToken')
          console.log('Update Account', obj)
          return  axios.post(context.getters.getServerAddress +'/account/settings',obj, { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
             
              //connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
              
             
    
              //save Addresses data in vuex store
              console.log(data)
              
              context.commit('setAccountLoading',false);
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
              context.commit('setAccountLoading',false);
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
          return context.addresses.concat(context.custom_addresses);
        },
        getAddressesLoading(context){
          return context.addresses_loading;
        },
        getName(context){
          return context.name;
        },
        getAccount(context){
          return context.account;
        },
        getAccountLoading(context){
          return context.account_loading;
        },
        getEmployeeAccount(context){
          return context.employee_account;
        },
        getEmployeeAccountLoading(context){
          return context.employee_account_loading;
        },
        getIsLoggedIn(){
          let t = localStorage.getItem('jwtToken');
          if( t != null && t != 'null'){
            return true;
          }
          else{
            return false;
          }
        },
    },
};

export default AccountModule;