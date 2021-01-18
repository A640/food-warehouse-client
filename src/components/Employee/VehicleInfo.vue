<template>
    <v-form ref="detailsForm" @submit.prevent="nextStep">


        <p class="cell title">Przydzielony pojazd</p>

        <form class="cell">
            <label class="cell__label">Marka</label>
            <v-text-field
                readonly
                class="input"
                label=""
                solo
                v-model="i_brand"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Model</label>
            <v-text-field
                readonly
                class="input"
                label=""
                solo
                v-model="i_model"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">Rok produkcji</label>
            <v-text-field
                readonly
                type="number"
                class="input"
                label=""
                solo
                v-model="i_prod_year"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        <form class="cell">
            <label class="cell__label">NR Rejestracyjny</label>
            <v-text-field
                readonly
                class="input"
                label=""
                solo
                v-model="i_reg_no"
                v-on:keyup.enter.stop
            ></v-text-field>
        </form>

        

        <form class="cell" >
            <label class="cell__label">Ubezpieczenie ważne do: </label>
            <v-row justify="space-around">
                <v-date-picker
                    readonly
                    v-model="i_insurance"
                    color="green lighten-1"
                    class="mt-5"
                    locale="pl-pl"
                    :first-day-of-week="1"
                ></v-date-picker>
            </v-row>
        </form>

        <form class="cell" >
            <label class="cell__label">Przegląd ważny do: </label>
            <v-row justify="space-around">
                <v-date-picker
                    readonly
                    v-model="i_inspection"
                    color="blue"
                    class="mt-5"
                    locale="pl-pl"
                    :first-day-of-week="1"
                ></v-date-picker>
            </v-row>
        </form>


    </v-form>
</template>

<script>
export default {

    name: 'VehicleInfo',

    props: {
        
    },
    
    data() {
        return{
            i_brand: '',
            i_model: '',
            i_prod_year: 1990,
            i_reg_no: '',
            i_insurance: new Date().toISOString().substr(0, 10),
            i_inspection: new Date().toISOString().substr(0, 10),

        }
    },

    methods: {

       

        loadData(id){ 
           this.$store.dispatch('getSupplierVehicle',id)
           .then( (vehicle) => {
               //load data from vuex store
                this.i_brand = vehicle.car_info.brand;
                this.i_model = vehicle.car_info.model;
                this.i_prod_year = vehicle.car_info.prod_year;
                this.i_reg_no = vehicle.car_info.reg_no;
                this.i_insurance = vehicle.car_info.insurance.substr(0, 10);
                this.i_inspection = vehicle.car_info.inspection.substr(0, 10);
           })
        },

       
    },

   


    mounted() {
        this.loadData(this.pid);
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