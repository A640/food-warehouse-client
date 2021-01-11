import axios from 'axios'

const StoreModule = {

    state: { 

        store_products: [],
        store_products_loading: false,
        cart: [],
        payment_methods: [],
        payment_methods_loading: false,
// {product_id:1,quantity:20,discount_id:-1},{product_id:1,quantity:40,discount_id:1}
    },

    mutations: {

        setStoreProducts(context,data){
            context.store_products = data;
        },

        setStoreProductsLoading(context, value){
            context.store_products_loading = value;
        },

        setPaymentMethods(context,data){
            context.payment_methods = data;
        },

        setPaymentMethodsLoading(context,value){
            context.payment_methods_loading = value;
        },

        addToCart(context,product){
          let res = context.cart.find(s_product => (s_product.product_id == product.product_id && s_product.discount_id == product.discount_id))
          if(res){
              res.quantity += product.quantity;
          }
          context.cart.push(product);
        },

        deleteFromCart(context,product){
          for(let i=0;i< context.cart.length;i++){
            let prod = context.cart[i];
            if(prod.product_id == product.product_id && prod.discount_id == product.discount_id){
              context.cart.splice(i,1);
            }
          }
        }

    },

    actions: {

        

      getAllStoreProducts(context, silent=false){
            //get all StoreProducts and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik store_product")
            context.commit('setStoreProductsLoading',true);
            axios.get(context.getters.getServerAddress +'/store/products')
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

        getAllPaymentMethods(context, silent=false){
          //get all StoreProducts and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik payment-type")
          context.commit('setPaymentTypesLoading',true);
          let token = localStorage.getItem('jwtToken');
          axios.get(context.getters.getServerAddress +'/payment-type', { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
             
    
              //save PaymentTypes data in vuex store
              console.log(data)
              context.commit('setPaymentMethods',data.data.result);
              context.commit('setPaymentMethodsLoading',false);
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
              context.commit('setPaymentTypesLoading',false);
            }); 
      },
      
        getStoreProductData(context, id){
            let res = context.state.store_products.find(store_product => store_product.product_id == id);
            return res;
        },

        getCartProducts(context){
          let cart = context.state.cart
          cart.map((prod) =>{
            let p = context.state.store_products.find(store_product => store_product.product_id == prod.product_id)
            prod.name = p.name;
            prod.producer_name = p.producer_name;
            prod.image = p.image;
            if(prod.discount_id == -1){
              prod.sell_price = p.sell_price;
              prod.due_to = null;
              prod.max = p.quantity;
            }
            else{
              let d = p.discounts.find(discount => discount.discount_id = prod.discount_id);
              prod.sell_price = d.sell_price;
              prod.due_to = d.eat_by_date;
              prod.max = d.quantity;
            }
            return prod;
          })
          return cart;
        },
        
    },

    getters: {

        getStoreProducts(context){
            return context.store_products;
        },

        getStoreProductsLoading(context){
            return context.store_products_loading;
        },  

        getCartItemCount(context){
          return context.cart.length
        },

        getPaymentMethods(context){
          return context.payment_methods;
        }

    },
};

export default StoreModule;