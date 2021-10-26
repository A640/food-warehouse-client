<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">{{ $t("warehouse.name") }}</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_name"
                :rules="r_name"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">{{ $t("warehouse.capacity") }}</label>
            <v-text-field
                class="input"
                type="number"
                label=""
                solo
                v-model="i_capacity"
                :rules="r_capacity"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <div class="cell">
            <label class="cell__label">{{ $t("warehouse.manager") }}</label>
            <v-autocomplete
                solo
                class="mt-4"
                v-model="i_manager"
                :items="managers"
                :rules="r_manager"
                auto-select-first
            ></v-autocomplete>
        </div>

        <form class="cell">
            <v-switch inset v-model="i_is_cold_storage" :label="$t('warehouse.freezer')"></v-switch>
        </form>

       

    </v-form>
</template>

<script>
export default {

    name: 'WarehouseEditor',

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
            i_name: '',
            i_capacity: 0,
            i_is_cold_storage: false,
            i_manager: '',


            r_name: [
                value => !!value || this.$t('errors.required'),
                value => (value || '').length <= 32 || this.$t('errors.max', {count: '32'} ),
                value => (value || '').length >= 1 || this.$t('errors.min1', {count: '1'} ),
            ],

            r_capacity: [
                value => !!value || this.$t('errors.required'),
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                value => (value || '') >= 0 || this.$t('errors.negativeValue'),
            ],

            r_manager: [
                value => !!value || this.$t('errors.required'),
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
           this.$store.dispatch('getWarehouseData',id)
           .then( (warehouse) => {
               //load data from vuex store
                this.i_name = warehouse.storage.name;
                this.i_capacity = warehouse.storage.capacity;
                this.i_is_cold_storage = warehouse.storage.is_cold_storage;
                this.i_manager = warehouse.manager.personal_data.employee_id;
           })
        },

       
    },

    computed:{
        managers(){
            //load possible managers

            let managers = this.$store.getters.getEmployees.map( (employee) => {
                return {text: employee.personal_data.name + ' ' + employee.personal_data.surname, value: employee.personal_data.employee_id}
            })
            return managers;
            
        }
    },

    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let warehouse = {
                        name: this.i_name,
                        capacity: this.i_capacity,
                        is_cold_storage: this.i_is_cold_storage,
                        manager_id: this.i_manager,
                    }

                    this.$emit('dataUpdate',warehouse);
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
            this.i_name = '';
            this.i_capacity = 0;
            this.i_is_cold_storage = false;
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