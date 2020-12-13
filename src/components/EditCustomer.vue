<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">Imie</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_name"
                :rules="r_name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Nazwisko</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_surname"
                :rules="r_surname"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Teflon</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_phone"
                :rules="r_phone"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>
        <div class="cell">
            <v-switch v-model="is_company" label="Mam firmę"></v-switch>
        </div>
        

        <form class="cell" v-if="is_company">
            <label class="cell__label">Nazwa firmy</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_company"
                :rules="r_company"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell" v-if="is_company">
            <label class="cell__label">NIP</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_tax"
                :rules="r_tax"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>
    </v-form>
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
            is_company: false,
            c_name: '',
            c_surname: '',
            c_phone: '',
            c_company: '',
            c_tax: '',

            r_name: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 32 || 'Maksymalnie 32 znaków',
                value => (value || '').length >= 3 || 'Minimum 3 znaki',
            ],

            r_surname: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 32 || 'Maksymalnie 32 znaków',
                value => (value || '').length >= 3 || 'Minimum 3 znaki',
            ],

             r_phone: [
                value => !!value || 'To pole jest wymagane!',
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                value => (value || '').length >= 9 || 'Minimum 9 cyfr',
            ],

            r_company: [],
            r_tax: [],

            r_password2: [
                (value) => !!value || 'Podaj ponownie hasło',
                (value) => value === this.c_password || 'Podane hasła nie zgadzają się ze sobą',
            ],
        }
    },

    methods: {

        allValidated(){
            if(this.$refs.detailsForm.validate()){
                return true;
            }
            return false
        },

        loadData(id){
            console.log("Get initial data: " + id);
           // this.$store.getAccount(id)
        },

       
    },

    watch: {

        is_company (val) {
            console.log("company")
            console.log(val)
            if(val){
                this.r_company = [
                    value => !!value || 'To pole jest wymagane!',
                    value => (value || '').length <= 256 || 'Maksymalnie 256 znaków',
                    value => (value || '').length >= 3 || 'Minimum 3 znaki',
                ];

                this.r_tax = [
                    value => !!value || 'To pole jest wymagane!',
                    value => (value || '').length == 12 || 'NIP powinien zawierać 12 znaków',
                ];
            }
            else{
                this.r_company = [];

                this.r_tax = [];
            }
        },

        validate (val) {
            if(val == true){
                if(this.allValidated()){
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

                    this.$emit('dataUpdate',personal_details);
                    this.$emit('allValidated',true);
                }
                else{
                    this.$emit('allValidated',false);
                }
            }
        },

    },

    mounted() {
        if(this.pid == -1){
            this.is_company = false;
            this.c_name = '';
            this.c_surname = '';
            this.c_phone = '';
            this.c_company = '';
            this.c_tax = '';
            this.r_company = [];
            this.r_tax = [];
        }
        else{
            this.loadData(this.pid);
        }
    },

}
</script>


<style scoped>

    .register-component{
        width: 100%;
        /* height: 60%; */
        background-color: rgb(251, 252, 253);
        
        align-self: center;
        /* border-radius: 10px; */
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        max-width: 550px;
        padding-bottom: 1.5rem;
    }

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
        /* border: solid 1px rgb(209, 33, 33); */
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

    .inline{
        display: inline;
    }

    .double{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

</style>