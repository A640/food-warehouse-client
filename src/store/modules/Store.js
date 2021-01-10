import axios from 'axios'

const StoreModule = {

    state: { 

        store_products: [],
        store_products_loading: false,
        cart: [],
// {product_id:1,quantity:20,discount_id:-1},{product_id:1,quantity:40,discount_id:1}
    },

    mutations: {

        setStoreProducts(context,data){
            context.store_products = data;
        },

        setStoreProductsLoading(context, value){
            context.store_products_loading = value;
        },

        addToCart(context,product){
          let res = context.cart.find(s_product => (s_product.product_id == product.product_id && s_product.discount_id == product.discount_id))
          if(res){
              res.quantity += product.quantity;
          }
          context.cart.push(product);
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
            }
            else{
              let d = p.discounts.find(discount => discount.discount_id = prod.discount_id);
              prod.sell_price = d.sell_price;
              prod.due_to = d.eat_by_date;
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

         

    },
};

export default StoreModule;