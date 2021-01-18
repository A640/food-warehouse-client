<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">

        <form class="cell">
            <label class="cell__label">NR Partii</label>
           <v-combobox
                class="mt-2"
                clearable
                solo 
                type="number"
                hide-details=true
                v-model="i_batch_number"
                :items="products"
                :rules="r_batch_number"
            ></v-combobox>
        </form>

        <div class="cell">
            <label class="cell__label">Produkt</label>
            <v-autocomplete
                solo
                class="mt-4"
                v-model="i_product"
                :items="products"
                :rules="r_product"
                auto-select-first
            ></v-autocomplete>
        </div>

        <form class="cell">
            <label class="cell__label">Ilość jednostek produktu na 1 europaletę</label>
            <v-text-field
                class="input"
                label=""
                solo
                v-model="i_prod_quantity"
                :rules="r_prod_quantity"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Zniżka</label>
            <v-text-field
                type="number"
                class="input"
                label=""
                solo
                v-model="i_discount"
                :rules="r_discount"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        

        <form class="cell" >
            <label class="cell__label">Termin przydatności do spożycia</label>
            <v-row justify="space-around">
                <v-date-picker
                    v-model="i_eat_by_date"
                    color="green lighten-1"
                    class="mt-5"
                    locale="pl-pl"
                    :first-day-of-week="1"
                    :rules="r_product"
                ></v-date-picker>
            </v-row>
        </form>


        <div class="cell">
            <label class="cell__label">Magazyn</label>
            <v-autocomplete
                solo
                class="mt-4"
                v-model="i_warehouse"
                :items="warehouses"
                :rules="r_product"
                auto-select-first
            ></v-autocomplete>
        </div>


        <form class="cell">
            <label class="cell__label">Ile europalet dodać do magazynu:</label>
            <v-text-field
                type="number"
                class="input"
                label=""
                solo
                v-model="i_warehouse_quantity"
                :rules="r_prod_quantity"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

    </v-form>
</template>

<script>
export default {

    name: 'BatchEditor',

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
            i_batch_number: '',
            i_product: '',
            i_prod_quantity: 0,
            i_discount: 0,
            i_eat_by_date: new Date().toISOString().substr(0, 10),
            i_warehouse: '',
            i_warehouse_quantity: 0,


            r_batch_number: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '').length <= 10 || 'Maksymalnie 10 znaków',
                value => (value || '').length >= 1 || 'Minimum 1 znak',
            ],

            r_product: [
                value => !!value || 'To pole jest wymagane!',
                // value => (value || '').length <= 32 || 'Maksymalnie 32 znaków',
                // value => (value || '').length >= 1 || 'Minimum 1 znak',
            ],

            r_prod_quantity: [
                value => !!value || 'To pole jest wymagane!',
                // v => !v || /^(?([0-9]{3}))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) || 'Nieprawidłowy numer telefonu',
                // value => (value || '').length == 4 || 'Rok musi być 4-cyfrowy',
                value => value > 0 || 'Wartość musi być większa od 0',
            ],

            r_discount: [
                // value => value != '' || 'To pole jest wymagane!',
                value => value >= 0 || 'Wartość musi być większa od 0',
                value => value < 100 || 'Wartość musi być mniejsza niż 100',
            ],

            r_driver: [
                value => !!value || 'To pole jest wymagane!',
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
           this.$store.dispatch('getVehicleData',id)
           .then( (result) => {


               if(result != null){
                    //load data from vuex store
                    // this.i_batch_number = result.
                    // this.i_product: '',
                    // this.i_prod_quantity: 0,
                    // this.i_discount: 0,
                    // this.i_eat_by_date: new Date().toISOString().substr(0, 10),
                    // this.i_warehouse: '',
                    // this.i_warehouse_quantity: 0,
                    console.log('znaleziono batch', result)
               }
              
           })

        },

       
    },

    computed:{
        products(){
            //load possible products

            let products = this.$store.getters.getProducts.map( (p) => {
                return {text: p.product.name + ' - ' + p.maker.maker_data.firm_name , value: p.product.product_id}
            })
            return products;
            
        },

        batches(){
            //load possible batches

            let batches = this.$store.getters.getEmployees.map( (employee) => {
                return {text: employee.personal_data.name + ' ' + employee.personal_data.surname, value: employee.personal_data.employee_id}
            })
            return batches;
            
        },

        warehouses(){
            //load possible warehouses

            let warehouses = this.$store.getters.getWarehouses.map( (w) => {
                return {text: w.storage.name , value: w.storage.storage_id }
            })
            return warehouses;
            
        },
    },

    watch: {

        validate (val) {
            if(val == true){
                if(this.allValidated()){
                    let batch_in_warehouse = {
                        batch_number: this.i_batch_number,
                        product_id: this.i_product,
                        prod_quantity: this.i_prod_quantity,
                        discount: this.i_discount,
                        eat_by_date: this.i_eat_by_date,
                        warehouse: this.i_warehouse,
                        warehouse_quantity: this.i_warehouse_quantity,
                    }
                    console.log('batchUpdateData',batch_in_warehouse);

                    this.$emit('dataUpdate',batch_in_warehouse);
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
        this.$store.dispatch('getAllProducts');
        this.$store.dispatch('getAllWarehouses');
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