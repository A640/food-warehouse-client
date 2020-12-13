<template>
    <div class="register-component">

        <div class="cell double">
            <v-btn
                icon
                @click="back()" 
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title ml-3">Podaj swój adres</h2>
        </div>
        
        <v-form ref="addressForm" @submit.prevent="nextStep">
        <form class="cell">
            <label class="cell__label">Ulica</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_street"
                :rules="r_street"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>


        <form class="cell double">
            <div class="mr-5">
                <label class="cell__label">Numer budynku</label>
                <v-text-field
                    class="input"
                    label=""
                    solo
                    v-model="c_building_num"
                    :rules="r_building_num"
                    v-on:keyup.enter.stop
                ></v-text-field>
            </div>
            <div class="ml-5">
                <label class="cell__label">Numer mieszkania</label>
                <v-text-field
                    class="input"
                    label=""
                    solo
                    v-model="c_apartment_num"
                    :rules="r_apartment_num"
                    v-on:keyup.enter.stop
                ></v-text-field>
            </div>    


        </form>

        <form class="cell">
            
        </form>

        <form class="cell">
            <label class="cell__label">Miejscowość</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="c_town"
                :rules="r_town"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell" >
            <label class="cell__label">Kod pocztowy</label>
            <div class="double">
                <v-text-field
                class="pc-input input inline mr-5"
                label=""
                type="number"
                solo       
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
                v-model="c_pc2"
                :rules="r_pc2"
                v-on:keyup.enter.stop
            ></v-text-field>
            </div>
            
            
        </form>


        <div class="cell">
            <label class="cell__label">Kraj</label>
            <v-autocomplete
                solo
                :rules="r_country"
                v-model="c_country"
                :items="country"
            ></v-autocomplete>
        </div>
        
    

        <div class="cell relative">
            <v-btn class="submit__btn" @click="nextStep()">Utwórz konto</v-btn>
        </div>
        </v-form>

        
    </div>
</template>

<script>

export default {
    
    data() {
        return{
            is_company: false,
            c_street: '',
            c_building_num: '',
            c_apartment_num: '',
            c_town: '',
            c_pc1: '',
            c_pc2: '',
            c_country: 'PL',

            r_street: [
                value => (value || '').length <= 64 || 'Maksymalnie 64 znaki',
            ],

            r_building_num: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 16 || 'Maksymalnie 16 znaków',
                v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_apartment_num: [
                value => (value || '').length <= 16 || 'Maksymalnie 16 znaków',
                v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_town: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 128 || 'Maksymalnie 128 znaki',
            ],

            r_pc1: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length == 2 || 'Kod musi zawierać 2 cyfry',
                v => !v || /[0-9]{2}/.test(v) || 'Nieprawidłowy format kodu',
            ],

            r_pc2: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length == 3 || 'Kod musi zawierać 3 cyfry',
                v => !v || /[0-9]{3}/.test(v) || 'Nieprawidłowy format kodu',
            ],

            r_country: [
                 value => !!value || 'To pole jest wymagane!',
            ],

            country: [],

        }

    },

    mounted() {
        let module = require("@/assets/countries.js");
        this.country = module.array;
    },

    methods: {
        
        allValidated(){
            if(this.$refs.addressForm.validate()){
                return true;
            }
            return false
        },

        nextStep(){

            if(this.allValidated()){
                let pc = String(this.c_pc1) + " - " + String(this.c_pc2);
                console.log(pc)

                let address = {
                    street: this.c_street,
                    building_number: String(this.c_building_num),
                    apartment_number: String(this.c_apartment_num),
                    town: this.c_town,
                    postal_code: pc,
                    country: this.c_country,
                }

                if(address.street == ''){
                    address.street = null;
                }

                if(address.apartment_number == ''){
                    address.apartment_number = null;
                }

                this.$emit('next',address)
            }

            
            
        },

        back(){
            this.$emit('back')
        }
    },
}
</script>

<style soped>

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
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .pc-input{
        width: 3rem;
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
        height: 3rem;
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