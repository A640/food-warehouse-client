import axios from 'axios'

const MessageModule = {

    state: { 

        system_alerts: {
            expiring_batches: null,
            running_out_products: null,
            storages_running_out_of_space: null,
        },
        system_alerts_loading: false,

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
                console.log(data)
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

        
    },

    getters: {

        getAlerts(context){
            return context.system_alerts;
        },

        getAlertsLoading(context){
            return context.system_alerts_loading;
        },  

        getAlertsCount(context){
            if(context.system_alerts.expiring_batches != null && context.system_alerts.expiring_batches != undefined){
                let a = context.system_alerts.expiring_batches.length
                let b = context.system_alerts.running_out_products.length
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