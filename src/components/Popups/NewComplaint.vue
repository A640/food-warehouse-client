<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn v-on="on" depressed  @click="dialog=true" class="center-btn">
                {{ $t("complaint.submitNewComplaint") }}
            </v-btn>
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">{{ $t("complaint.newComplaint") }}</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    
                    <v-textarea
                        solo
                        v-model="content"
                        class="cell input"
                        :rules="c_rules"
                        label="Wpisz treść zażalenia"
                    />

                    <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-btn text class="mr-2 mb-5" @click="closeDialog()">{{ $t("common.cancel") }}</v-btn>
                            <v-btn 
                            color="#1877F2" 
                            class="mb-5" 
                            dark 
                            @click="submitComplaint()"
                            >{{ $t("complaint.submitComplaint") }}</v-btn>
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
       id:{
           type:Number,
       }
    },

    components: {
        simplebar,
    },

    data() {
        return {
            dialog: false,
            content: '',
            c_rules: [
                value => !!value || this.$t('errors.contentComplaintEmpty'),
            ],
            loading: false,
        }
    },

    methods: {

        submitComplaint(){
            if(this.content != '' && this.id !== null && this.id !== undefined){
                this.loading = true;
                let obj = {
                    order_id: this.id,
                    content: this.content,
                }
                this.$store.dispatch('submitComplaint',obj).then( () => {
                    this.content = '';
                    this.$emit('updateOrderDetails');
                    this.loading = false;
                    this.dialog = false;
                })
            }
           
        },

        closeDialog(){
            this.content = '';
            this.dialog = false;
        }
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
        float: right;
        margin-bottom: 1rem;
    }

    .center-btn{
        margin: 0 auto !important;
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

</style>