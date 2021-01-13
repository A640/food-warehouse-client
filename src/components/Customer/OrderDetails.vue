<template>
    <div class="cart-component">

        <div class="detail-area">
            <v-container>
                <v-row>
                    <v-col cols="12" md="1" >
                        <v-card height="3rem" class="center-content  d-flex" @click="showOrdersList()">
                           <v-icon class="ml-3">mdi-arrow-left</v-icon>
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col>
                        <v-card height="4rem">
                           <v-card-title>Zamówienie numer {{order.order_id}}</v-card-title> 
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">


                        <p class="mb-5">Adres</p>
                            <Address class="mb-5" :address="address" />

                        <p class="mb-5">Metoda płatności</p>
                            <v-card class="mb-5 center-content  d-flex">
                                <v-card-title class="center">{{payment.payment_type}}</v-card-title>
                            </v-card>

                        <p class="mb-5">Uwagi do zamówienia</p>
                            
                            <v-textarea
                                :disabled="true" 
                                class="input-bold input"
                                label="Brak uwag do zamówienia"
                                min-height="1rem"
                                solo 
                                v-model="order.comment"
                            />
                            

                        <p class="mb-5">Produkty</p>
                        <v-card min-height="8rem">
                            <div class="card-container">
                                <!-- Product list -->
                                <v-form v-model="validated">
                                    <div class="product-cell" v-for="product in products" :key="String(product.product_id)+String(product.due_to)">
                                        <Product class="mb-4 ml-4"  :removable="false" :product="product" @Deleted="loadData()"/>
                                    
                                        <v-card height="9rem" class="mr-4 ml-2">
                                            <v-card-subtitle>Ilość</v-card-subtitle>
                                            <div class="quantity-cell">
                                                
                                                <p class="quantity-label centered-input" >{{product.quantity}}</p>
                                               
                                            </div>
                                            
                                        </v-card>
                                    </div>
                                </v-form>

                                
                                
                                

                                
                            </div>
                        </v-card>

                    </v-col>
                    <v-col>

                        <p class="mb-5">Wartość</p>
                            <v-card class="mb-5" >
                                <div class="card-container cell">
                                    <h3 class="cell"> Wartość zamówienia:</h3>
                                    <p  class="cell details-price ">{{payment.value}} zł</p>
                                </div>
                            </v-card>

                        <p class="mb-5">Status zamówienia</p>
                            <v-card class="mb-5">
                                <div class="card-container cell">
                                    <h3 class="cell">{{state}}</h3>
                                </div>
                            </v-card>

                        <p class="mb-5">Wycofaj zamówienie</p>
                            <v-card class="mb-5 d-flex pt-5 pb-5">

                                <Cancel class="center-btn"  v-if="cancellable" :id="order.order_id" @updateOrderDetails="loadData(true)"/>
                                <v-card-subtitle v-else >Nie można już wycofać zamówienia</v-card-subtitle>
                                
                            </v-card>

                        <p class="mb-5">Reklamacja</p>
                            <v-card class="mb-5 cc-card pt-5 pb-5">
                                <NewComplaint  :id="order.order_id" @updateOrderDetails="loadData(true)" class="mb-2"/>
                                <Complaint v-for="complaint in complaints" :key="complaint.complaint_id" :complaint="complaint" class="mt-3" @updateOrderDetails="loadData(true)"/>
                                
                                <!-- <v-card-subtitle >Nie można już wycofać zamówienia</v-card-subtitle> -->
                                
                            </v-card>

                        

                        <!-- special offers -->
                    </v-col>
                </v-row>
            </v-container>
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
</template>

<script>
import Product from '@/components/Store/Cart/ProductMiniCart.vue'
import Address from '@/components/Store/Cart/AddressCard.vue'
import Cancel from '@/components/Popups/CancelOrder.vue'
import NewComplaint from '@/components/Popups/NewComplaint.vue'
import Complaint from '@/components/Popups/ComplaintResponse.vue'

export default {

    components: {
        Product,
        Address,
        Cancel,
        NewComplaint,
        Complaint,
    },

    props:{
        id:{
            default: -1,
        }
    },
    
    data() {
        return{
            loading:true,
            order: {},
            address: {},
            payment: {},
            delivery: {},
            products: [],
            validated: false,
            order_comment: '',
            complaints: [],
        }

    },

    methods: {   

        nextStep(){
            if(this.validated){
                this.$emit('next');
            }
            
        },

        loadData(force=false){
            this.loading = true;
            
            let id;
            if(this.id != -1 && this.id !== null && this.id != undefined){
                id = Number.parseInt(this.id);
            }
            else{
                id = Number.parseInt(this.$route.params.id);
            }

            if(force){
                console.log('force reload');
                this.getFromServer(id);
            }
            else{
                this.getFromStore(id);
            } 
            
        },

        getFromStore(id){
            this.$store.dispatch('getOrderData',id).then((result) => {
                    console.log('load order', result);
                    if(result == null || result == undefined){
                        this.getFromServer(id);
                    }
                    else{
                        this.order = result.order;
                        this.address = result.delivery.address;
                        this.payment = result.payment;
                        this.delivery = result.delivery;
                        this.complaints = result.complaints;
                        this.products = result.products;
                        this.loading = false;
                    }
                
                })
        },

        getFromServer(id){
            this.$store.dispatch('getOneOrder',id).then((result) => {
                if(result == null || result == undefined){
                    this.$router.push({name: 'Order_404'});
                }
                else{
                    this.order = result.order;
                    this.address = result.delivery.address;
                    this.payment = result.payment;
                    this.delivery = result.delivery;
                    this.complaints = result.complaints;
                    this.products = result.products;
                    this.loading = false;
                }
            })
        },

        clearCart(){
            this.$store.commit('clearCart');
            this.$emit('clearCart');
        },

        showOrdersList(){
            this.$router.push({name:'Customer_Orders'});
        }

    },

    computed:{

        state(){
            if(this.order.order_state == "PENDING"){
                return "Oczekujące";
            }else if(this.order.order_state == "REGISTERED"){
                return 'Przyjęte';
            }else if(this.order.order_state == "CANCELED"){
                return 'Anulowane';
            }else if(this.order.order_state == "COMPLETING"){
                return 'W trakcie kompletacji'
            }else if(this.order.order_state == "READY TO DELIVER"){
                return 'Gotowy do dostarczenia'
            }else if(this.order.order_state == "OUT FOR DELIVERY"){
                return 'W drodze do klienta'
            }else if(this.order.order_state == "DELIVERED"){
                return 'Dostarczono'
            }else if(this.order.order_state == "RETURNED"){
                return 'Zwrócone'
            }else{
                return 'Nieznany'
            }
        },

        cancellable(){
            if(this.order.order_state == "PENDING" || this.order.order_state == "REGISTERED"){
                return true;
            }else{
                return false;
            }
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
        position: relative;
        align-self: center;
        /* border-radius: 10px; */
        /* padding: 2rem; */
        /* display: flex;
        flex-direction: row;
        justify-content: center; */


    }

    .cc-card{
        display: flex;
        flex-direction: column;
    }

    .center-btn{
        margin: 0 auto !important;
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

    .input-bold >>> textarea:disabled{
        color: rgba(0,0,0,1) !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
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