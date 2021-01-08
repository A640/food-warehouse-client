<template>
    <!-- Generate popup -->
    <popup :edit="edit" v-slot="scope" ref="popup" >
        <div>
            <!-- content of popup inserted into popup slot -->
        <div class="cell ">
            <p class="section-title">Konto</p>
        </div>

        <edit-account 
            :pid="account_id" 
            :validate="validate_trigger_a" 
            @dataUpdate="updateDataAccount" 
            @allValidated="validateA"
            v-on:setPermission="setPermission"
        />

        
        <div class="cell">
            <label class="cell__label">Rodzaj użytkownika</label>
            <v-autocomplete
                solo
                v-model="c_user_type"
                :items="u_types"
            ></v-autocomplete>
        </div>
        

        <div class="cell ">
            <p class="section-title">Klient</p>
        </div>

        <edit-customer
            :pid="customer_id" 
            :validate="validate_trigger_e" 
            @dataUpdate="updateDataCustomer" 
            @allValidated="validateE"
        />

         <div class="cell ">
            <p class="section-title">Adres</p>
        </div>

        <edit-address
            :pid="customer_id" 
            :validate="validate_trigger_e" 
            @dataUpdate="updateDataCustomer" 
            @allValidated="validateE"
        />

        <div class="cell">
            <div class="cell__popup-buttons">
                <v-btn text class="mr-2 mb-5" @click="scope.close_popup">Anuluj</v-btn>
                <v-btn 
                color="#1877F2" 
                class="mb-5" 
                dark 
                @click="validate()"
                >Zapisz</v-btn>
            </div>
        </div>

        <!-- loading overlay (show only on loading)-->
        <v-overlay
            :absolute="true"
            :value="overlay"
          >
            <v-progress-circular
                indeterminate
                color="amber"
            ></v-progress-circular>
          </v-overlay>
        </div>
        
     </popup>
</template>

<script>
import Popup from '@/components/Popups/Popup.vue'
import EditCustomer from '@/components/Editors/CustomerEditor.vue'
import EditAccount from '@/components/Editors/AccountEditor.vue'
import EditAddress from '@/components/Editors/AddressEditor.vue'

export default {

    name:'Add-Edit-CustomerPopupContent',

    components:{
        Popup,
        EditAccount,
        EditCustomer,
        EditAddress,
    },

    props:{
        account_id:{
            type: Number,
            default: -1,
        },
        customer_id:{
            type: Number,
            default: -1,
        },
        edit:{
            type: Boolean,
            default: false,
        },
    },

    data() {
        return{
            validate_trigger_a: false,
            validate_trigger_e: false,
            account: null,
            customer: null,
            a_validated: false,
            e_validated: false,

            c_user_type: 'Customer',
            u_types: [],

            overlay: false,
        }

    },

    methods: {

        updateDataAccount(data){
            this.account = data;
        },

        updateDataCustomer(data){
            this.customer = data;
        },

        validate(){
            this.a_validated = false;
            this.e_validated = false;
            this.validate_trigger_a = true;
            this.validate_trigger_e = true;
        },

        validateA(value){
            this.a_validated = value;
            this.validate_trigger_a = false;
            if(value == true && this.e_validated == true && this.c_user_type != null && this.c_user_type != ''){
                this.eSave();
            }
        },

        validateE(value){
            this.e_validated = value;
            this.validate_trigger_e = false;
            if(value == true && this.a_validated == true && this.c_user_type != null && this.c_user_type != ''){
                this.eSave();
            }
        },

        eSave(){
            this.overlay = true;
            let obj = {
                account: this.account,
                personal_data: this.customer, 
            };
            obj.account.permission = this.c_user_type;
            if(this.edit){

                obj.account.user_id = this.account_id;
                obj.personal_data.customer_id = this.customer_id;

                console.log("edit customer attempt");
                console.log(obj);
                this.$store.dispatch('editCustomer',obj)
                    .then( () => {
                        // if edited successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllCustomers');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })

            }else{
                console.log("save new customer attempt");
                console.log(obj);
                this.$store.dispatch('addCustomer',obj)
                    .then( () => {
                        // if added  successfully (resolved promise) clear popup and close
                        
                        this.$store.dispatch('getAllCustomers');
                        this.clear();
                        this.overlay = false;
                        this.dialogClose();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.overlay = false;
                    })
            }
            
        },

        nextStep(validated){
            if(validated){
                this.$emit('next',this.address);
            }
            this.validate_trigger = false;
        },

        dialogClose(){
            // call method in child component (popup component) using ref
            this.$refs.popup.closeDialog();
        },

        clear(){
            this.validate_trigger_a = false;
            this.validate_trigger_e = false;
            this.account = null;
            this.customer = null;
            this.a_validated = false;
            this.e_validated = false;

            this.c_user_type = 'Customer';
            this.u_types = [];
        },

        setPermission(permission){
            this.c_user_type = permission;
        }
    },

    mounted() {
        let module = require("@/assets/userTypes.js");
        this.u_types = module.array;
    },
}
</script>

<style scoped>

    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        /* border: 1px solid red; */
    }

    .cell__label{
        font-family: 'Segoe UI';
        font-weight: 450;
        margin-bottom: 1rem;
    }

    .align-right{
        text-align: right;
    }

    

    .align-center{
        text-align: center;
    }


    .section-title {
        color: #acacac;
        font-family: 'Segoe UI';
        font-weight: 400;
        font-size: 1rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }
   
    .cell__popup-buttons{
        float: right;
        margin-bottom: 1rem;
    }

    .flex{
        display: flex;
        flex-direction: row;
        align-content: flex-end;
    }
</style>