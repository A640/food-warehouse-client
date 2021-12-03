<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <div class="center-btn">
                <v-btn v-on="on" depressed  @click="dialog=true" class="">
                    {{ $t("complaint.complaintNo") }} {{complaint.complaint_id}}
                </v-btn>
                <p :class="{    'section-title':true, 
                                'accepted': complaint.state == 'ACCEPTED',
                                'rejected': complaint.state == 'REJECTED',             
                   }">{{ $t("common.status") }}: {{state}}</p>
            </div>
            
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">{{ $t("complaint.complaint") }}</h2>
                </div>
                
                <div class="pop-content">
                    <div class="cell">
                        <p class="title">{{ $t("complaint.yourComplaint") }}</p>
                        <p class="section-title">{{ $t("common.submitted") }}: {{complaint.send_date}}</p>
                    </div>
                    
                    <v-textarea
                        solo
                        readonly
                        v-model="complaint.content"
                        class="cell input"
                        :rules="c_rules"
                        :label="$t('complaint.noContent')"
                    />

                    <div v-if="complaint.decision != null" class="cell">
                        <p class="title" >{{ $t("complaint.reply") }}</p>
                        <p class="section-title">{{ $t("complaint.considered") }}: {complaint.decision_date}}</p>
                        <v-textarea
                            solo
                            readonly
                            v-model="complaint.decision"
                            class="cell input"
                            :rules="c_rules"
                            :label="$t('complaint.noContent')"
                        />
                    </div>

                    <div v-if="complaint.state == 'REGISTERED' || complaint.state == 'READ'" class="cell">
                        <!-- <p class="title" >Odpowiedź</p> -->
                        <p class="section-title">{{ $t("complaint.state.WAITING") }}</p>
                    </div>

                    <div v-if="complaint.state == 'ACCEPTED'" class="cell">
                        <p class="title" >{{ $t("complaint.reply") }}</p>
                        <p class="section-title accepted">{{ $t("complaint.state.ACCEPTED") }}</p>
                    </div>

                    <div v-if="complaint.state == 'REJECTED'" class="cell">
                        <p class="title" >{{ $t("complaint.reply") }}</p>
                        <p class="section-title rejected">{{ $t("complaint.state.REJECTED") }}</p>
                    </div>

                    <div v-if="complaint.state == 'CANCELED'" class="cell">
                        <!-- <p class="title" >Odpowiedź</p> -->
                        <p class="section-title">{{ $t("complaint.state.CANCELED") }}</p>
                    </div>
                    




                    <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-btn text v-if="complaint.state == 'REGISTERED' || complaint.state == 'READ'" @click="cancelComplaint()">{{ $t("complaint.withdrawComplaint") }}</v-btn>
                            <v-spacer />
                            <v-btn text class=" mb-5" @click="closeDialog()">{{ $t("common.ok") }}</v-btn>
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

            
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>


export default {

    name: "NewComplaint",

    props: {
       complaint:{
           type: Object,
           required: true,
       }
    },

    components: {
        
    },

    data() {
        return {
            dialog: false,
            c_rules: [
                value => !!value || this.$t('errors.emptyJustification'),
            ],
            loading: false,
        }
    },

    methods: {

        cancelComplaint(){
            this.loading = true;
            this.$store.dispatch('cancelComplaint',this.complaint.complaint_id).then( () => {
                this.$emit('updateOrderDetails');
                this.loading = false;
                this.dialog = false;
            })
            
           
        },

        closeDialog(){
            this.dialog = false;
        }
    },

    computed:{
        state(){
            if(this.complaint.state == 'REGISTERED'){
                return this.$t('complaint.stateShort.REGISTERED');
            }else if(this.complaint.state == 'READ'){
                return this.$t('complaint.stateShort.READ');
            }else if(this.complaint.state == 'ACCEPTED'){
                return this.$t('complaint.decisionsOptions.ACCEPTED')
            }else if(this.complaint.state == 'REJECTED'){
                return this.$t('complaint.stateShort.REJECTED');
            }else if(this.complaint.state == 'DECISION'){
                return this.$t('complaint.stateShort.DECISION');
            }else if(this.complaint.state == 'CANCELED'){
                return this.$t('complaint.stateShort.CANCELED');
            }else{
                return this.$t('complaint.stateShort.UNKNOWN');
            }
        },
        class(){
            if(this.complaint.state == 'ACCEPTED'){
                return 'accepted';
            }else if(this.complaint.state == 'REJECTED'){
                return 'rejected';
            }else{
                return 'neutral';
            }
        }
    }
    
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