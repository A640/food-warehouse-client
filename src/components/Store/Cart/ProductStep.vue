<template>
    <div class="cart-component">

        <div class="detail-area">
            <v-container>
                <v-row>
                    <v-col>
                        <v-card height="4rem">
                           <v-card-title>Produkty w koszyku:</v-card-title> 
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-card min-height="8rem">
                            <div class="card-container">
                                <!-- Product list -->
                                <Product v-for="product in products" :key="String(product.product_id)+String(product.discount_id)" :product="product" />

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
                    </v-col>
                    <v-col>
                        <v-card >
                            <div class="card-container cell">
                                <h3 class="cell" >
                                    
                                    Razem:
                                </h3>
                                <p  class="cell details-price ">12 zł</p>
                                <p class="cell details-unit "></p>
                                <div class="order-button cell">
                                    <v-btn color="green lighten-1" @click="nextStep()" >Przejdź do dostawy</v-btn>
                                </div>
                                <p class="detail-claim cell">Produkty zostaną dostarczone w ciągu maksymalnie 5 dni roboczych</p>
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
export default {

    components: {
        Product,
    },
    
    data() {
        return{
            loading:true,
            products: [],
        }

    },

    methods: {   

        nextStep(){
            this.$emit('next');
        }

    },

    mounted() {
        this.loading = true;
        this.$store.dispatch('getCartProducts').then((result) => {
            this.products = result;
            this.loading = false;
        })
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
        max-width: 70rem;
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
    }


    .old-price{
        text-decoration: line-through;
        color: rgba(50, 50, 50, 0.5);
        font-weight: 600;
    }

</style>