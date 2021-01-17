<template>
    <div class="admin">
        <div id="nav">
            <v-navigation-drawer
            v-model="drawer"
            dark
            :mini-variant.sync="mini"
            class="nav__navbar"
            permanent
            color="#09151E"
        >
            <v-list-item >
           <v-list-item-icon
                @click.stop="mini = !mini"
           >
                <v-icon dark>mdi-menu</v-icon>
            </v-list-item-icon>
    
            <v-list-item-title class="item-color">Administrator</v-list-item-title>
    
            <v-btn
                icon
                dark
                @click.stop="mini = !mini"
            >
                <v-icon class="item-color">mdi-chevron-left</v-icon>
            </v-btn>
            </v-list-item>
    
            <v-divider></v-divider>
    
            <v-list >
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="{name: item.link}"
                link
                @click="title = item.title"
            >
                <v-list-item-icon>
                <v-icon class="item-color">{{ item.icon }}</v-icon>
                </v-list-item-icon>
    
                <v-list-item-content>
                <v-list-item-title class="item-color"  >{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>
        </div>
        <div id="not-nav">
            <div id="bar">
                <v-app-bar class="bar__appbar"
                    elevation="2"
                    color="#ffffff"
                >
                    <!-- title -->
                    <h2 class="appbar__title">{{ title }}</h2>

                    <v-spacer></v-spacer>

                    <v-badge
                        :content="alert_count"
                        :value="true"
                        color="amber darken-2"
                        class="mr-10"
                        overlap
                        v-if="alert_count > 0"
                    >
                        <v-btn depressed @click="showAlerts()">
                            <v-icon color="amber darken-2">mdi-alert</v-icon>
                            <!-- <v-icon>mdi-email-outline</v-icon> -->
                        </v-btn>
                        
                        
                    </v-badge>

                    <v-badge
                        :content="messages_count"
                        :value="messages_count > 0"
                        color="green lighten-2"
                        class="mr-10"
                        overlap
                        
                    >
                        <v-btn depressed @click="showMessages()">
                            <v-icon>mdi-email</v-icon>
                            <!-- <v-icon>mdi-email-outline</v-icon> -->
                        </v-btn>
                        
                        
                    </v-badge>

                    <!-- account menu -->
                    <v-menu
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
                                <v-list-item-subtitle class="mb-2">Zalogowany jako:</v-list-item-subtitle>
                                <v-list-item-title class="menu-name">{{user_name}}</v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list>
                
                        <v-divider></v-divider>
                
                        <v-list>
                            <v-list-item link :to="{name: 'Employee_Account'}">
                                <v-list-item-title class="c-text"  >Moje dane</v-list-item-title>
                            </v-list-item>
                            <v-list-item link>
                                <v-list-item-title class="c-text" @click="logout()">Wyloguj</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-card>
                    </v-menu>
                </v-app-bar>
            </div>
            
            <div id="content">
               <transition name="slide-fade" mode="out-in">
                    <router-view :key="$route.path" /> 
                </transition>
            </div>
            
        </div>
        
    </div>
</template>

<script>
//import UserTable from '@/components/EmployeeTable.vue' 

export default {
    
    // components: {
    //    UserTable,
    // },

    data () {
        return {
        drawer: true,
        items: [
            { title: 'Pracownicy', icon: 'mdi-account', link: 'Admin_Employees' },
            { title: 'Klienci', icon: 'mdi-account-group', link: 'Admin_Customers' },
            { title: 'Pojazdy', icon: 'mdi-truck', link: 'Admin_Vehicles' },
            { title: 'Magazyny', icon:  'mdi-home-variant', link: 'Admin_Warehouses'},
            { title: 'Producenci', icon: 'mdi-food', link: 'Admin_Producers' },
            { title: 'Produkty', icon: 'mdi-tag-outline', link: 'Admin_Products' },
        ],
        mini: true,
        title: 'Pracownicy'
        }
    },


    methods: {
        showAlerts(){
            if(this.$route.name != 'Manager_Alerts'){
                this.$router.push({ name: 'Manager_Alerts'});
                this.title = 'Komunikaty systemowe';
            }
        },
        showMessages(){
            if(this.$route.name != 'Manager_Messages'){
                this.$router.push({ name: 'Manager_Messages'});
                this.title = 'Wiadomości';
            }
        },
        logout(){
            this.$store.dispatch('logout')
        },
    },

    computed:{
        alert_count(){
            return this.$store.getters.getAlertsCount;
        },

        messages_count(){
            return this.$store.getters.getMessagesCount;
        },

        user_name(){
            let n = this.$store.getters.getName;
            return n.name + ' ' + n.surname;
        },
    },

    mounted() {
        this.$store.dispatch('getName');
        this.$store.dispatch('getMessages');
        this.$store.dispatch('getUnreadMessagesCount');
        this.$store.dispatch('getAlerts');
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