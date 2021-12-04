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
    
            <v-list-item-title class="item-color">{{ $t("views.roles.admin") }}</v-list-item-title>
    
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

                    <language-switcher/>

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
                                <v-list-item-subtitle class="mb-2">{{ $t("views.loggedAs") }}:</v-list-item-subtitle>
                                <v-list-item-title class="menu-name">{{user_name}}</v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list>
                
                        <v-divider></v-divider>
                
                        <v-list>
                            <v-list-item link :to="{name: 'Employee_Account'}">
                                <v-list-item-title class="c-text"  >{{ $t("common.myData") }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item link @click="logout()">
                                <v-list-item-title class="c-text" >{{ $t("common.logout") }}</v-list-item-title>
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
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default {
  components: { LanguageSwitcher },
    
    // components: {
    //    UserTable,
    // },

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
            { title: this.$t('views.sidebar.stats'), icon: 'mdi-chart-line', link: 'Admin_Stats_Orders' },
            // { title: this.$t('views.sidebar.complaints'), icon: 'mdi-chart-line', link: 'Admin_Stats_Orders' },
            { title: this.$t('views.sidebar.systemAlerts'), icon: 'mdi-alert-outline', link: 'Admin_Alerts' },
            { title: this.$t('views.sidebar.orders'), icon: 'mdi-package-variant-closed', link: 'Admin_Orders' },
            { title: this.$t('views.sidebar.messages'), icon: 'mdi-email', link: 'Admin_Messages' },
            { title: this.$t('views.sidebar.complaints'), icon: 'mdi-account-alert', link: 'Admin_Complaints' },
             { title: this.$t('views.sidebar.batches'), icon: 'mdi-tag-multiple', link: 'Admin_Batch' },
        ],
        mini_menu: false,
        mini: true,
        title: this.$t('views.sidebar.employees')
        }
    },


    methods: {
        showAlerts(){
            if(this.$route.name != 'Admin_Alerts'){
                this.$router.push({ name: 'Admin_Alerts'});
                this.title = this.$t('views.sidebar.systemAlerts');
            }
        },
        showMessages(){
            if(this.$route.name != 'Admin_Messages'){
                this.$router.push({ name: 'Admin_Messages'});
                this.title = this.$t('views.sidebar.messages');
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
            if(n != null){
                 return n.name + ' ' + n.surname;
            }
            else{
                return '';
            }
           
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