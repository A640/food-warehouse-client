<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-list-item  class="message" link v-on="on" @click="openMessage()">
                    <v-list-item-content class="ml-5 mr-5" >
                        <v-list-item-title class="message-title mb-3 mt-4">
                            <span class="message-sender">{{title}}</span>
                            <v-chip v-if="message.state == 'SENT' && !sent" color="green lighten-1" dark label small class="ml-2">{{ $t("common.newCaps") }}</v-chip>
                            <v-icon v-if="message.state == 'READ' && sent" small class="ml-2" color="rgb(130, 180, 170)">mdi-check-circle</v-icon>
                            <v-spacer></v-spacer>
                            <span class="message-date">{{message.send_date}}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle class="message-short-content">
                            <span>{{message.content}}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>

            </v-list-item>
            
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    <div class="cell">
                        <span class="message-sender">{{title}}</span>
                        <p class="message-date">{{ $t("messages.sent") }}: {{message.send_date}}</p>
                    </div>
                    
                    <v-textarea
                        solo
                        readonly
                        auto-grow
                        v-model="message.content"
                        class="cell input mt-10"
                        :label="$t('errors.noContent')"
                    />

                    <p class="cell message-date" v-if="message.state == 'READ'">{{ $t("messages.readDate") }}: {{message.read_date}}</p>

                    
                     <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-btn text class=" mb-5" @click="closeDialog()">{{ $t("common.ok") }}</v-btn>
                        </div>
                    </div>

                    <!-- Loader -->
                    <!-- <v-overlay
                        :absolute="true"
                        :value="loading"
                    >
                        <v-progress-circular
                            indeterminate
                            color="amber"
                        ></v-progress-circular>
                    </v-overlay> -->

            
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
       message:{
           type: Object,
           required: true,
       },
       sent:{
           type: Boolean,
           default: false,
       }
    },

    components: {
        simplebar,
    },

    data() {
        return {
            dialog: false,
            c_rules: [
                value => !!value || 'Treść zażalenia nie może być pusta',
            ],
            loading: false,
        }
    },

    methods: {

        openMessage(){
            if(this.message.state == 'SENT'){
                this.$store.dispatch("readMessage",this.message.message_id);
            }
            this.dialog = true;
        },

        closeDialog(){
            this.$emit('reloadMessages');
            this.dialog = false;
        }
    },

    computed:{
        title(){
            if(this.sent){
                return this.$t('common.to') + ': ' + this.message.receiver.name + ' ' + this.message.receiver.surname; 
            }
            else{
                return this.message.sender.name + ' ' + this.message.sender.surname;
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
        /* border-top: solid 1px #e8eef1; */
    }

</style>