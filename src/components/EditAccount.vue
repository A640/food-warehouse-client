<template>
    <div>
        <v-form ref="accountForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">Login</label>
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
            <label class="cell__label">E-mail</label>
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
            <label class="cell__label">Hasło</label>
            <v-text-field
                class="input"
                label=""
                solo
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password"
                :rules="r_password"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Powtórz hasło</label>
            <v-text-field
                class="input"
                label=""
                solo
                :append-icon="passwd_show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwd_show ? 'text' : 'password'"
                @click:append="passwd_show = !passwd_show"
                v-model="c_password2"
                v-on:keyup.enter.stop
                :rules="r_password2"
            ></v-text-field>
        </form>

        </v-form>
    </div>
</template>

<script>
export default {

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

            r_login: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 32 || 'Maksymalnie 32 znaki',
                value => (value || '').length >= 3 || 'Minimum 3 znaki',  
            ],
            r_email: [
                value => !!value || 'To pole jest wymagane!',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail musi być poprawny'
            ],

            r_password: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length >= 8 || 'Hasło musi zawierać conajmniej 8 znaków',
                value => (value || '').length <= 256 || 'Maksymalnie 256 znaków',
                v => !v || /[a-z]+/.test(v) || 'Wymagana conajmniej jedna mała litera',
                v => !v || /[A-Z]+/.test(v) || 'Wymagana conajmniej jedna duża litera',
                v => !v || /[0-9]+/.test(v) || 'Wymagana conajmniej jedna cyfra',
            ],

            r_password2: [
                (value) => !!value || 'Podaj ponownie hasło',
                (value) => value === this.c_password || 'Podane hasła nie zgadzają się ze sobą',
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
            console.log("Get initial data: " + id);
           // this.$store.getAccount(id)
        }
    },

    watch: {
        c_login (val) {
            this.$store.dispatch('checkLogin',val).then(valid => {
                this.e_login = valid ?  ['Ten login jest zajęty! Wybierz inny login.'] : [];
            })
        },

        c_email (val) {
            this.$store.dispatch('checkEmail',val).then(valid => {
                this.e_email = valid ?  ['Ten email jest już w użyciu! Podaj inny adres.'] : [];
            })
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