<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <div class="center-btn">
                <v-btn v-on="on" outlined  @click="dialog=true" class="">
                    Reklamacja nr {{complaint.complaint.complaint_id}}
                </v-btn>
                <p :class="{    'section-title':true, 
                                'accepted': complaint.complaint.state == 'ACCEPTED',
                                'rejected': complaint.complaint.state == 'REJECTED',             
                   }">Status: {{state}}</p>
            </div>
            
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">Reklamacja</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    <div class="cell">
                        <p class="section-title">Do zamówienia nr: <router-link :to="{name: 'Order_Details_2' , params: { id:  complaint.order.order.order_id }}" class="cell__link">{{ complaint.order.order.order_id }}</router-link></p>
                        <p class="section-title">Złożono: {{complaint.complaint.send_date}}</p>
                    </div>
                    
                    <p class="section-title cell mt-10" >Treść zażalenia</p>
                    <v-textarea
                        solo
                        readonly
                        v-model="complaint.complaint.content"
                        class="cell input"
                        :rules="c_rules"
                        label="Brak treści"
                    />


                    <p class="section-title cell" >Decyzja</p>
                    <v-autocomplete
                        solo
                        class="cell input"
                        :items="decision_options"
                        :readonly="complaint.complaint.state != 'REGISTERED' && complaint.complaint.state != 'READ'"
                        v-model="decision"
                    />

                    
                    
                    <div class="cell">
                        <p class="section-title" >Uzasadnienie decyzji</p>
                        <p class="section-title" v-if="complaint.complaint.decision_date != null" >Rozpatrzono: {{complaint.complaint.decision_date}}</p>
                        <v-textarea
                            solo
                            :readonly="complaint.complaint.state != 'REGISTERED' && complaint.complaint.state != 'READ'"
                            v-model="decision_explanation"
                            class="input"
                            :rules="c_rules"
                            label="Brak treści"
                        />
                    </div>

                    <div v-if="complaint.complaint.state == 'REGISTERED' || complaint.complaint.state == 'READ'" class="cell">
                        <!-- <p class="title" >Odpowiedź</p> -->
                        <p class="section-title">Reklamacja oczekuje na rozpatrzenie</p>
                    </div>

                    <div v-if="complaint.complaint.state == 'ACCEPTED'" class="cell">
                        <p class="title" >Odpowiedź</p>
                        <p class="section-title accepted">Reklamacja została rozpatrzona pozytywnie</p>
                    </div>

                    <div v-if="complaint.complaint.state == 'REJECTED'" class="cell">
                        <p class="title" >Odpowiedź</p>
                        <p class="section-title rejected">Reklamacja została odrzucona</p>
                    </div>

                    <div v-if="complaint.complaint.state == 'CANCELED'" class="cell">
                        <!-- <p class="title" >Odpowiedź</p> -->
                        <p class="section-title">Reklamacja została wycofana przez klienta</p>
                    </div>
                    




                    <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-spacer v-if="complaint.complaint.state != 'REGISTERED' && complaint.complaint.state != 'READ'"></v-spacer>
                            <v-btn text class=" mb-5" @click="closeDialog()">Zamknij</v-btn>
                            <v-spacer v-if="complaint.complaint.state == 'REGISTERED' || complaint.complaint.state == 'READ'" />
                            <v-btn dark color="amber darken-2" v-if="complaint.complaint.state == 'REGISTERED' || complaint.complaint.state == 'READ'" @click="addComplaintDecision()">Rozpatrz reklamację</v-btn>
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

    name: "NewComplaint",

    props: {
       complaint:{
           type: Object,
           required: true,
       }
    },

    components: {
        simplebar,
    },

    data() {
        return {
            dialog: false,
            loading: false,
            decision_options: [{text: 'Rozpatrz reklamację pozytywnie', value: 'ACCEPTED'},
                                {text: 'Odrzuć reklamację', value: 'REJECTED'},
                                {text: 'Wydaj niestandardową decyzję', value: 'DECISION'}
            
            ],
            decision_explanation: '',
            decision: '',
        }
    },

    methods: {

        addComplaintDecision(){
            if(this.decision == 'ACCEPTED' || this.decision == 'REJECTED'){
                this.saveDecision();
            }
            else{
                if(this.decision_explanation != ''){
                    this.saveDecision();
                }
            }
        },

        saveDecision(){
            this.loading = true;
            let obj = {
                complaint_id: this.complaint.complaint.complaint_id,
                decision_state: this.decision,
                decision_content: this.decision_explanation,
            }
            this.$store.dispatch('addComplaintResponse',obj).then( () => {
                this.$emit('updateComplaintsDetails');
                this.loading = false;
                this.dialog = false;
            })
        },

        closeDialog(){
            this.dialog = false;
        },

        loadData(){
            if(this.complaint.complaint.decision != null){
                this.decision_explanation = this.complaint.complaint.decision;
            }
            if(this.complaint.complaint.state == 'ACCEPTED' ||
            this.complaint.complaint.state == 'REJECTED' ||
            this.complaint.complaint.state == 'DECISION' ){
                this.decision = this.complaint.complaint.state;
            }
            
        }
    },

    computed:{
        state(){
            if(this.complaint.complaint.state == 'REGISTERED'){
                return 'zarejestrowana'
            }else if(this.complaint.complaint.state == 'READ'){
                return 'odczytana'
            }else if(this.complaint.complaint.state == 'ACCEPTED'){
                return 'rozpatrzona pozytywnie'
            }else if(this.complaint.complaint.state == 'REJECTED'){
                return 'odrzucona'
            }else if(this.complaint.complaint.state == 'DECISION'){
                return 'wydano decyzję'
            }else if(this.complaint.complaint.state == 'CANCELED'){
                return 'wycofana'
            }else{
                return 'nierozpoznano'
            }
        },
        class(){
            if(this.complaint.complaint.state == 'ACCEPTED'){
                return 'accepted';
            }else if(this.complaint.complaint.state == 'REJECTED'){
                return 'rejected';
            }else{
                return 'neutral';
            }
        },

        c_rules(){
            if(this.decision == 'DECISION'){
                return  [ value => !!value || 'Treść uzasadnienia nie może być pusta', ];
            }
            else{
                return [];
            }
        }
    },

    mounted() {
        this.loadData();
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
        justify-content: space-between;
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

</style>