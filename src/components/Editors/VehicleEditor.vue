<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">{{ $t("vehicle.brand") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_brand"
                :rules="r_brand"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("vehicle.model") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_model"
                :rules="r_model"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("vehicle.productionYear") }}</label>
            <v-text-field
                type="number"
                class="input"
                label=""
                solo
                v-model="i_prod_year"
                :rules="r_prod_year"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("vehicle.plateNumber") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_reg_no"
                :rules="r_reg_no"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        

        <form class="cell" >
            <label class="cell__label">{{ $t("vehicle.insuranceValidUntil") }}: </label>
            <v-row justify="space-around">
                <v-date-picker
                    v-model="i_insurance"
                    color="green lighten-1"
                    class="mt-5"
                    locale="pl-pl"
                    :first-day-of-week="1"
                ></v-date-picker>
            </v-row>
        </form>

        <form class="cell" >
            <label class="cell__label">{{ $t("vehicle.mot") }}: </label>
            <v-row justify="space-around">
                <v-date-picker
                    v-model="i_inspection"
                    color="blue"
                    class="mt-5"
                    locale="pl-pl"
                    :first-day-of-week="1"
                ></v-date-picker>
            </v-row>
        </form>

        <div class="cell">
            <label class="cell__label">{{ $t("vehicle.mot") }}</label>
            <v-autocomplete
                solo
                class="mt-4"
                v-model="i_driver"
                :items="drivers"
                :rules="r_driver"
                auto-select-first
            ></v-autocomplete>
        </div>

    </v-form>
</template>

<script>
export default {

    name: 'VehicleEditor',

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
            i_brand: '',
            i_model: '',
            i_prod_year: 1990,
            i_reg_no: '',
            i_insurance: new Date().toISOString().substr(0, 10),
            i_inspection: new Date().toISOString().substr(0, 10),

            i_driver: '',

            r_brand: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
            ],

            r_model: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 1 || this.$t('errors.min1', {count: '1'} ),
            ],

            r_prod_year: [
                value => !!value || this.$t('errors.required'),
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                // value => (value || '').length == 4 || 'Rok musi być 4-cyfrowy',
                value => value > 1800 || this.$t('errors.invalidValue'),
            ],

            r_reg_no: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 16 || this.$t('errors.max', {count: '16'}),
                value => (value || '').length >= 3 || this.$t('errors.min', {count: '3'} ),
            ],

            r_driver: [
                value => !!value || this.$t('errors.required'),
            ]
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
           this.$store.dispatch('getVehicleData',id)
           .then( (vehicle) => {
               //load data from vuex store
                this.i_brand = vehicle.brand;
                this.i_model = vehicle.model;
                this.i_prod_year = vehicle.prod_year;
                this.i_reg_no = vehicle.reg_no;
                this.i_insurance = vehicle.insurance.substr(0, 10);
                this.i_inspection = vehicle.inspection.substr(0, 10);
                this.i_driver = vehicle.driver_id;
           })
        },

       
    },

    computed:{
        drivers(){
            //load possible drivers

            let drivers = this.$store.getters.getEmployees.map( (employee) => {
                return {text: employee.personal_data.name + ' ' + employee.personal_data.surname, value: employee.personal_data.employee_id}
            })
            return drivers;
            
        }
    },

    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let vehicle = {
                        brand: this.i_brand,
                        model: this.i_model,
                        prod_year: this.i_prod_year,
                        reg_no: this.i_reg_no,
                        insurance: this.i_insurance,
                        inspection: this.i_inspection,
                        driver: this.i_driver,
                    }

                    this.$emit('dataUpdate',vehicle);
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
            this.i_brand = '';
            this.i_model = '';
            this.i_prod_year = 1990;
            this.i_reg_no = '';
            this.i_insurance = new Date().toISOString().substr(0, 10);
            this.i_inspection = new Date().toISOString().substr(0, 10);
            this.i_driver = '';
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