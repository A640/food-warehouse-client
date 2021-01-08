<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">Nazwa firmy</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_firm_name"
                :rules="r_firm_name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Telefon</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_phone"
                :rules="r_phone"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Email</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_email"
                :rules="r_email"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

    

    </v-form>
</template>

<script>
export default {

    name: 'ProducerEditor',

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
            i_firm_name: '',
            i_phone: '',
            i_email: '',


            r_firm_name: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 32 || 'Maksymalnie 32 znaków',
                value => (value || '').length >= 3 || 'Minimum 3 znaki',
            ],

            r_phone: [
                value => !!value || 'To pole jest wymagane!',
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                value => (value || '').length >= 9 || 'Minimum 9 cyfr',
            ],

            r_email: [
                value => !!value || 'To pole jest wymagane!',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail musi być poprawny'
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
           this.$store.dispatch('getProducerData',id)
           .then( (producer) => {
               //load data from vuex store
                this.i_firm_name = producer.firm_name;
                this.i_phone = producer.phone;
                this.i_email = producer.email;
           })
        },

       
    },

    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let producer = {
                        firm_name: this.i_firm_name,
                        phone: this.i_phone,
                        email: this.i_email,
                    }

                    this.$emit('dataUpdate',producer);
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
        this.$store.dispatch('getAllEmployees');
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
    .date-picker{
        margin: 0 auto;
    }

</style>