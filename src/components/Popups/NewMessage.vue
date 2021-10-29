<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
           <v-btn depressed class="mr-5" v-on="on" @click="dialog = true"><v-icon>mdi-email-plus</v-icon></v-btn>
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">Nowa wiadomość</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    
                    <v-form v-model="validated" class="cell" ref="detailsForm" @submit.prevent="nextStep">
                        <label class="cell__label">Treść</label>
                        <v-textarea
                            solo
                            v-model="content"
                            class="input mt-10"
                            label="Wpisz treść wiadomości"
                            :rules="c_rules"
                        />

                        <label class="cell__label">Adresat</label>
                        <v-autocomplete
                            solo
                            class="mt-4"
                            v-model="i_employee"
                            :items="employees"
                            :rules="r_employee"
                            auto-select-first
                        ></v-autocomplete>
                    </v-form>
                    

                    
                     <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-btn text class=" mb-5" @click="closeDialog()">{{ $t("common.cancel") }}</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn depressed class=" mb-5" @click="sendMessage()">Wyślij</v-btn>
                        </div>
                    </div>

                    <!-- Loader -->
                    <v-overlay
                        :absolute="true"
                        :value="loading"
                    >
                        <v-progress-circular
                            indeterminate
                            color="amber"
                        ></v-progress-circular>
                    </v-overlay>

            
                </simplebar>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import simplebar from 'simplebar-vue';

export default {

    name: "Message",

    props: {
       
    },

    components: {
        simplebar,
    },

    data() {
        return {
            dialog: false,
            content: '',
            i_employee: '',


            c_rules: [
                value => !!value || 'Treść wiadomości nie może być pusta',
            ],
            r_employee: [
                value => !!value || 'Musisz wybrać adresata',
            ],

            loading: false,
            validated: false,
        }
    },

    methods: {

        sendMessage(){
            if(this.$refs.detailsForm.validate() && this.validated){
                this.loading = true;
                let message = {
                    receiver: this.i_employee,
                    content: this.content,
                };
                this.$store.dispatch('sendMessage',message).then(() => {
                    this.loading = false;
                    this.closeDialog();
                })
            }
        },

        closeDialog(){
            this.content = '';
            this.i_employee = '';
            this.dialog = false;
        }
    },

    computed:{
        employees(){
            //load possible employees

            let employees = this.$store.getters.getEmployees.map( (employee) => {
                return {text: employee.personal_data.name + ' ' + employee.personal_data.surname, value: employee.personal_data.employee_id}
            })
            return employees;
            
        }
    },

    mounted() {
        this.$store.dispatch('getAllEmployees');
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
    .pop-card{
        padding-top: 2rem;
        background-color: white;
    }

    .pop-wrapper{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .pop-title{
        /* margin-top: 1rem; */
        margin-bottom: 1rem;
        order: 1;
    }

     .pop-title__text{
        /* margin-top: 1rem; */
        margin-bottom: 1rem;
        order: 1;
        flex-grow: 0;
    }

    .pop-content{
        order: 2;
        flex-grow: 1;
    }

    .cell__popup-buttons{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        margin-top: 2rem;
    }

    .center-btn{
        margin: 0 auto;
        margin-top: 1rem;

    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .input >>> textarea{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        color: #000000;
    }

    .section-title{
        font-family: 'Segoe UI';
        font-weight: 500;
        color: rgba(50,50,50,0.7);
    }

    .accepted{
        color: rgb(130, 180, 170);
    }

    .rejected{
        color: rgb(180, 130, 130);
    }


    .content{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
        color: rgba(40, 40, 40, 0.8);
        
        /* color: blueviolet; */
    }

    .container{
        margin: 0 auto;
    }

    .message-short-content{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #62748f;
        
        /* word-break: break-all; */
        margin-bottom: 1.5rem;
    }

    .message-sender{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.5;
        color: #62748F;
    }

    .message-date{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        line-height: 1.5;
        color: #62748F;
    }

    .message{
        border-bottom: solid 1px #e8eef1;
    }

</style>