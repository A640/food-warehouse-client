import axios from 'axios'

const StatsModule = {

    state: { 

        orders_stats: [],
        orders_stats_loading: false,

        profit_stats: [],
        profit_stats_loading: false,

    },

    mutations: {

        setOrdersStats(context,data){
            context.orders_stats = data;
        },

        setOrdersStatsLoading(context, value){
            context.orders_stats_loading = value;
        },

        setProfitStats(context,data){
            context.profit_stats = data;
        },

        setProfitStatsLoading(context, value){
            context.profit_stats_loading = value;
        },

    },

    actions: {

      getOrdersStats(context, silent=false){
            //get all OrdersStats and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik OrdersStats")
            context.commit('setOrdersStatsLoading',true);
            let token = localStorage.getItem('jwtToken')
            return axios.get(context.getters.getServerAddress +'/statistic/order', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save OrdersStats data in vuex store
                console.log(data)
                context.commit('setOrdersStats',data.data.result);
                context.commit('setOrdersStatsLoading',false);
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
                context.commit('setOrdersStatsLoading',false);
              }); 
        },

        getProfitStats(context, silent=false){
          //get all ProfitStats and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik ProfitStats")
          context.commit('setProfitStatsLoading',true);
          let token = localStorage.getItem('jwtToken')
          return axios.get(context.getters.getServerAddress +'/statistic/profit', { headers: { Authorization: `Bearer ${token}` } })
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save ProfitStats data in vuex store
              console.log(data)
              context.commit('setProfitStats',data.data.result);
              context.commit('setProfitStatsLoading',false);
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
              context.commit('setProfitStatsLoading',false);
            }); 
      },
      
        
    },

    getters: {

        getOrdersStats(context){
            return context.orders_stats;
        },

        getOrdersStatsLoading(context){
            return context.orders_stats_loading;
        },  

        getProfitStats(context){
            return context.profit_stats;
        },

        getProfitStatsLoading(context){
            return context.profit_stats_loading;
        }, 

    },
};

export default StatsModule;