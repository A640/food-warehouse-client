<template>
    <div class="cart">
        <v-stepper alt-labels :non-linear="true" height="100%" v-model="step" class="cart__stepper" >
            <v-stepper-header class="cart__stepper-header mt-0">
                <v-stepper-step
                :editable="step > 0"
                edit-icon="mdi-check"
                :complete="step > 1"
                step="1"
                >
                Koszyk
                </v-stepper-step>
        
                <v-divider></v-divider>
        
                <v-stepper-step
                :editable="step > 1"
                edit-icon="mdi-check"
                :complete="step > 2"
                step="2"
                >
                Adres i płatność
                </v-stepper-step>
        
                <v-divider></v-divider>
        
                <v-stepper-step :editable="step > 2" edit-icon="mdi-check" step="3">
                Podsumowanie
                </v-stepper-step>
            </v-stepper-header>
        
            <v-stepper-items class="full-height cart-items">
                <v-stepper-content class="pa-0 full-height" step="1">
                    <Cart1 @next="r1Complete" @clearCart="step = 1"/>
                </v-stepper-content>
        
                <v-stepper-content class="pa-0 full-height" step="2">
                    <Cart2 @next="r2Complete" @back="r2Back" @clearCart="step = 1"/>
                </v-stepper-content>
        
                <v-stepper-content class="pa-0 full-height" step="3">
                    <Cart3 @next="r3Complete" @back="r3Back" @clearCart="step = 1"/>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
import Cart1 from '@/components/Store/Cart/ProductStep.vue'
import Cart2 from '@/components/Store/Cart/AddressStep.vue'
import Cart3 from '@/components/Store/Cart/SummaryStep.vue'

export default {

    components:{
        Cart1,
        Cart2,
        Cart3,
    },



    data () {
        return {
            step: 1,
            product: null,
        }
    },

    methods:{
        r1Complete(){
            this.step = 2;
        },

        r2Complete(){
            this.step = 3;
        },

        r3Complete(){
            console.log("Próba orderu");
            
            this.$store.dispatch('order')
            .then(() => {
                if(this.$store.getters.isOnlinePayment){
                    this.$router.push({ name: 'Payment'});
                }
                else{
                    this.$store.commit('clearCart');
                    this.$router.push({ name: 'Order_Success'});
                }
                
            })
            
        },

        r2Back(){
            this.step = 1;
        },

        r3Back(){
            this.step = 2;
        },
    }

   


}
</script>

<style scoped>

    .cart__stepper{
        border-radius: 0;
    }

    .cart{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        flex-direction: column;
        
    }

    .cart-items{
        background-color: rgb(240, 242, 245);
    }

    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 90%;
        margin: 0 auto;
        /* border: 1px solid red; */
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
        font-size:1.5rem;
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
        font-size:0.75rem;
        margin-top: 1rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
    }


    .old-price{
        text-decoration: line-through;
        color: rgba(50, 50, 50, 0.5);
        font-weight: 600;
    }

    .cart__stepper{
        border: none;
        box-shadow: none;
        height: 100%;
    }

    .full-height{
        height: 100%;
    }

    /* check if this creates errors in layout */
    .full-height >>> div.v-stepper__wrapper{
        height: 100% !important;
    }


</style>