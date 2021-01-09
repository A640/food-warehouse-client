<template>
    <div class="store-grid">
       
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                
                <v-flex v-for="i in 20" :key="i" >
                    <product name="Bejkon" :added=false price=12.5 />
                </v-flex>
                
            </v-layout>
        </v-container>
                
       
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
            i_search: '',
            e_search: '',
            products_search: [],
        }
    },

    computed:{
        store_name(){
            return this.$store.getters.getStoreName;
        }
    },


}
</script>

<style scoped>

    .store-grid{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        flex-direction: column;
        
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