import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adress: "localhost",
    port: 8090,
  },
  mutations: {
    
  },
  actions: {
    login(context,credentials){
      return new Promise(function(resolve,reject){

        console.log(context.getters.getServerAddress);

        axios.post(context.getters.getServerAddress +'/login', credentials)
          .then((response) =>{

            if (response.status === 200) {
              const jwtToken = response.headers['authorization'];
              if (jwtToken) {
                  localStorage.setItem('jwtToken', jwtToken);
                  console.log("zalogowaned")
                  resolve(true)
              }
              else{
                reject("opcja 1");
              } 
            }else{
              reject("opcja 2")
            }
          })
          .catch( (error) =>{
            if (error.response) {
              // Request made and server responded
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

        axios.post(context.getters.getServerAddress +'/register/username',data)
          .then((response) =>{

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
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              if(error.response.status == 403){
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
              }, (error) =>{

                console.error("Błąd przy połączeniu");
                console.log(error);
                reject(error);
        });
      });
    },

    checkEmail(context,email){
      return new Promise(function(resolve,reject){
        let obj = {email: email};

        axios.post(context.getters.getServerAddress +'/register/email',obj)
              .then((response) =>{

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
              }, (error) =>{

                console.error("Błąd przy połączeniu");
                console.log(error);
                reject(error);
        });
      });
    },

  
  },
  modules: {
  },
  getters: {
    getServerAddress(context){
      return 'http://' + context.adress + ':' + String(context.port)
    },
  }
})
