<template>
    <v-card max-width="25rem" class="mb-4" >
        
        <v-hover v-slot="{ hover }">
            <v-img
                height="250"
                :src="product.image"
                @click="showDetails()"
            >
                <v-fade-transition>
                    <div class="detail-info" v-if="hover">
                        Szczegóły produktu
                    </div>
                </v-fade-transition>
            </v-img>
        </v-hover>
        
            
        <v-card-title>
            <v-chip
                v-if="product.discounts.length > 0"
                label
                dark
                class="mr-2"
                color="amber"
                @click="showDetails()"
            >
                Dostępna promocja
            </v-chip>
            {{ product.name }} 
            <v-spacer></v-spacer> 
            <!-- if product wadd added to cart -->
            <v-chip dark color="green lighten-1" v-if="product.added">
                <v-icon left>mdi-check</v-icon>
                Dodano 
            </v-chip>
        </v-card-title>

        <!-- Product rating -->

        <!-- <v-card-text >

            <v-row
            align="center"
            class="mx-0"
            >
            <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
            ></v-rating>
    
            <div class="grey--text ml-4">
                4.5 (413)
            </div>
            </v-row>
                
        </v-card-text> -->

        <v-card-text class="text-wrap text-justify">{{product.short_description}}</v-card-text>

        <v-card-actions class="pl-3 pr-3 mt-0">
            <v-card-title>
                {{ product.sell_price }} zł
            </v-card-title>
            <v-spacer></v-spacer>
            <add-to-cart 
                :product="product" 
                :sale="false" 
                :price="product.sell_price" 
                :max="product.quantity"
                :id="product.product_id"
                :sale_id="-1"
            />
        </v-card-actions>

    </v-card>
</template>

<script>
import AddToCart from '@/components/Popups/AddToCart.vue';

export default {

    components:{
        AddToCart,
    },
    
    props:{
        product:{
            type: Object,
            required: true,
        },
    },

    
    
    data() {
        return{
           
        }

    },

    methods: {
        showDetails(){
            this.$router.push({ name: 'Store_Detail', params: {id:this.product.product_id }})
        }
    },
}
</script>

<style scoped>

    .product-component{
        width: 40%;
        min-height: 60%;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        /* padding: 2rem; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        max-width: 550px;

    }

    .input{
        margin-top: 1rem;
        font-family: 'Segoe UI';
        font-weight: 600;
        
    }

    .title{
        margin: 0 auto;
        margin-top: 4rem;
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
    }

    .cell > p {
        font-family: 'Segoe UI';
        font-weight: 500;
        font-size: 1rem;
    }

    .relative{
        position: relative;
        height: 3rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
        /* border: solid 1px red; */
    }

    .cell__link{
        display: inline;
        text-decoration: none;
        font-weight: 600;
        color: #007E33;
    }

    .credentials_error{
        margin-bottom: 1.5rem;
    }

    .credentials_error > p{
        font-size: 0.8rem;
        color: rgb(209, 33, 33);
    }

    .add-button{
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .detail-info{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.80);
        cursor: pointer;
    }

</style>