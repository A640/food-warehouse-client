<template>
    <div class="product-detail">
        <div class="detail-area">
            <v-container max-width="30rem">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-img
                                height="30rem"
                                :src="product.image"
                                @click="details()"
                            ></v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-card >
                            <div class="card-container">
                                <p  class="cell details-title ">{{product.name}}</p>
                                <p  class="cell details-producer">Producent: {{product.producer_name}}</p>
                                <h3 class="cell" >Szczegóły:</h3>
                                <p  class="cell details-description ">{{product.description}}</p>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card >
                        <div class="card-container cell">
                                <h3 class="cell" >
                                    
                                    Cena:
                                </h3>
                                <p  class="cell details-price ">{{product.sell_price}} zł</p>
                                <p class="cell details-unit ">za 1 europaletę produktu</p>
                                <div class="order-button cell">
                                    <add-to-cart
                                        :product="product" 
                                        :sale="false" 
                                        :price="product.sell_price" 
                                        :max="product.quantity"
                                        :id="product.product_id"
                                        :sale_id="-1"
                                    />
                                </div>
                                <p class="detail-claim cell">Produkt z tej oferty ma jeszcze conajmniej 1 miesiąc przydatności</p>
                            </div>
                        </v-card>

                        <!-- special offers -->

                        <v-card class="mt-5" v-for="discount in product.discounts" :key="discount.eat_by_date">
                        <div class="card-container cell">
                                <h3 class="cell" >
                                    <v-chip
                                        label
                                        dark
                                        class="mr-2"
                                        color="amber"
                                    >
                                        Promocja
                                    </v-chip>
                                    Cena:
                                </h3>
                                <p  class="cell details-price "><span class="old-price">{{product.sell_price}}</span> {{discount.sell_price}} zł</p>
                                <p class="cell details-unit ">za 1 europaletę produktu</p>
                                <div class="order-button cell">
                                    <add-to-cart 
                                        :product="product" 
                                        :sale="true" 
                                        :price="discount.sell_price" 
                                        :max="discount.quantity"
                                        :id="product.product_id"
                                        :due_to="new String(discount.eat_by_date).substr(0, 10)"
                                        :sale_id="discount.discount_id"
                                    />
                                </div>
                                <p class="detail-claim cell">
                                    Data ważności produktu z tej oferty kończy się 
                                    <v-chip
                                        label
                                        outlined
                                        dense
                                        class="mr-2"
                                        color="amber"
                                    >
                                        {{new String(discount.eat_by_date).substr(0, 10)}}
                                    </v-chip>
                                    </p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        
        
    </div>
</template>

<script>
import AddToCart from '@/components/Popups/AddToCart.vue';


export default {

    components:{
        AddToCart

    },

    props:{
        id:{
            default: -1,
        }
    },


    data () {
        return {
            product: {},
        }
    },

    methods:{
        load_data(){

            let temp_id = Number.parseInt(this.$route.params.id);
            console.log('ID init ',temp_id)
            this.$store.dispatch('getStoreProductData',temp_id)
            .then( (product) => {
                console.log(product);
                if(product){
                    this.product = product;
                }
                else{
                    this.$store.dispatch('getOneProduct', temp_id).then( (result) => {
                        console.log('dociągnięcie', result)
                        if(result == undefined || result === 'no product found' || result == null){
                            this.$router.push({name:'Store404'});
                        }
                        else{
                            this.product = result;
                        }
                    })
                }
            })
        }
    },

    mounted(){
        this.load_data();
    },

    computed:{
        reconnected(){
            return this.$store.getters.getReconnected;
        },
    },


}
</script>

<style scoped>

    .product-detail{
        width: 100%;
        height: 100%;
        background-color: rgb(240, 242, 245);
        display: flex;
        flex-direction: column;
        
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


</style>