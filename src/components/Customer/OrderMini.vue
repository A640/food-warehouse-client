<template>
    <div class="cell">
        <v-card class="pa-5 mt-5" @click="showDetails()">
            <!-- <div class="mini-img">

            </div> -->
            
            <div class="details">
                <div class="ml-4">
                    <h3 class="details-mini-title mt-0" >Zamówienie numer {{order.order.order_id}}</h3>
                    <p  class=" details-producer mb-0">{{state}}</p>
                </div>

                <div class="details">
                    <div class="mr-5" >
                        <p class="details-mini-title mt-0">Produktów</p>
                        <p class="details-mini-title mb-0 text-center">{{order.products.length}}</p>         
                    </div>
                    
                    <div class="mr-4 ml-5" >
                        <p class="details-mini-title mt-0">Wartość</p>
                        <p class="details-mini-title mb-0 text-center">{{order.payment.value}} zł</p>         
                    </div>
                </div>
                
                
            </div>
            
        </v-card>
    </div>
    
</template>

<script>
export default {

    props:{
        order:{
            type: Object,
            required: true,
        },
        cancellable:{
            type: Boolean,
            default: true,
        },
    },
    
    data() {
        return{
           
        }

    },

    computed:{
        state(){
            if(this.order.order.order_state == "PENDING"){
                return "Oczekujące";
            }else if(this.order.order.order_state == "REGISTERED"){
                return 'Przyjęte';
            }else if(this.order.order.order_state == "CANCELED"){
                return 'Anulowane';
            }else if(this.order.order.order_state == "COMPLETING"){
                return 'W trakcie kompletacji'
            }else if(this.order.order.order_state == "READY TO DELIVER"){
                return 'Gotowy do dostarczenia'
            }else if(this.order.order.order_state == "OUT FOR DELIVERY"){
                return 'W drodze do klienta'
            }else if(this.order.order.order_state == "DELIVERED"){
                return 'Dostarczono'
            }else if(this.order.order.order_state == "RETURNED"){
                return 'Zwrócone'
            }else{
                return 'Nieznany'
            }
        },
    },

    methods: {
       showDetails(){
           this.$router.push({name: 'Order_Details', params:{id: this.order.order.order_id}});
       }
    },
}
</script>

<style scoped>

    .card-container{
        width: 100%;
        height: 100%;
        display: flex;
    }

    .flex-row{
        display: flex;
        flex-direction: row;
        min-height: 9rem;
    }

    .flex-end{
        display: flex;
        justify-content: flex-end;
    }

    .last{
        width: 100%;
        align-items: baseline;
    }

    .close-btn {
        height: 9rem !important;
        align-self: center;
        background-color: rgba(0, 0, 0, 0) !important;
    }

    



    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        max-width: 800px;
        /* border: 1px solid red; */
    }

    .mini-img{
        height: 100%;
        width: 20%;
        max-width: 10rem;
        background-size: cover;
        background-position: center;
    }

    .details{
        display: flex;
        justify-content: space-between;
    }

    .details-mini-title{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top: 1rem;
        margin-bottom: 0.2rem;
        
    }
    .details-mini-price{
        margin-top: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-weight:700;
        font-size: 1.1rem;
        margin-right: 0.25rem;
    }

    .details-mini-price2{
        margin-top: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-weight:700;
        font-size: 1.1rem;
        margin-right: 1rem;
    }

    .round-fix{
        border-bottom-left-radius: 4px;
        border-top-right-radius: 0 !important;
    }

    .details-producer{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.95rem;
        color: rgba(0, 0, 0, 0.5);

    }

  

</style>