<template>
    <div>
        <div id="bar">
            <v-app-bar class="bar__appbar"
                elevation="1"
                color="#ffffff"
            >
                <h2 class="appbar__title">{{ store_name }}</h2>
            </v-app-bar>
        </div>
        
        <div id="content">
            <h1>{{ $t("welcome.inner") }}</h1>
            <transition name="slide-fade" mode="out-in">
               <v-btn outlined @click="showStore()">{{ $t("views.productCatalog") }}</v-btn>
            </transition>
        </div>
    </div>
</template>

<script>
export default {


    data () {
        return {
        drawer: true,
        items: [
            { title: this.$t('views.sidebar.employees'), icon: 'mdi-account', link: 'Admin_Employees' },
            { title: this.$t('views.sidebar.customers'), icon: 'mdi-account-group', link: 'Admin_Customers' },
            { title: this.$t('views.sidebar.vehicles'), icon: 'mdi-truck', link: 'Admin_Vehicles' },
            { title: this.$t('views.sidebar.warehouses'), icon:  'mdi-home-variant', link: 'Admin_Warehouses'},
            { title: this.$t('views.sidebar.manufacturers'), icon: 'mdi-food', link: 'Admin_Producers' },
            { title: this.$t('views.sidebar.products'), icon: 'mdi-tag-outline', link: 'Admin_Products' },
        ],
        mini: true,
        title: this.$t('views.sidebar.employees')
        }
    },

    computed:{
        store_name(){
            return this.$store.getters.getStoreName;
        }
    },

    methods: {
        showStore(){
            if(this.$route.name != 'Store_Cart'){
                this.$router.push({ name: 'Store_Grid'});
            }
        }
       
    },


}
</script>

<style scoped>

    .admin{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        flex-direction: row;
        
    }

    .bar__appbar{
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        margin-bottom: 1rem;
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
        order: 1;
        flex-grow: 0;
    }

    #content{
        margin-left: 1rem;
        margin-right: 1rem;
        order: 2;
        flex-grow: 1;
    }

    .appbar__title{
        /* margin: 0 auto; */
        margin-left: 1rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }


</style>