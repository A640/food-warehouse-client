<template>
    <div class="register-component">

        <div class="cell double">
            <v-btn
                icon
                @click="back()" 
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title ml-3">{{ $t("register.enterYourAddress") }}</h2>
        </div>
        
        
        <edit-address 
            :pid="-1" 
            :validate="validate_trigger" 
            @dataUpdate="updateData" 
            @allValidated="nextStep"
        />
    

        <div class="cell relative">
            <v-btn class="submit__btn" @click="validate()">{{ $t("register.createAccount") }}</v-btn>
        </div>

        
    </div>
</template>

<script>
import EditAddress from '@/components/Editors/AddressEditor.vue'


export default {

    components: {
        EditAddress,
    },
    
   data() {
        return{
            validate_trigger: false,
            address: null,
        }

    },

    methods: {

        updateData(data){
            this.address = data;
        },

        validate(){

            this.validate_trigger = true;
            
        },

        nextStep(validated){
            if(validated){
                this.$emit('next',this.address);
            }
            this.validate_trigger = false;
        },

        back(){
            this.$emit('back')
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