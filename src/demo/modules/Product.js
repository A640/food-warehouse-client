import axios from 'axios'

const ProductModule = {

    state: { 
        products: [],
        products_loading: false,

    },

    mutations: {

        setProducts(context,data){
            context.products = data;
        },

        setProductsLoading(context, value){
            context.products_loading = value;
        },
        
        clearProduct(context){
          context.products = [];
          context.products_loading = false;
        },
    },

    actions: {

        editProduct(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
                // if updating existing Product and User data
                axios.put(context.getters.getServerAddress + '/product',data,{ headers: { Authorization: `Bearer ${token}` }})
                .then((response) =>{
                  console.log(response);
      
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
      
                  if (response.status === 200) {
                    //if updated successfully
                    resolve(true);
      
                  }else{
                    reject(response);
                  }
      
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
                  reject(error);
                });
      
              
            });
        },
    
        addProduct(context,data){
            return new Promise(function(resolve,reject){
              //get authorization token
              let token = localStorage.getItem('jwtToken')
      
              // creating new Product and new User
              axios.post(context.getters.getServerAddress +'/product',data,{ headers: { Authorization: `Bearer ${token}` }})
                .then((response) =>{
      
                  //connected to server, hide no connection banner
                  context.dispatch('noConnectionChange',false);
      
                  if (response.status === 200) {
                    // if added successfully
                    resolve(true)
                      
                  }else{
                    reject(response)
                  }
      
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
                  
                    reject(error)
                  }
                  
                });
              
            });
        },

      deleteProduct(context,id){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
    
            // creating new Product and new User
            axios.delete(context.getters.getServerAddress + '/product/' + id,{ headers: { Authorization: `Bearer ${token}` }})
              .then((response) =>{
    
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
                console.log(response);
                if (response.status === 200) {
                  // if added successfully
                  if(response.data.result.deleted){
                    resolve(true)
                  }
                  else{
                    reject("serverBlockDelete")
                  }
                  
                    
                }else{
                  reject(response)
                }
    
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
                
                  reject(error)
                }
                
              });
            
          });
      },

      deleteManyProducts(context,ids){
          return new Promise(function(resolve,reject){
            //get authorization token
            let token = localStorage.getItem('jwtToken')
            console.log("deleteMany");
            console.log(ids);
            // creating new Product and new User
            axios.delete(context.getters.getServerAddress + '/product',{ data: ids, headers: { Authorization: `Bearer ${token}` }})
              .then((response) =>{
    
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
    
                if (response.status === 200) {
                  // if added successfully
                  resolve(true)
                    
                }else{
                  reject(response)
                }
    
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
                
                  reject(error)
                }
                
              });
            
          });
      },

      getAllProducts(context){
            //get all Products and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik product")
            context.commit('setProductsLoading',true);

            setTimeout(()=>{
              context.commit('setProductsLoading',false);
            },1000)




            // let token = localStorage.getItem('jwtToken')
            // axios.get(context.getters.getServerAddress +'/product', { headers: { Authorization: `Bearer ${token}` } })
            //   .then( (data) => {
      
            //     if(!silent){
            //       //connected to server, hide no connection banner
            //       context.dispatch('noConnectionChange',false);
            //     }
               
      
            //     //save Products data in vuex store
            //     console.log(data)
            //     context.commit('setProducts',data.data.result);
                
            //   })
            //   .catch( (error) =>{
      
            //     if(error.toJSON().message == "Network Error"){
            //       //if can't connect to server
      
            //       context.dispatch('noConnectionChange',true);
      
            //     }else{
            //       // Request made and server responded
            //       console.log(error.response.data);
            //       console.log(error.response.status);
            //       console.log(error.response.headers);
      
            //       if(!silent){
            //          //if connected to server, hide no connection banner
            //         context.dispatch('noConnectionChange',false);
            //       }

            //       if(error.response.status == 403){
            //         context.dispatch('forbiddenResponse');
            //       }
                 
            //     }
            //     context.commit('setProductsLoading',false);
            //   }); 
        },
      
        getProductData(context, id){
            let res = context.state.products.find(product => product.product.product_id == id);
            return res;
        },
        
    },

    getters: {

        getProducts(context){
            return context.products;
        },

        getProductsLoading(context){
            return context.products_loading;
        },  

    },
};

export default ProductModule;