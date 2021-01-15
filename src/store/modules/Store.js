import axios from 'axios'

const StoreModule = {

    state: { 

        store_products: [],
        store_products_loading: false,
        cart: [],
        cart_settings:{
          address: {},
          payment: {},
          comment: '',
          order_id: null,
          payment_id: null,
        },

        orders: [],
        orders_loading: false,


        order_loading: false,
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

        setCartPayment(context,payment){
          context.cart_settings.payment = payment;
        },

        setCartAddress(context,address){
          context.cart_settings.address = address;
        },

        setOrderId(context,id){
          context.cart_settings.order_id = id;
        },

        setPaymentId(context,id){
          context.cart_settings.payment_id = id;
        },

        setOrderComment(context,comment){
          context.cart_settings.comment = comment;
        },

        setOrders(context,orders){
          context.orders = orders;
        },

        setOrdersLoading(context,value){
          context.orders_loading = value;
        },

        clearCart(context){
          context.cart = [];
          context.cart_settings.address = {};
          context.cart_settings.payment = {};
          context.cart_settings.comment = '';
          context.cart_settings.order_id = null;
          context.cart_settings.payment_id = null;
        },

        addToCart(context,product){
          let index = context.cart.findIndex(s_product => (s_product.product_id == product.product_id && s_product.discount_id == product.discount_id))

          if(index != -1){
              context.cart[index].quantity = context.cart[index].quantity + product.quantity;
          }
          else{
            context.cart.push(product);
          }
        },

        deleteFromCart(context,product){
          for(let i=0;i< context.cart.length;i++){
            let prod = context.cart[i];
            if(prod.product_id == product.product_id && prod.discount_id == product.discount_id){
              context.cart.splice(i,1);
            }
          }
        },

        setOrderLoading(context,value){
          context.order_loading = value;
        }

    },

    actions: {

        

      getAllStoreProducts(context, silent=false){
            //get all StoreProducts and their User info from server
            //silent option is mainly for not hide reconnected banner
      
            console.log("Gecik store_product")
            context.commit('setStoreProductsLoading',true);
            return  axios.get(context.getters.getServerAddress +'/store/products')
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

        getOneProduct(context, id){
          //get all StoreProducts and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik store_product")
          context.commit('setStoreProductsLoading',true);
          return  axios.get(context.getters.getServerAddress +'/store/product/' + id)
            .then( (data) => {
    
              
              //connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
              
             
    
              //save StoreProducts data in vuex store
              console.log(data)
              return data.data.result;
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

                if(error.response.status == 400){
                  return 'no product found'
                }
               
              }
              context.commit('setStoreProductsLoading',false);
            }); 
      },

        getAllPaymentMethods(context, silent=false){
          //get all StoreProducts and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Gecik payment-type")
          context.commit('setPaymentMethodsLoading',true);
          let token = localStorage.getItem('jwtToken');
          return axios.get(context.getters.getServerAddress +'/payment-type', { headers: { Authorization: `Bearer ${token}` }})
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
              context.commit('setPaymentMethodsLoading',false);
            }); 
      },
      
        getStoreProductData(context, id){
            let res = context.state.store_products.find(store_product => store_product.product_id == id);
            return res;
        },

        getOrderDataCustomer(context, id){
          console.log('get order data',id)
            let res = context.state.orders.find(order => order.order.order_id == id);
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

        order(context, silent=false){
          //get all StoreProducts and their User info from server
          //silent option is mainly for not hide reconnected banner
    
          console.log("Order")
          context.commit('setOrderLoading',true);
          let token = localStorage.getItem('jwtToken');

          //prepare order for server
          let cart = context.state.cart;
          let products = [];
          products = cart.map((prod) => {
            return {  product_id: prod.product_id, discount_id: prod.discount_id, quantity: prod.quantity };
          });
          let order = {
            products: products,
            address: context.state.cart_settings.address,
            address_id: context.state.cart_settings.address.address_id,
            payment_type_id: context.state.cart_settings.payment.payment_type_id,
            comment: context.state.cart_settings.comment,
          }

          if(context.state.cart_settings.address.address_id == -5){
            order.is_new_address = true;
          }
          else{
            order.is_new_address = false;
          }

          console.log("Leci orderek",order)

         return axios.post(context.getters.getServerAddress +'/store/order', order,{ headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
    
              if(!silent){
                //connected to server, hide no connection banner
                context.dispatch('noConnectionChange',false);
              }
              if (data.status === 200){
                let order_id = data.data.result.order.order_id;
                let payment_id = data.data.result.payment.payment_id;

                context.commit('setOrderId',order_id);
                context.commit('setPaymentId',payment_id);
                
              }
              
              
              
              //save PaymentTypes data in vuex store
              console.log(data)
              
              context.commit('setOrderLoading',false);
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
              context.commit('setsetOrderLoading',false);

            }); 
      },

      cancelOrder(context, id){
        //get all Orders and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("Cancel order")
        
        let token = localStorage.getItem('jwtToken')
        return axios.put(context.getters.getServerAddress +'/account/order/' + id, null,{ headers: { Authorization: `Bearer ${token}` } })
          .then( (data) => {
  
           
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);
            
           
  
            //save Orders data in vuex store
            console.log(data)

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

      submitComplaint(context, obj){
        //get all Orders and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("New complaint")
        
        let token = localStorage.getItem('jwtToken')
        return axios.post(context.getters.getServerAddress +'/order/complaint', obj,{ headers: { Authorization: `Bearer ${token}` } })
          .then( (data) => {
  
           
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);
            
           
  
            //save Orders data in vuex store
            console.log(data)

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

      cancelComplaint(context, id){
        //get all Orders and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("Cancel complaint")
        
        let token = localStorage.getItem('jwtToken')
        return axios.put(context.getters.getServerAddress +'/order/complaint/' + id , null,{ headers: { Authorization: `Bearer ${token}` } })
          .then( (data) => {
  
           
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);
            
           
  
            //save Orders data in vuex store
            console.log(data)

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

      payForOrder(context, success){
        //get all StoreProducts and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("Payment to server")
        let token = localStorage.getItem('jwtToken');
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDdXN0b21lciIsInJvbGVzIjoiUk9MRV9DdXN0b21lciIsImV4cCI6MTYxMTI0ODU5M30.Jc8QKsIOGyvCxdF99xXubv_tYF6yKYCHaanJxvkW4vEwqiDsImANW-x1VfzA-78L5Vc80o8cE7_Jsqemg3FW6Q'
        if(context.state.cart_settings.order_id){
          if(success){

           return axios.put(context.getters.getServerAddress + '/payment/accept/' + context.state.cart_settings.payment_id, null, { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
              context.dispatch('noConnectionChange',false);
              console.log(data)
              return data.data;
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
          }
          else{
  
           return axios.put(context.getters.getServerAddress + '/payment/reject/' + context.state.cart_settings.payment_id, null, { headers: { Authorization: `Bearer ${token}` }})
            .then( (data) => {
              context.dispatch('noConnectionChange',false);
              console.log(data)
              return data.data;
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
          }
        }
        
      },

      getAllCustomerOrders(context, silent=false){
        //get all Orders and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("Gecik customer orders")
        context.commit('setOrdersLoading',true);
        let token = localStorage.getItem('jwtToken')
        return axios.get(context.getters.getServerAddress +'/account/orders', { headers: { Authorization: `Bearer ${token}` } })
          .then( (data) => {
  
            if(!silent){
              //connected to server, hide no connection banner
              context.dispatch('noConnectionChange',false);
            }
           
  
            //save Orders data in vuex store
            console.log(data)
            context.commit('setOrders',data.data.result);
            context.commit('setOrdersLoading',false);
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
            context.commit('setOrdersLoading',false);
          }); 
        
      },

      getOneCustomerOrder(context, id){
        //get all Orders and their User info from server
        //silent option is mainly for not hide reconnected banner
  
        console.log("Gecik one order")
        context.commit('setOrdersLoading',true);
        let token = localStorage.getItem('jwtToken')
        return axios.get(context.getters.getServerAddress +'/account/order/' + id, { headers: { Authorization: `Bearer ${token}` } })
          .then( (data) => {
  
           
            //connected to server, hide no connection banner
            context.dispatch('noConnectionChange',false);
            
           
  
            //save Orders data in vuex store
            console.log(data);
            return data.data.result;
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
            context.commit('setOrdersLoading',false);
          }); 
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
        },

        getCartSettings(context){
          return context.cart_settings;
        },

        getOrdersCustomer(context){
          return context.orders;
        },
        
        // getOrdersSortedAsc(context){
        //   return context.orders.sort((a,b) => Number.parseInt(a.order.order_id) - Number.parseInt(b.order.order_id));
        // },
        getOrdersSortedDescCustomer(context){
          return context.orders.sort((a,b) => Number.parseInt(b.order.order_id) - Number.parseInt(a.order.order_id));
        },
        getOrdersLoadingCustomer(context){
          return context.orders_loading;
        },
        
        isOnlinePayment(context){
          let type = context.cart_settings.payment.payment_type;
          if(type == "Za pobraniem gotówką" || type == "Za pobraniem kartą"){
            return false;
          }
          else{
            return true;
          }
        }

    },
};

export default StoreModule;