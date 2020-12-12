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
                    reject("bad credentials");
                  } 
                }else{
                  reject("bad credentials")
                }
              }, (error) =>{

                console.error("Błąd przy logowaniu");
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
