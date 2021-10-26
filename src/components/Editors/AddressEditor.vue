<template>
    <div>
        <v-form ref="addressForm" @submit.prevent="nextStep">
            <form class="cell">
                <label class="cell__label">{{ $t("address.street") }}</label>
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
                    <label class="cell__label">{{ $t("address.buildingNumber") }}</label>
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
                    <label class="cell__label">{{ $t("address.apartmentNumber") }}</label>
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
                <label class="cell__label">{{ $t("address.city") }}</label>
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
                <label class="cell__label">{{ $t("address.postCode") }}</label>
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
                <label class="cell__label">{{ $t("address.country") }}</label>
                <v-autocomplete
                    solo
                    :rules="r_country"
                    v-model="c_country"
                    :items="country"
                ></v-autocomplete>
            </div>
        </v-form>
    </div>
</template>

<script>
export default {

    name: 'AddressEditor',

    props: {
        pid: {
            default: -1,
        },
        validate: {
            type: Boolean,
            default: false,
        },
        address_obj:{
            type: Object,
            default: null,
        }
    },

    data() {
        return{
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

        }

    },

   

    methods: {
        
        allValidated(){
            if(this.$refs.addressForm.validate()){
                return true;
            }
            return false
        },

        loadData(id){

            //check if address is provided via prop
            if(this.address_obj != null){
                this.c_street = this.address_obj.street
                this.c_building_num = this.address_obj.building_number
                this.c_apartment_num = this.address_obj.apartment_number
                this.c_town = this.address_obj.town
                let postal = this.address_obj.postal_code.split('-'); 
                this.c_pc1 = postal[0];
                this.c_pc2 = postal[1];
                this.c_country = this.address_obj.country;
                this.address_id = this.address_obj.address_id;
                
            }
            else{
                //if not provided get by ID
                this.$store.dispatch('getAddressData',id)
                .then((address) => {
                    this.c_street = address.street
                    this.c_building_num = address.building_number
                    this.c_apartment_num = address.apartment_number
                    this.c_town = address.town
                    let postal = address.postal_code.split('-');
                    this.c_pc1 = postal[0];
                    this.c_pc2 = postal[1];
                    this.c_country = address.country;
                    this.address_id = address.address_id;
                })
            }

            
        }

    },


    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let pc = String(this.c_pc1) + "-" + String(this.c_pc2);
                    console.log(pc)

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

                    this.$emit('dataUpdate',address);
                    this.$emit('allValidated',true);
                }
                else{
                    this.$emit('allValidated',false);
                }
            }
        },

        address_obj(val){
            if(val != null){
                this.loadData;
            }
        }

    },


    mounted() {
        let module = require("@/assets/countries.js");
        this.country = module.array;

        if(this.pid == -1 && this.address_obj == null){
            this.c_street = '';
            this.c_building_num = '';
            this.c_apartment_num = '';
            this.c_town = '';
            this.c_pc1 = '';
            this.c_pc2 = '';
            this.c_country = 'PL';
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