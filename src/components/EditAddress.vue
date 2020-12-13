<template>
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
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
            ],

            r_apartment_num: [
                value => (value || '').length <= 16 || 'Maksymalnie 16 znaków',
                // v => !v || /^\d*$/.test(v) || 'Nieprawidłowy format numeru',
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

   

    methods: {
        
        allValidated(){
            if(this.$refs.addressForm.validate()){
                return true;
            }
            return false
        },

    },


    watch: {

        validate (val) {
            if(val == true){
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

                    this.$emit('dataUpdate',address);
                    this.$emit('allValidated',true);
                }
                else{
                    this.$emit('allValidated',false);
                }
            }
        },

    },

    mounted() {
        let module = require("@/assets/countries.js");
        this.country = module.array;

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