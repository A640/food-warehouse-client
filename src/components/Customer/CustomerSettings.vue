<template>
    <div class="component-container">

        <v-form v-model="form_valid" ref="CustomerForm">
            <div class="first cell">
            <p class="mb-5 section-title">{{ $t("common.myData") }}</p>
            <v-btn depressed :color="edit_mode ? 'rgb(130, 180, 170)' : '' " @click="edit_mode ? cancell() : edit_mode = true"> <v-icon :color="edit_mode ? 'rgb(255,255,255)' : 'rgb(0,0,0)'">mdi-pencil</v-icon> </v-btn>
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
                :disabled="!edit_mode"
                v-model="c_login"
                :rules="r_login"
                :error-messages="e_login"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("common.email") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                :disabled="!edit_mode"
                v-model="c_email"
                :rules="r_email"
                :error-messages="e_email"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        
        <div class="cell">
            <label class="cell__label">{{ $t("common.password") }}</label>
            <v-text-field
                class="input"
                :label="password_rules.length == 0 ? $t('common.notChanged') : ''"
                solo
                :disabled="!edit_mode"
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password"
                :rules="password_rules"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("common.passwordRepeat") }}</label>
            <v-text-field
                class="input"
                :label="password_rules.length == 0 ? $t('common.notChanged') : ''"
                solo
                :disabled="!edit_mode"
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password2"
                v-on:keyup.enter.stop
                :rules="password_rules2"
            ></v-text-field>
        </div>



        <!-- customer -->

        <p class="cell mt-10 mb-3 section-title">{{ $t("common.personalData") }}</p>

        <div class="cell">
            <label class="cell__label">{{ $t("common.firstName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                :disabled="!edit_mode"
                v-model="c_name"
                :rules="r_name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("common.lastName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                :disabled="!edit_mode"
                v-model="c_surname"
                :rules="r_surname"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell">
            <label class="cell__label">{{ $t("common.phone") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                :disabled="!edit_mode"
                v-model="c_phone"
                :rules="r_phone"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>
        <div class="cell">
            <v-switch v-model="is_company" color="rgb(130, 180, 170)" :disabled="!edit_mode" :label="$t('common.haveCompany')"></v-switch>
        </div>
        

        <div class="cell" v-if="is_company">
            <label class="cell__label">{{ $t("common.companyName") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                :disabled="!edit_mode"
                v-model="c_company"
                :rules="r_company"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>

        <div class="cell" v-if="is_company">
            <label class="cell__label">{{ $t("common.taxID") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                :disabled="!edit_mode"
                v-model="c_tax"
                :rules="r_tax"
                v-on:keyup.enter.stop
            ></v-text-field>
        </div>




        <!-- Adress -->

        <p class="cell mt-10 mb-3 section-title">{{ $t("address.address") }}</p>

         <div class="cell">
                <label class="cell__label">{{ $t("address.street") }}</label>
                <v-text-field
                    class="input"
                    label=""
                    solo
                    :disabled="!edit_mode"
                    v-model="c_street"
                    :rules="r_street"
                    v-on:keyup.enter.stop
                ></v-text-field>
            </div>


            <div class="cell double">
                <div class="mr-5">
                    <label class="cell__label">{{ $t("address.buildingNumber") }}</label>
                    <v-text-field
                        class="input"
                        label=""
                        solo
                        :disabled="!edit_mode"
                        v-model="c_building_num"
                        :rules="r_building_num"
                        v-on:keyup.enter.stop
                    ></v-text-field>
                </div>
                <div class="ml-5">
                    <label class="cell__label">{{ $t("address.apartmentNumber") }}</label>
                    <v-text-field
                        class="input"
                        label=""
                        solo
                        :disabled="!edit_mode"
                        v-model="c_apartment_num"
                        :rules="r_apartment_num"
                        v-on:keyup.enter.stop
                    ></v-text-field>
                </div>    


            </div>

            <div class="cell">
                
            </div>

            <div class="cell">
                <label class="cell__label">{{ $t("address.city") }}</label>
                <v-text-field
                    class="input"
                    label=""
                    solo
                    :disabled="!edit_mode"
                    v-model="c_town"
                    :rules="r_town"
                    v-on:keyup.enter.stop
                ></v-text-field>
            </div>

            <div class="cell" >
                <label class="cell__label">{{ $t("address.postCode") }}</label>
                <div class="double">
                    <v-text-field
                    class="pc-input input inline mr-5"
                    label=""
                    type="number"
                    solo
                    :disabled="!edit_mode"       
                    v-model="c_pc1"
                    :rules="r_pc1"
                    v-on:keyup.enter.stop
                ></v-text-field>

                <p>-</p>

                <v-text-field
                    class="pc-input input inline ml-5"
                    label=""
                    type="number"
                    solo
                    :disabled="!edit_mode"
                    v-model="c_pc2"
                    :rules="r_pc2"
                    v-on:keyup.enter.stop
                ></v-text-field>
                </div>
                
                
            </div>


            <div class="cell">
                <label class="cell__label">{{ $t("address.country") }}</label>
                <v-autocomplete
                    solo
                    :disabled="!edit_mode"
                    :rules="r_country"
                    v-model="c_country"
                    :items="country"
                ></v-autocomplete>
            </div>


        <div class="cell" v-if="edit_mode">
            <div class="cell__popup-buttons">
                <v-btn text class="mr-2 mb-5" @click="cancell()">{{ $t("common.cancel") }}</v-btn>
                <v-btn 
                color="rgb(130, 180, 170)" 
                class="mb-5" 
                dark 
                @click="save()"
                >{{ $t("common.save") }}</v-btn>
            </div>
        </div>
        </v-form>

        

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
            passwd_show: false,
            c_login: '',
            c_email: '',
            c_password: '',
            c_password2: '',
            c_error: false,
            e_login: [],
            e_email: [],

            allowed_login: null,
            allowed_email: null,


            r_login: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),  
            ],
            r_email: [
                value => !!value || this.$t('errors.required'),
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('errors.emailInvalid')
            ],

            r_password: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length >= 8 || this.$t('errors.passCount', {count: '8'} ),
                value => (value || '').length <= 256 || this.$t('errors.max', {count: '256'} ),
                v => !v || /[a-z]+/.test(v) || this.$t('errors.passLower'),
                v => !v || /[A-Z]+/.test(v) || this.$t('errors.passUpper'),
                v => !v || /[0-9]+/.test(v) || this.$t('errors.passDigit'),
            ],

            r_password2: [
                (value) => !!value || this.$t('errors.passRetype'),
                (value) => value === this.c_password || this.$t('errors.passNotMatch'),
            ],


            // customer

            is_company: false,
            c_name: '',
            c_surname: '',
            c_phone: '',
            c_company: '',
            c_tax: '',

            r_name: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'}),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
            ],

            r_surname: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'}),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
            ],

            r_phone: [
                value => !!value || this.$t('errors.required'),
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                value => (value || '').length >= 9 || this.$t('errors.phoneDigits'),
            ],

            r_company: [],
            r_tax: [],

           // address

            c_street: '',
            c_building_num: '',
            c_apartment_num: '',
            c_town: '',
            c_pc1: '',
            c_pc2: '',
            c_country: 'PL',
            address_id: null,

            r_street: [
                value => (value || '').length <= 64 || this.$t('errors.max', {count: '64'}),
            ],

            r_building_num: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 16 || this.$t('errors.max', {count: '16'}),
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_apartment_num: [
                value => (value || '').length <= 16 || this.$t('errors.max', {count: '16'}),
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_town: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 128 || this.$t('errors.max', {count: '128'}),
            ],

            r_pc1: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length == 2 || this.$t('errors.mustContainDigits', {count: '2'}),
                v => !v || /[0-9]{2}/.test(v) || this.$t('errors.invalidCodeFormat'),
            ],

            r_pc2: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length == 3 || this.$t('errors.mustContainDigits', {count: '3'}),
                v => !v || /[0-9]{3}/.test(v) || this.$t('errors.invalidCodeFormat'),
            ],

            r_country: [
                 value => !!value || this.$t('errors.required'),
            ],

            country: [],


            //

            edit_mode: false,
            form_valid: false,
        }

    },

    methods: {

        allValidated(){
            if(this.form_valid && this.e_login.length == 0 && this.e_email.length == 0){
                return true;
            }
            return false
        },

        loadData(){
            //load account data from vuex store
           this.$store.dispatch('getAccount').then( () => {
               //after getting data from vuex store set them in component
               let result = this.$store.getters.getAccount;

               
                //account
                this.c_login = result.account.username;
                this.c_email = result.account.email;
                this.allowed_login = result.account.username;
                this.allowed_email = result.account.email;

                //personal data
                this.c_name = result.personal_data.name;
                this.c_surname = result.personal_data.surname;
                this.c_phone = result.personal_data.phone_number;
                this.c_company = result.personal_data.firm_name;
                this.c_tax = result.personal_data.tax_id;
                if(result.personal_data.firm_name != '' && result.personal_data.firm_name != null){
                    this.is_company = true;
                }
                else{
                    this.is_company = false;
                }

                //address
                this.c_street = result.address.street
                this.c_building_num = result.address.building_number
                this.c_apartment_num = result.address.apartment_number
                this.c_town = result.address.town
                let postal = result.address.postal_code.split('-');
                this.c_pc1 = postal[0];
                this.c_pc2 = postal[1];
                this.c_country = result.address.country;
                this.address_id = result.address.address_id;


           })
        },

        cancell(){
            this.loadData();
            this.edit_mode = false;
        },

        save() {
            
            if(this.allValidated()){

                //account
                let account = {
                    username: this.c_login,
                    email: this.c_email,
                    password: this.c_password,
                };

                //customer

                let personal_details = {
                        name: this.c_name,
                        surname: this.c_surname,
                        phone_number: this.c_phone,
                        firm_name: this.c_company,
                        tax_id: this.c_tax,
                    }

                if(!this.is_company){
                    this.c_company = '';
                    this.c_tax = '';
                    personal_details.firm_name = null;
                    personal_details.tax_id = null;
                }

                //address
                let pc = String(this.c_pc1) + "-" + String(this.c_pc2);
                let address = {
                        street: this.c_street,
                        building_number: this.c_building_num,
                        apartment_number: this.c_apartment_num,
                        town: this.c_town,
                        postal_code: pc,
                        country: this.c_country,
                    }

                if(this.address_id != null){
                    address.address_id = this.address_id;
                }

                if(address.street == ''){
                    address.street = null;
                }

                if(address.apartment_number == ''){
                    address.apartment_number = null;
                }

                let obj = {
                    account: account,
                    personal_data: personal_details,
                    address: address,
                }

                this.$store.dispatch('updateAccount',obj).then(() => {
                    this.edit_mode = false;
                    this.loadData();
                })
            }
            
            
        }
    },

    computed: {
        password_rules(){
            //if editing existing account(pid != -1) and not changing password (this.c_password == '')
            //allow blank, because password will not change in database 
            if(this.pid != -1 && this.c_password == ''){
                return [];
            }else{
                //if adding new user or changing password in existing one, apply normal password rules
                return this.r_password;
            }
        },

        password_rules2(){
            //if editing existing account(pid != -1) and not changing password (this.c_password == '')
            //allow blank, because password will not change in database 
            if(this.pid != -1 && this.c_password == ''){
                return [];
            }else{
                //if adding new user or changing password in existing one, apply normal repeat password rules
                return this.r_password2;
            }
        },

        loading(){
            return this.$store.getters.getAccountLoading;
        },

    },

    watch: {
        c_login (val) {
            //check if val is the same as the login we got from vuex store
            if(val == this.allowed_login){
                this.e_login = [];
            }else{
                //check if login is already in database
                this.$store.dispatch('checkLogin',val).then(valid => {
                    //show custom error if login in database
                    this.e_login = valid ?  [this.$t('errors.loginTaken')] : [];
                })
            }
            
        },

        c_email (val) {
            //check if val is the same as the email we got from vuex store
            if(val == this.allowed_email){
                this.e_email = [];
            }else{
                //check if email is already in database
                this.$store.dispatch('checkEmail',val).then(valid => {
                    //show custom error if email in database
                    this.e_email = valid ?  [this.$t('errors.emailTaken')] : [];
                })
            }
        },

        
    },

    mounted() {
        let module = require("@/assets/countries.js");
        this.country = module.array;

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
        color: rgba(40, 40, 40, 0.7) !important;
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