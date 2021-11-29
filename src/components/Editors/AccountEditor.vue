<template>
    <div>
        <v-form ref="accountForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">{{ $t("common.login") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_login"
                :rules="r_login"
                :error-messages="e_login"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("common.email") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_email"
                :rules="r_email"
                :error-messages="e_email"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        
        <form class="cell">
            <label class="cell__label">{{ $t("common.password") }}</label>
            <v-text-field
                class="input"
                :label="password_rules.length == 0 ? $t('notChanged') : ''"
                solo
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password"
                :rules="password_rules"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("common.passwordRepeat") }}</label>
            <v-text-field
                class="input"
                :label="password_rules.length == 0 ? $t('notChanged') : ''"
                solo
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password2"
                v-on:keyup.enter.stop
                :rules="password_rules2"
            ></v-text-field>
        </form>

        </v-form>
    </div>
</template>

<script>
export default {

    name: 'AccountEditor',

    props: {
        pid: {
            default: -1,
        },
        
        validate: {
            type: Boolean,
            default: false,
        },
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
            ]
        }

    },

    methods: {

        allValidated(){
            if(this.$refs.accountForm.validate() && this.e_login.length == 0 && this.e_email.length == 0){
                return true;
            }
            return false
        },

        loadData(id){
            //load account data from vuex store
           this.$store.dispatch('getAccountData',id).then( (result) => {
               //after getting data from vuex store set them in component
                this.c_login = result.username;
                this.c_email = result.email;
                this.allowed_login = result.username;
                this.allowed_email = result.email;
                this.$emit('setPermission', result.permission);
           })
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
        }
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

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let account = {
                        username: this.c_login,
                        email: this.c_email,
                        password: this.c_password,
                    }

                    this.$emit('dataUpdate',account);
                    this.$emit('allValidated',true);
                }
                else{
                    this.$emit('allValidated',false);
                }
            }
        }
    },

    mounted() {
        if(this.pid == -1){
            this.passwd_show = false;
            this.c_login = '';
            this.c_email = '';
            this.c_password = '';
            this.c_password2 = '';
            this.c_error = false;
            this.e_login = [];
            this.e_email = [];
        }
        else{
            this.loadData(this.pid);
        }
    },

}
</script>


<style scoped>

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .title{
        /* margin: 0 auto; */
        margin-top: 2rem;
        margin-bottom: 3rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        font-size: 1.3rem;
    }

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

    .submit__btn{
        position: absolute;
        top: 0;
        right: 0;
        font-family: 'Segoe UI';
        font-weight: 500;
        background-color: #007E33;
    }

    .align-center{
        text-align: center;
    }

    .footer{
        margin: auto;
        margin-bottom: 2rem;
        margin-top: 2rem;
    }

    .cell > p {
        font-family: 'Segoe UI';
        font-weight: 500;
        font-size: 1rem;
    }

    .relative{
        position: relative;
        height: 5rem;
        margin-top: 1rem;
    }

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

    .error{
        margin-bottom: 1.5rem;
    }

    .error > p{
        font-size: 0.8rem;
        color: rgb(209, 33, 33);
    }

</style>