import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login(context,credentials){
      return new Promise(function(resolve,reject){
        axios.post('http://localhost:8090/login', credentials)
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
  }
})
