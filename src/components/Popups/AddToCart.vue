<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn :color="sale ? 'amber' : 'green lighten-1'" v-on="on" class="pull-right" dark elevation=2>Zamów</v-btn>
        </template>
        <div class="pop-card">
            <div class="pop-wrapper">
                <div class="cell pop-title">
                    <h2 class="pop-title__text">Dodaj do koszyka</h2>
                </div>
                
                <simplebar class="pop-content" data-simplebar-auto-hide="false">
                    <product-mini class="mini" :product="product"></product-mini>

                    <p 
                        v-if="sale" 
                        class="cell details-price "
                    >Data ważności: <v-chip
                                        label
                                        class="mr-2"
                                        color="amber"
                                    >
                                        <b>{{ due_to }}</b>
                                    </v-chip>
                    </p>

                    <p  class="cell details-price ">Cena za sztukę: <span class="price">{{ price }}</span></p>

                    <p class="cell details-price ">Ilość:</p>
                    <v-form class="cell" v-model="form">
                        
                        <div class="double">
                        
                            <v-text-field
                                class="pc-input input inline mr-5"
                                type="number"
                                label=""
                                solo
                                v-model="i_count"
                                :rules="r_count"
                                v-on:keyup.enter.stop
                            ></v-text-field>

                            <p>z {{ max }} sztuk</p>

                        </div>
                        
                    </v-form>
                    
                    <div class="order-button cell">
                        <p  class="details-price text-right">Razem: <span class="total">{{total}} zł</span></p>
                        <div>
                            <v-btn text class="mr-5" @click="closeDialog()">Anuluj</v-btn>
                            <v-btn :color="sale ? 'amber' : 'green lighten-1'"   elevation=2 @click="add()" :dark="total > 0" :disabled="!(total > 0)" >Dodaj</v-btn>
                        </div>
                        
                    </div>
                    
            
                </simplebar>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import simplebar from 'simplebar-vue';
import ProductMini from '@/components/Store/ProductMini.vue'

export default {

    name: "AddToCart",

    props: {
        product:{
            type: Object,
            required: true,
        },
        sale:{
            type: Boolean,
            default: false,
        },
        price:{
            type: Number,
            default:null,
        },
        max:{
            type: Number,
            default:null,
        },
        due_to:{
            type: String,
            default: null,
        },
        sale_id:{
            type: Number,
            default: -1, 
        }
    },

    components: {
        simplebar,
        ProductMini,
    },

    data() {
        return {
            dialog: false,
            i_count: 1,
            r_count: [
                value => !!value || 'To pole jest wymagane!',
                value => (value || '') >= 0 || 'Ilość nie może być ujemna',
                value => (value || '') <= this.max || 'Ilość nie może być większa niż maksymalna liczba sztuk',
            ],
            form: false,
        }
    },

    computed:{
        total(){
            return this.price * Number.parseInt(this.i_count) 
        }
    },

    methods: {

        add(){
            if(this.total >0 && this.form){
                let product = {
                    product_id: this.product.product_id,
                    quantity: Number.parseInt(this.i_count),
                }
                if(this.sale){
                    product.discount_id = this.sale_id;
                }
                else{
                    product.discount_id = -1;
                }
                this.$store.commit('addToCart',product)
                this.closeDialog();

            }
            
        },

        closeDialog(){
            this.i_count = 1;
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

    .details-price{
        font-size:1.2rem;
        margin-bottom: 0.5rem;
        font-weight: 400;
    }

    .price{
        font-size:1.2rem;
        font-weight: 500;
    }

    .total{
        font-size:1.7rem;
        font-weight: 800;
    }

    .order-button{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: 2rem;
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
    }

    .mini{
        margin-bottom: 2rem;
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