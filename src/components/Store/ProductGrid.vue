<template>
    <div class="store-grid">

                
        <product class="product" v-for="product in products" :key="product.product_id"  :product="product"  />
                
                
       
    </div>
</template>

<script>
import Product from '@/components/Store/Product.vue'


export default {

    components:{
        Product,
    },


    data () {
        return {
            products_search: [],

        }
    },

    computed:{
        store_name(){
            return this.$store.getters.getStoreName;
        },

        search(){
            if(this.$store.getters.getSearch != undefined && this.$store.getters.getSearch != null){
                if(typeof(this.$store.getters.getSearch) == String){
                    return this.$store.getters.getSearch;
                }
                else{
                    return this.$store.getters.getSearch.text;
                }
            }
            else{
                return '';
            }
            
            
        },

        products(){
            if(this.search == '' || this.search == null){
                return this.$store.getters.getStoreProducts
            }
            else{
                return this.$store.getters.getStoreProducts.filter(item => {
                    return (item.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    item.description.toLowerCase().includes(this.search.toLowerCase())   ||
                    item.short_description.toLowerCase().includes(this.search.toLowerCase()) ||
                    item.producer_name.toLowerCase().includes(this.search.toLowerCase())   ||
                    String(item.product_id).includes(this.search.toLowerCase()) ||
                    String(item.sell_price).includes(this.search.toLowerCase()) ||
                    item.category.toLowerCase().includes(this.search.toLowerCase()));
            });
            }
            
        },

        reconnected(){
            return this.$store.getters.getReconnected;
        }


    },

     watch:{
        reconnected(val){
        if(val){
            this.$store.dispatch('getAllStoreProducts',true);
        }
        }
    },


    mounted(){
        this.$store.dispatch('getAllStoreProducts')
    }


}
</script>

<style scoped>

    .store-grid{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 2rem;
        justify-content: center;
    }

    .bar__appbar{
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        margin-bottom: 1rem;
        height: 10%;
    }

    .nav__navbar{
        color: #17171d;
    }

    .item-color{
        color: rgb(255, 255, 255);
    }

    #nav{
        order: 1;
    }

    #not-nav{
        order: 2;
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #bar{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background-color: #ffffff;
        order: 1;
        flex-grow: 0;
        height: 6rem;
        width: 100%;
    }

    #content{
        margin-left: 1rem;
        margin-right: 1rem;
        order: 2;
        flex-grow: 1;
        background-color: #f0f2f5;
    }

    .appbar__title{
        /* margin: 0 auto; */
        margin-left: 1rem;
        font-family: 'Segoe UI';
        font-weight: 800;
        
    }

    .input{
        width: 50%;
    }

    .search{
        width: 50%;
        display: flex;
        align-items: center;
    }

    .product{
        height: fit-content;
        margin: 15px;
    }


</style>