<template>
    <div>
        <v-card max-width="800px" class="pt-5 container">
            
            <div class="d-flex align-baseline">
                <v-text-field
                    class="mr-5 ml-5 "
                    label="wyszukaj w wiadomościach"
                    prepend-icon="mdi-magnify"
                    clearable
                    v-model="search"
                />

                <NewMessage />
                
            </div>
            

            <v-list >
                <v-subheader>
                    {{ $t("messages.unread") }} <span class="ml-4"> {{unread.length > 0 ? unread.length : ''}} </span>
                    <v-divider class="ml-2"></v-divider>
                </v-subheader>
                <Message v-for="message in unread" :key="message.message_id" :message="message" @reloadMessages="loadData()"/>
            </v-list>
            <v-list class="mt-5">
                <v-subheader>
                    {{ $t("messages.read") }} <span class="ml-4"> {{read.length > 0 ? read.length : ''}} </span>
                    <v-divider class="ml-2"></v-divider>
                </v-subheader>
                <Message v-for="message in read" :key="message.message_id" :message="message" @reloadMessages="loadData()"/>
            </v-list>
            <v-list class="mt-5">
                
                <v-subheader>
                    {{ $t("messages.sent") }} <span class="ml-4"> {{sent.length > 0 ? sent.length : ''}} </span>
                    <v-divider class="ml-2"></v-divider>
                </v-subheader>
                <Message v-for="message in sent" :key="message.message_id" :message="message" sent @reloadMessages="loadData()"/>
            </v-list>
        </v-card>
    </div>
</template>


<script>
import Message from '@/components/Popups/Message.vue'
import NewMessage from '@/components/Popups/NewMessage.vue'

export default {
    
    name: 'Messages',

    components:{
        Message,
        NewMessage,
    },

    data() {
        return {
            search: '',
        }
    },


    computed:{
        

        filtered_messages() {
            if(!this.search) return this.$store.getters.getMessages;
            return this.$store.getters.getMessages.filter(item => {
                    return (item.sender.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    item.sender.surname.toLowerCase().includes(this.search.toLowerCase())   ||
                    item.receiver.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    item.receiver.surname.toLowerCase().includes(this.search.toLowerCase())   ||
                    item.content.toLowerCase().includes(this.search.toLowerCase()) ||
                    item.send_date.toLowerCase().includes(this.search.toLowerCase()));
            });
        },

        username(){
            return this.$store.getters.getName;
        },

        read(){
            return this.filtered_messages.filter(item => {
                    return (item.state == 'READ' && 
                    item.receiver.name == this.username.name &&
                    item.receiver.surname == this.username.surname)
            });
        },

        unread(){
            return this.filtered_messages.filter(item => {
                    return (item.state == 'SENT' && 
                    item.receiver.name == this.username.name &&
                    item.receiver.surname == this.username.surname)
            });
        },

        sent(){
            return this.filtered_messages.filter(item => {
                    return ( item.sender.name == this.username.name &&
                    item.sender.surname == this.username.surname)
            });
        }

    },

    methods: {
        loadData(){
            this.$store.dispatch('getMessages');
            this.$store.dispatch('getUnreadMessagesCount');
        },
    },
    


    mounted() {
        this.loadData();
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