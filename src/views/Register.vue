<template>
    <div class="bg">
        <div class="register">
            <h2 class="register__title">Zarejestruj się</h2>
            <v-stepper alt-labels v-model="registration_step" class="register__stepper" >
            <v-stepper-header class="register__stepper-header">
                <v-stepper-step
                :complete="registration_step > 1"
                step="1"
                >
                Konto
                </v-stepper-step>
        
                <v-divider></v-divider>
        
                <v-stepper-step
                :complete="registration_step > 2"
                step="2"
                >
                Dane
                </v-stepper-step>
        
                <v-divider></v-divider>
        
                <v-stepper-step step="3">
                Adres
                </v-stepper-step>
            </v-stepper-header>
        
            <v-stepper-items>
                <v-stepper-content class="pa-0" step="1">
                    <Register1 @next="r1Complete" />
                </v-stepper-content>
        
                <v-stepper-content class="pa-0" step="2">
                    <Register2 @next="r2Complete" @back="r2Back"/>
                </v-stepper-content>
        
                <v-stepper-content class="pa-0" step="3">
                    <Register3 @next="r3Complete" @back="r3Back"/>
                </v-stepper-content>
            </v-stepper-items>
            </v-stepper>
        </div>
       
      
    </div>
</template>

<script>
import Register1 from '@/components/Register/RegisterAccountStep.vue'
import Register2 from '@/components/Register/RegisterDetailsStep.vue'
import Register3 from '@/components/Register/RegisterAddressStep.vue'

export default {
    components: {
        Register1,
        Register2,
        Register3,
    },

    data() {
        return {
            registration_step: 1,
            account: null,
            personal_details: null,
            address: null,
        }
    },

    methods: {
        r1Complete(data){
            console.log(data);
            this.registration_step = 2;
            this.account = data;
        },

        r2Complete(data){
            console.log(data);
            this.registration_step = 3;
            this.personal_details = data;
        },

        r3Complete(data){
            console.log(data);
            this.address = data;

            if(this.account != null && this.personal_details != null && this.address != null){
                let r_data = {
                    account: this.account,
                    personal_data: this.personal_details,
                    address: this.address,
                }
                this.$store.dispatch('register', r_data)
                .then((result) =>{
                    console.log(result);
                    if(result == true){
                        console.log("zarejestrowaned");
                        this.$router.push({ name: 'RegisterSuccess'});
                    }
                },(error) =>{
                    if(error == "cannot create"){
                        alert("Nie udało się utworzyć konta")
                    }
                    else{
                        console.log("problem z połączeniem");
                    }
                })
            }
            
        },

        r2Back(){
            this.registration_step = 1;
        },

        r3Back(){
            this.registration_step = 2;
        },
    },
}
</script>


<style scoped>

    

    .bg{
        width: 100%;
        /* height: 100%; */
        min-height: 100%;
        height: auto;
        background-color: rgb(240, 242, 245);
        display: flex;
        justify-content: center;
    }

    .register{
        width: 50%;
        /* height: 60%; */
        background-color: rgb(251, 252, 253);
        
        align-self: center;
        border-radius: 10px;
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        max-width: 550px;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .register__title{
        margin: 0 auto;
        margin-top: 2rem;
        margin-bottom: 1rem;
        background-color: rgb(251, 252, 253);
    }

    .register__stepper{
        border: none;
        box-shadow: none;
    }

    .register__stepper-header{
       background-color: rgb(251, 252, 253);
    }

    
</style>
