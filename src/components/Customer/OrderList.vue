<template>
    <div class="store-grid">
            
        
        <Order v-for="order in orders" :key="order.order.order_id" :order="order"  />
                
           
        <!-- Loader -->
        <v-overlay
            :absolute="true"
            :value="loading"
        >
            <v-progress-circular
                indeterminate
                color="amber"
            ></v-progress-circular>
        </v-overlay>
       
    </div>
</template>

<script>
import Order from '@/components/Customer/OrderMini.vue'


export default {

    components:{
        Order,
    },


    data () {
        return {


        }
    },

    computed:{
        store_name(){
            return this.$store.getters.getStoreName;
        },

        orders(){
            return this.$store.getters.getOrdersSortedDescCustomer;
        },

        loading(){
            return this.$store.getters.getOrdersLoadingCustomer;
        }

    },




    mounted(){
        this.$store.dispatch('getAllCustomerOrders')
    }


}
</script>

<style scoped>

    .store-grid{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: start;
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


</style>