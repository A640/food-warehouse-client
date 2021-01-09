import axios from 'axios'

const StoreModule = {

    state: { 

        store_products: [],
        store_products_loading: false,
        cart: [],

    },

    mutations: {

        setStoreProducts(context,data){
            context.store_products = data;
        },

        setStoreProductsLoading(context, value){
            context.store_products_loading = value;
        },

        addToCart(context,product){
          context.store_products.push(product)
        }

    },

    actions: {

        

      getAllStoreProducts(context, silent=false){
            //get all StoreProducts and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik store_product")
            context.commit('setStoreProductsLoading',true);
            let token = localStorage.getItem('jwtToken')
            axios.get(context.getters.getServerAddress +'/store_product', { headers: { Authorization: `Bearer ${token}` } })
              .then( (data) => {
      
                if(!silent){
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
                }
               
      
                //save StoreProducts data in vuex store
                console.log(data)
                context.commit('setStoreProducts',data.data.result);
                context.commit('setStoreProductsLoading',false);
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
                context.commit('setStoreProductsLoading',false);
              }); 
        },
      
        getStoreProductData(context, id){
            let res = context.state.store_products.find(store_product => store_product.car_info.car_id == id);
            res.car_info.driver_id = res.driver.personal_data.employee_id;
            return res.car_info;
        },
        
    },

    getters: {

        getStoreProducts(context){
            return context.store_products;
        },

        getStoreProductsLoading(context){
            return context.store_products_loading;
        },  

    },
};

export default StoreModule;