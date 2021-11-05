<template>
    <div class="store">
        <div id="bar">
            <h2 @click="showMainStore()" class="appbar__title">{{ store_name }}</h2>
            
            <div class="search">
                <v-combobox
                    class="mt-2"
                    :label="$t('views.searchPlaceholder')"
                    clearable
                    solo
                    background-color="#f0f2f5"
                    hide-selected
                    flat
                    hide-details=true
                    v-model="i_search"
                    :items="products"
                    
                ></v-combobox>
            </div>

            <div>
                <v-badge
                    :content="cart_count"
                    :value="cart_count"
                    color="green lighten-2"
                    class="mr-10"
                    overlap
                    
                >
                    <v-btn depressed @click="showCart()">
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    
                    
                </v-badge>
                
                
                <v-menu
                    v-if="loggedIn"
                    v-model="mini_menu"
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                    bottom
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            depressed
                            v-on="on"
                            v-bind="attrs"
                        >
                            <v-icon>mdi-account</v-icon>
                        </v-btn>
                    </template>
            
                    <v-card>
                    <v-list>
                        <v-list-item>
            
                        <v-list-item-content>
                            <v-list-item-subtitle class="mb-2">{{ $t("views.loggedAs") }}:</v-list-item-subtitle>
                            <v-list-item-title class="menu-name">{{user_name}}</v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
            
                    <v-divider></v-divider>
            
                    <v-list>
                        <v-list-item link :to="{name: 'Customer_Account'}">
                            <v-list-item-title class="c-text"  >{{ $t("views.myAccount") }}</v-list-item-title>
                        </v-list-item>
            
                        <v-list-item link :to="{name: 'Customer_Orders'}">
                            <v-list-item-title class="c-text"  >{{ $t("views.myOrders") }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-title class="c-text" @click="logout()" >{{ $t("common.logout") }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-card>
                </v-menu>


                <v-btn
                    v-else
                    depressed
                    v-on="on"
                    v-bind="attrs"
                    @click="loginRedirect()"
                >
                    {{ $t("register.logIn") }}
                </v-btn>
            </div>
            
           
        </div>
        
        <div id="content">
            <router-view :key="$route.path" />
        </div>
    </div>
</template>

<script>



export default {

    components:{

    },


    data () {
        return {
            i_search: '',
            e_search: '',
            products_search: [],
            mini_menu: false,
        }
    },

    computed:{
        store_name(){
            return this.$store.getters.getStoreName;
        },
        cart_count(){
            return this.$store.getters.getCartItemCount;
        },
        products(){
            return this.$store.getters.getStoreProducts.map((p) => {
                return {text: p.name, value:p.product_id}
            });
        },
        user_name(){
            let n = this.$store.getters.getName;
            return n.name + ' ' + n.surname;
        },
        reconnected(){
            return this.$store.getters.getReconnected;
        },
        loggedIn(){
            return this.$store.getters.getIsLoggedIn;
        }
    },

    methods: {
        showMainStore(){
            console.log(this.$route.name);
            if(this.$route.name != 'Store_Grid'){
                this.$router.push({ name: 'Store_Grid'});
            }
        },
        showCart(){
            console.log(this.$route.name);
            if(this.$route.name != 'Store_Cart'){
                this.$router.push({ name: 'Store_Cart'});
            }
        },
        loginRedirect(){
            console.log(this.$route.name);
            if(this.$route.name != 'Login'){
                this.$router.push({ name: 'Login'});
            }
        },
        logout(){
            this.$store.dispatch('logout')
        }

    },

    watch:{
        i_search(val){
            this.$store.commit('setSearch',val);
        }
    },



    mounted() {
        if(this.loggedIn){
            this.$store.dispatch('getName')
        }
    },


}
</script>

<style scoped>

    .store{
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

    .menu-name{
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
    }
    .c-text{
        text-align: center;
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
        order: 2;
        flex-grow: 1;
        background-color: #f0f2f5;
    }

    .appbar__title{
        /* margin: 0 auto; */
        margin-left: 1rem;
        font-family: 'Segoe UI';
        font-weight: 800;
        cursor: pointer;
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