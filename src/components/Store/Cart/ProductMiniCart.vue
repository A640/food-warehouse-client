<template>
    <div class="cell">
        <v-card class="flex-row">
            
                
                
                   
                <v-img :src="product.image" class="round-fix"  max-height="100%" max-width="9rem" />
                <!-- <div class="mini-img">

                </div> -->
                
                <div class="details">
                    <h3 class="details-mini-title" >{{product.name}}</h3>
                    <p  class=" details-producer ">{{product.producer_name}}</p>
                    <div class="flex-end last" v-if="product.discount_id != -1" >
                        <p 
                             
                            class="cell details-price "
                        >Data ważności: <v-chip
                                            label
                                            class="mr-2"
                                            color="amber"
                                        >
                                            <b>{{ product.due_to }}</b>
                                        </v-chip>
                        </p>
                        <v-spacer></v-spacer>
                        <p class="details-mini-price" >{{product.sell_price}} zł</p>         
                    </div>
                    <div class="flex-end last" v-else >
                        <p class="details-mini-price" >{{product.sell_price}} zł</p>         
                    </div>
                </div>
                <v-btn  depressed class="close-btn" @click="deleteFromCart()"><v-icon>mdi-close</v-icon></v-btn>
            
        </v-card>
    </div>
    
</template>

<script>
export default {

    props:{
        product:{
            type: Object,
            required: true,
        }
    },
    
    data() {
        return{
           
        }

    },

    methods: {
        deleteFromCart(){
            let i = {
                product_id: this.product.product_id,
                discount_id: this.product.discount_id,
            }
            this.$store.commit('deleteFromCart',i);
            this.$emit('Deleted');
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
        margin-left: 2rem;
        flex-grow: 1;
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