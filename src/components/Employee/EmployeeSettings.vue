<template>
    <div class="component-container">

        
        <div class="first cell">
            <p class="mb-5 section-title">{{ $t("common.myData") }}</p>
        </div>
        
       <div class="cell ">
            <p class="section-title">{{ $t("common.account") }}</p>
        </div>

       <div class="cell">
            <label class="cell__label">{{ $t("common.login") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="login"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("common.email") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="email"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("employee.permissionsLevel") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="access_level"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        


        <!-- employee -->

        <p class="cell mt-10 mb-3 section-title">{{ $t("employee.corporateData") }}</p>

        <div class="cell">
            <label class="cell__label">{{ $t("common.firstName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("common.lastName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="surname"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("employee.salary") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="salary"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("employee.jobTitle") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                disabled
                v-model="position"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        

        

        <!-- loading overlay (show only on loading)-->
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
// import Account from '@/components/Editors/AccountEditor.vue';
// import Customer from '@/components/Editors/CustomerEditor.vue';
// import Address from '@/components/Editors/AddressEditor.vue';

export default {
    
    name: 'CustomerAccountPage',

    components:{
        // Account,
        // Customer,
        // Address,
    },

    data() {
        return{
            
            login: '',
            email: '',
 
            // customer

            
            name: '',
            surname: '',
            salary: '',
            position: '',
            al: '',
            user_types: [],

        }

    },

    methods: {


        loadData(){
            //load account data from vuex store
           this.$store.dispatch('getEmployeeAccount').then( () => {
               //after getting data from vuex store set them in component
               let result = this.$store.getters.getEmployeeAccount;

               
                //account
                this.login = result.account.username;
                this.email = result.account.email;
                // this.al = result;


                //company data
                this.name = result.personal_data.name;
                this.surname = result.personal_data.surname;
                this.salary = result.personal_data.salary + ' zł';
                this.position = result.personal_data.position;
                


           })
        },

       

        
    },

    computed: {
        

        loading(){
            return this.$store.getters.getEmployeeAccountLoading;
        },

        access_level(){
            let res = this.user_types.find(u => u.value == this.al);
            if(res != null && res != undefined){
                return res.text;
            }
            else{
                return this.$t('common.notRecognized')
            }
        }
            
        

    },

    

    mounted() {
        let module = require("@/assets/countries.js");
        this.user_types = module.array;

        this.loadData();
    },

   


}
</script>

<style scoped>
    .component-container{
        width: 100%;
        height: 100%;
        /* background-color: aqua; */
        position: relative;
        background-color: rgb(240, 242, 245);
    }

    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        max-width: 800px;
        /* border: 1px solid red; */
    }

    .first{
        width: 80%;
        margin: 0 auto;
        margin-bottom: 1rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .double{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .pc-input{
        width: 3rem;
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
    }

    .input >>> input:disabled{
        color: rgba(40, 40, 40, 0.9) !important;
        font-weight: 500;
    }

    .inline{
        display: inline;
    }

    .section-title{
        color: rgba(40, 40, 40, 0.5);
    }

    .cell__popup-buttons{
        float: right;
        margin-bottom: 1rem;
    }


</style>