<template>
    <popup :id="id" :edit="edit" >
        
        <div class="cell ">
            <p class="section-title">Konto</p>
        </div>

        <edit-account 
            :pid="-1" 
            :validate="validate_trigger" 
            @dataUpdate="updateDataAccount" 
            @allValidated="validateA"
        />

        <div class="cell ">
            <p class="section-title">Pracownik</p>
        </div>

        <edit-employee
            :pid="-1" 
            :validate="validate_trigger" 
            @dataUpdate="updateDataEmployee" 
            @allValidated="validateE"
        />

        

     </popup>
</template>

<script>
import Popup from '@/components/EditPopup.vue'
import EditEmployee from '@/components/EditEmployee.vue'
import EditAccount from '@/components/EditAccount.vue'

export default {
    components:{
        Popup,
        EditAccount,
        EditEmployee,
    },

    props:{
        id:{
            type: Number,
            default: undefined,
        },
        edit:{
            type: Boolean,
            default: false,
        },
    },

    data() {
        return{
            validate_trigger: false,
            account: null,
            employee: null,
            a_validated: false,
            e_validated: false,
        }

    },

    methods: {

        updateDataAccount(data){
            this.account = data;
        },

        updateDataEmployee(data){
            this.employee = data;
        },

        validate(){
            this.a_validated = false;
            this.e_validated = false;
            this.validate_trigger = true;
        },

        validateA(value){
            this.a_validated = value;
            this.validate_trigger = false;
        },

        validateE(value){
            this.e_validated = value;
            this.validate_trigger = false;
        },

        nextStep(validated){
            if(validated){
                this.$emit('next',this.address);
            }
            this.validate_trigger = false;
        },

    },
}
</script>

<style scoped>

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

    

    .align-center{
        text-align: center;
    }


    .section-title {
        color: #acacac;
        font-family: 'Segoe UI';
        font-weight: 400;
        font-size: 1rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }
   

</style>