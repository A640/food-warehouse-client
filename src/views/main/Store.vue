<template>
    <div class="store">
        <div id="bar">
            <h2 @click="showMainStore()" class="appbar__title">{{ store_name }}</h2>
            
            <div class="search">
                <v-combobox
                    class="mt-2"
                    label="Czego szukasz?"
                    clearable
                    solo
                    background-color="#f0f2f5"
                    hide-selected
                    flat
                    hide-details=true
                    v-model="i_search"
                    :items="products_search"
                    :error="e_search"
                ></v-combobox>
            </div>

            

            <v-menu
                v-model="mini_menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
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
                        <v-list-item-title>Kamil Bawaban</v-list-item-title>
                        <v-list-item-subtitle>Kamilox</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
        
                <v-divider></v-divider>
        
                <v-list>
                    <v-list-item>
                    <v-list-item-action>
                        
                    </v-list-item-action>
                    <v-list-item-title>Enable messages</v-list-item-title>
                    </v-list-item>
        
                    <v-list-item>
                    <v-list-item-action>
                        
                    </v-list-item-action>
                    <v-list-item-title>Enable hints</v-list-item-title>
                    </v-list-item>
                </v-list>
        
                <v-card-actions>
                    <v-spacer></v-spacer>
        
                    <v-btn
                    text
                    @click="menu = false"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    color="primary"
                    text
                    @click="menu = false"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-menu>
           
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
        }
    },

    methods: {
        showMainStore(){
            console.log(this.$route.name);
            if(this.$route.name != 'Store_Grid'){
                this.$router.push({ name: 'Store_Grid'});
            }
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