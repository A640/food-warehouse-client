import axios from 'axios'

const MessageModule = {

    state: { 

        system_alerts: {
            expiring_batches: null,
            running_out_products: null,
            storages_running_out_of_space: null,
        },
        system_alerts_loading: false,

        messages: [],
        unread_messages: 0,
        messages_loading: false,

        profit_stats: [],
        profit_stats_loading: false,

        products_stats: [],
        products_stats_loading: false,

    },

    mutations: {

        setAlerts(context,data){
            context.system_alerts = data;
        },

        setAlertsLoading(context, value){
            context.system_alerts_loading = value;
        },

        setMessages(context,data){
            context.messages = data;
        },

        setUnreadMessages(context,data){
            context.unread_messages = data;
        },

        setMessagesLoading(context, value){
            context.messages_loading = value;
        },

        setProfitStats(context,data){
            context.profit_stats = data;
        },

        setProfitStatsLoading(context, value){
            context.profit_stats_loading = value;
        },

        setProductsStats(context,data){
            context.products_stats = data;
        },

        setProductsStatsLoading(context, value){
            context.products_stats_loading = value;
        },


        clearMessage(context){
          context.system_alerts = {
              expiring_batches: null,
              running_out_products: null,
              storages_running_out_of_space: null,
          };
          context.system_alerts_loading = false;

          context.messages = [];
          context.unread_messages = 0;
          context.messages_loading = false;

          context.profit_stats = [];
          context.profit_stats_loading = false;

          context.products_stats = [];
          context.products_stats_loading = false;
        },

    },

    actions: {

      getAlerts(context, silent=false){
            //get all Alerts and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik Alerts")
            context.commit('setAlertsLoading',true);
            let token = localStorage.getItem('jwtToken')
            return axios.get(context.getters.getServerAddress +'/alert', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save Alerts data in vuex store
                console.log('alerts',data)
                context.commit('setAlerts',data.data.result);
                context.commit('setAlertsLoading',false);
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
                context.commit('setAlertsLoading',false);
              }); 
        },

        getAlertsEmployee(context, silent=false){
          //get all Alerts and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik Alerts")
          context.commit('setAlertsLoading',true);
          let token = localStorage.getItem('jwtToken')
          return axios.get(context.getters.getServerAddress +'/alert/employee', { headers: { Authorization: `Bearer ${token}` } })
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save Alerts data in vuex store
              console.log('alerts',data)
              context.commit('setAlerts',data.data.result);
              context.commit('setAlertsLoading',false);
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
              context.commit('setAlertsLoading',false);
            }); 
      },

        getMessages(context, silent=false){
            //get all Messages and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik Messages")
            context.commit('setMessagesLoading',true);
            let token = localStorage.getItem('jwtToken')
            return axios.get(context.getters.getServerAddress +'/message', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save Messages data in vuex store
                console.log('messages',data)
                context.commit('setMessages',data.data.result);
                context.commit('setMessagesLoading',false);
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
                context.commit('setMessagesLoading',false);
              }); 
        },

        getUnreadMessagesCount(context, silent=false){
          //get all UnreadMessages and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik UnreadMessages")
          context.commit('setMessagesLoading',true);
          let token = localStorage.getItem('jwtToken')
          return axios.get(context.getters.getServerAddress +'/message/unread', { headers: { Authorization: `Bearer ${token}` } })
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save UnreadMessages data in vuex store
              console.log('unread_messages',data)
              context.commit('setUnreadMessages',data.data.result);
              context.commit('setMessagesLoading',false);
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
              context.commit('setMessagesLoading',false);
            }); 
      },

      readMessage(context, id){
        //get all UnreadMessages and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("Gecik UnreadMessages")
        context.commit('setMessagesLoading',true);
        let token = localStorage.getItem('jwtToken')
        return axios.put(context.getters.getServerAddress +'/message/read/' + id, null, { headers: { Authorization: `Bearer ${token}` } })
          .then( () => {

            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);
          
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
          }); 
    },

    sendMessage(context, message){
      //get all UnreadMessages and their User info from server
      //silent option is mainly for not hide reconnected banner

      console.log("Send Message")
      let token = localStorage.getItem('jwtToken')
      return axios.post(context.getters.getServerAddress +'/message', message, { headers: { Authorization: `Bearer ${token}` } })
        .then( () => {

          //connected to server, hide no connection banner
          context.dispatch('noConnectionChange',false);
        
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
        }); 
  },

        
    },

    getters: {

        getAlerts(context){
            return context.system_alerts;
        },

        getAlertsLoading(context){
            return context.system_alerts_loading;
        }, 
        
        getMessages(context){
            return context.messages;
        },

        getMessagesLoading(context){
            return context.messages_loading;
        }, 

        getMessagesCount(context){
            return context.unread_messages;
        }, 

        getAlertsCount(context){
            if(context.system_alerts.expiring_batches != null && context.system_alerts.expiring_batches != undefined){
                let a = context.system_alerts.expiring_batches.length
                let b = 0;
                if(context.system_alerts.running_out_products){
                  b = context.system_alerts.running_out_products.length
                }
                let c = context.system_alerts.storages_running_out_of_space.length
                return a + b + c;
            }
            else{
                return 0;
            }
            
        }
       

    },
};

export default MessageModule;