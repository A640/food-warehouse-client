<template>
    <div class="cart-component">

        <div class="detail-area">
            <v-container>
                <v-row>
                    <v-col>
                        <v-card height="4rem">
                           <v-card-title>Adres dostawy i sposób płatności</v-card-title> 
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="12" md="8" >

                        <p class="mb-5">Adres</p>

                        <v-item-group mandatory v-model="choosen_address" >
                            <v-item v-slot="{ active, toggle }" class="mb-3" v-for="address in addresses" :key="address.address_id" >
                                <Address @addressClicked="toggle" @editAddress2="editNewAddress" :address="address" :editable="address.address_id == -5" :elevation="active ? 5 : 1" :class="active ? 'active-address' : ''"/>
                            </v-item>
                        </v-item-group>

                        <NewAddress v-if="!new_address_added" @newAddress="addNewAddress"/>
                        

                        <p class="mb-4 mt-5">Sposób płatności</p>
                        
                        <v-card class="pt-3 pl-3 pb-3">
                            <v-card-title>Wybierz metodę płatności:</v-card-title>
                            <v-radio-group v-model="payment_method" class="ml-4">
                                <v-radio v-for="method in payment_methods" :key="method.payment_type_id" :label="method.payment_type" />
                            </v-radio-group>
                        </v-card>

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
                    </v-col>
                    <v-col>
                        <v-card >
                            <div class="card-container cell">
                                <h3 class="cell" >
                                   Przejdź dalej
                                </h3>
                                <p  class="cell details-price "></p>
                                <p class="cell details-unit "></p>
                                <div class="order-button cell">
                                    <v-btn :dark="validated" :disabled="!validated" color="green lighten-1" @click="nextStep()" >Zatwierdź</v-btn>
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
import Address from '@/components/Store/Cart/AddressCard.vue'
import NewAddress from '@/components/Popups/NewAddress.vue'


export default {

    components: {
        Address,
        NewAddress,
    },
    
    data() {
        return{
            loading:true,
            addresses: [],
            payment_method: null,
            choosen_address: null,
            new_address_added: false,
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
            this.$store.dispatch('getAllAddresses').then(() => {
                this.$store.dispatch('getAllPaymentMethods').then(() => {
                    console.log('add2',this.$store.getters.getAddresses);
                    let temp = this.$store.getters.getAddresses;
                    console.log('add3',typeof(temp));
                    // if(typeof (this.$store.getters.getAddresses) == 'object'){
                    //     this.addresses.push(this.$store.getters.getAddresses);
                    // }else{
                    //     this.addresses = this.$store.getters.getAddresses;
                    // }
                    this.addresses = this.$store.getters.getAddresses;
                    this.loading = false;
                })
            })
        },

        addNewAddress(address){
            this.addresses.push(address);
            this.new_address_added = true;
        },

        editNewAddress(address){
            console.log("adObject",address)
            let index = this.addresses.findIndex(a => a.address_id == address.address_id)
            console.log("adIndex",index)
            this.addresses[index] = address;
        }

    },

    computed:{
        payment_methods(){
            console.log('payment',this.$store.getters.getPaymentMethods)
            return this.$store.getters.getPaymentMethods;
        },

        validated(){
            if(this.choosen_address != null && this.payment_method != null && this.payment_method !== '' ){
                return true;
            }
            else{
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

    .plus-ico{
        /* margin: 0 auto !important;
        font-size: 2rem; */
    }

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

    .active-address{
        /* background-color: aqua; */
        /* border: solid 1px #FFC107; */
        /* border: solid 1px #66BB6A; */
        border: solid 2px #2196F3;
        /* border: solid 1px #03A9F4; */
        
        /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); */
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
    }

    .quantity-input{
        width: 5rem;
        margin: 0 auto;
        font-size: 1.3rem;
        text-align: center;
        font-weight: 800;

    }

    .centered-input >>> input {
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