<template>
    <div class="cart-component">

        <div class="detail-area">
            <v-container>
                <v-row>
                    <v-col>
                        <v-card height="4rem">
                           <v-card-title>{{ $t("store.cart.summary") }}:</v-card-title> 
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">


                        <p class="mb-5">{{ $t("address.address") }}</p>
                            <Address class="mb-5" :address="cart_settings.address" />

                        <p class="mb-5">{{ $t("payment.paymentMethod") }}</p>
                            <v-card class="mb-5 center-content  d-flex">
                                <v-card-title class="center">{{cart_settings.payment.payment_type}}</v-card-title>
                            </v-card>

                        <p class="mb-5">{{ $t("orders.comments") }} {{ $t("common.optional") }}</p>
                            
                            <v-textarea 
                                class="input" 
                                :label="$t('orders.commentsPlaceholder')" 
                                solo 
                                v-model="order_comment"
                            />
                            

                        <p class="mb-5">{{ $t("products.products") }}</p>
                        <v-card min-height="8rem">
                            <div class="card-container">
                                <!-- Product list -->
                                <v-form v-model="validated">
                                    <div class="product-cell" v-for="product in products" :key="String(product.product_id)+String(product.discount_id)">
                                        <Product class="mb-4 ml-4"  :removable="false" :product="product" @Deleted="loadData()"/>
                                    
                                        <v-card height="9rem" class="mr-4 ml-2">
                                            <v-card-subtitle>{{ $t("products.quantity") }}</v-card-subtitle>
                                            <div class="quantity-cell">
                                                
                                                <p class="quantity-label centered-input" >{{product.quantity}}</p>
                                               
                                            </div>
                                            
                                        </v-card>
                                    </div>
                                </v-form>

                                
                                
                                

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
                        </v-card>

                        <v-btn outlined @click="clearCart()" class="mt-5" color="rgba(0,0,0,0.5)" >{{ $t("store.cart.clearCart") }}</v-btn>

                    </v-col>
                    <v-col>
                        <v-card >
                            <div class="card-container cell">
                                <h3 class="cell" >
                                    
                                    {{ $t("store.cart.toPay") }}:
                                </h3>
                                <p  class="cell details-price ">{{total}} zł</p>
                                <p class="cell details-unit "></p>
                                <div class="order-button cell">
                                    <v-btn :dark="total > 0" :disabled="!(total > 0)" color="green lighten-1" @click="nextStep()" >{{ $t("store.cart.buyAndPay") }}</v-btn>
                                </div>
                                <p class="detail-claim cell">{{ $t("store.cart.termsAndConditions") }} {{store_name}}</p>
                            </div>
                        </v-card>

                        

                        <!-- special offers -->
                    </v-col>
                </v-row>
            </v-container>
        </div>
        
    </div>
</template>

<script>
import Product from '@/components/Store/Cart/ProductMiniCart.vue'
import Address from '@/components/Store/Cart/AddressCard.vue'

export default {

    components: {
        Product,
        Address,
    },
    
    data() {
        return{
            loading:true,
            products: [],
            validated: false,
            order_comment: '',
           
        }

    },

    methods: {   

        nextStep(){
            if(this.validated){
                this.$emit('next');
            }
            
        },

        loadData(){
            this.loading = true;
            this.$store.dispatch('getCartProducts').then((result) => {
                this.products = result;
                this.loading = false;
            })
        },

        clearCart(){
            this.$store.commit('clearCart');
            this.$emit('clearCart');
        }

    },

    computed:{
        total(){
            let total = 0;
            this.products.forEach((p) =>{ total += Number.parseFloat(p.sell_price) * Number.parseInt(p.quantity)});
            return total;
        },

        cart_settings(){
            return this.$store.getters.getCartSettings;
        },

        store_name(){
            return this.$store.getters.getStoreName;
        }
    },

    watch:{
        order_comment(val){
            this.$store.commit('setOrderComment',val)
        }
    },

    mounted() {
        this.loadData();
    },

}
</script>

<style scoped>

    .cart-component{
        width: 100%;
        height: 100%;
        /* background-color: rgb(75, 156, 236); */
        
        align-self: center;
        /* border-radius: 10px; */
        /* padding: 2rem; */
        /* display: flex;
        flex-direction: row;
        justify-content: center; */


    }

    .product-cell{
        width: 100%;
        display: flex;
    }

    .quantity-cell{
        width: 100%;
        display: flex;
        align-items: baseline;
    }

    .center{
        margin: 0 auto !important;
    }

    .cart-products{
        order: 1;
        height: 100%;
        width: 70%;
        background-color: #007E33;
    }

    .products-total-container{
        order: 2;
        height: 100%;
        flex-grow: 1;
    }

    .input{
        margin-top: 0.75rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .title{
        /* margin: 0 auto; */
        margin-top: 2rem;
        margin-bottom: 3rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        font-size: 1.3rem;
    }

    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        /* border: 1px solid red; */
    }

    .cell__label{
        font-family: 'Segoe UI';
        font-weight: 450;
        margin-bottom: 1rem;
    }

    .align-right{
        text-align: right;
    }

    .submit__btn{
        position: absolute;
        top: 0;
        right: 0;
        font-family: 'Segoe UI';
        font-weight: 500;
        background-color: #007E33;
    }

    .align-center{
        text-align: center;
    }

    .footer{
        margin: auto;
        margin-bottom: 2rem;
        margin-top: 2rem;
    }

    .relative{
        position: relative;
        height: 5rem;
        margin-top: 1rem;
    }

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

    .error{
        margin-bottom: 1.5rem;
    }

    .error > p{
        font-size: 0.8rem;
        color: rgb(209, 33, 33);
    }

    .detail-area{
        height: 100%;
        width: 100%;
        max-width: 90rem;
        margin: 0 auto;
    }

    .card-container{
        width: 100%;
        height: 100%;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .details-title{
        font-size:1.5rem;
        margin-bottom: 0.3rem;
        font-weight: 600;
    }

    .details-producer{
        font-size:0.9rem;
        /* margin-top: 0rem; */
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-bottom: 1.1rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
    }

    .details-description{
        margin-top: 0.70rem;

    }

    .details-price{
        font-size:1.7rem;
        margin-bottom: 0rem;
        font-weight: 800;
    }

    .details-unit{
        margin-top: 0;
        margin-bottom: 1rem;
        color: rgba(0, 0, 0, 0.5);
    }

    .order-button{
        display: flex;
        justify-content: flex-end;
    }

    .detail-area{
        height: 100%;
        width: 100%;
        max-width: 70rem;
        margin: 0 auto;
    }

    .detail-claim{
        font-size:0.70rem;
        margin-top: 1rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        text-align: start;
    }

    .quantity-label{
        width: 5rem;
        margin: 0 auto;
        font-size: 1.3rem;
        text-align: center;
        font-weight: 800;

    }

    .centered-input {
      text-align: center
    }


    .old-price{
        text-decoration: line-through;
        color: rgba(50, 50, 50, 0.5);
        font-weight: 600;
    }


    /* Hide arrows from number input */
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield !important;
    }

</style>