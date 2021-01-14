<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn v-on="on" icon @click="dialog=true" >
                <v-icon :color="discount > 0 ? 'rgb(130, 180, 170)' : ''">mdi-sale</v-icon>
            </v-btn>
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">Edytuj rabat dla klienta</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    <p class="cell pop-subtitle">Wpisz procent rabatu (wartość od 0 do 100 bez symbolu "%")</p>
                    <v-text-field
                        solo
                        type="number"
                        v-model="i_discount"
                        class="cell input"
                        :rules="c_rules"
                        label="Wartość rabatu"
                    />

                    <div class="cell">
                        <div class="cell__popup-buttons">
                            <v-btn text class="mr-2 mb-5" @click="closeDialog()">Anuluj</v-btn>
                            <v-btn 
                            color="#1877F2" 
                            class="mb-5" 
                            dark 
                            @click="submit()"
                            >Zapisz</v-btn>
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
       },
       discount:{
           type:Number,
       },
    },

    components: {
        simplebar,
    },

    data() {
        return {
            dialog: false,
            i_discount: 0,
            c_rules: [
                value => !!value || 'Wartość nie może być pusta',
                value => value >= 0 || 'Wartość nie może być ujemna!',
                value => value <= 100 || 'Wartość nie może być większ niż 100!',
            ],
            loading: false,
        }
    },

    methods: {

        submit(){
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

    mounted() {
        this.i_discount = this.discount;
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

    .pop-subtitle{
        /* margin-top: 1rem; */
        margin-bottom: 1rem;
        color: rgba(0, 0, 0, 0.5);
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