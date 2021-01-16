<template>
    <div>
        <v-card max-width="800px" class="pt-5">

            <v-text-field
                class="mr-5 ml-5 "
                label="wyszukaj w wiadomościach"
                prepend-icon="mdi-magnify"


            />

            <v-list >
                <v-list-item v-for="message in messages" :key="message.message_id" class="message">
                    <v-list-item-content class="ml-5 mr-5" >
                        <v-list-item-title class="message-title mb-3 mt-4">
                            <span class="message-sender">{{message.sender.name + ' ' + message.sender.surname}}</span>
                            <v-chip color="green lighten-1" dark label small class="ml-2">NEW</v-chip>
                            <v-spacer></v-spacer>
                            <span class="message-date">{{message.send_date}}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle class="message-short-content">
                            <span>{{message.content}}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>


<script>
export default {
    
    name: 'SystemAlerts',


    computed:{
        messages(){
            return this.$store.getters.getMessages;
        }
    },


    mounted() {
        this.$store.dispatch('getMessages');
        this.$store.dispatch('getUnreadMessagesCount');
    },

}
</script>

<style scoped>
    .content{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
        color: rgba(40, 40, 40, 0.8);
        
        /* color: blueviolet; */
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

    .cell{
        width: 80%;
        margin: 0 auto;
    }

    .dan{
        border: solid 1px red !important;
    }

    .war{
         border: solid 1px rgb(255, 217, 0) !important;
    }
</style>