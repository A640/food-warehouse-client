<template>
    <div class="product-detail">
        <div class="detail-area">
            <v-container max-width="30rem">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-img
                                height="30rem"
                                src="@/assets/b.jpg"
                                @click="details()"
                            ></v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-card >
                            <div class="card-container">
                                <p  class="cell details-title ">Lays chrupiące prosto z pieca 240g</p>
                                <p  class="cell details-producer">Producent: Kamil</p>
                                <h3 class="cell" >Szczegóły:</h3>
                                <p  class="cell details-description ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque semper arcu, eu vulputate arcu. Pellentesque sollicitudin lobortis tortor, eget feugiat augue tristique eget. Suspendisse ultricies a lacus vitae rhoncus. Vivamus in dui ut enim consequat cursus vitae condimentum eros. Donec congue erat eu pellentesque iaculis. Sed dapibus, libero sit amet feugiat semper, augue urna convallis metus, eu commodo nisi elit eget urna. Quisque mollis egestas metus sit amet aliquam. Mauris vitae magna tincidunt odio tincidunt aliquam a eget ex. Vestibulum tincidunt, tellus eget placerat lobortis, velit velit blandit nisi, vel sagittis lectus quam a quam. Nam lacus turpis, volutpat a maximus in, scelerisque ac odio. Nunc non finibus magna. Proin risus mauris, efficitur at leo sed, sagittis luctus lectus. Quisque viverra diam in enim ultrices faucibus. Nam tortor mauris, sollicitudin eget velit sit amet, molestie luctus mauris. Praesent in scelerisque nunc. Ut imperdiet, eros in mollis volutpat, lectus neque sollicitudin leo, vel lacinia urna sapien interdum magna.

    Nulla luctus ante diam, in dapibus mauris tempor non. Suspendisse nec leo luctus, semper mauris ac, dignissim metus. Pellentesque fermentum semper leo, ac pellentesque augue interdum nec. Aliquam erat volutpat. Nam eget commodo nisl, sit amet placerat enim. Nulla convallis tellus nec tristique rutrum. Suspendisse potenti.

    Aliquam euismod bibendum sem, vel pulvinar turpis pharetra at. Vestibulum at augue ac felis elementum tempus. Etiam faucibus tempor mollis. Integer lobortis tempus ullamcorper. Sed dictum euismod lorem, non lacinia mi porttitor quis. Aliquam vehicula commodo dignissim. Sed eget sapien tristique, vestibulum neque sed, finibus eros.

    Proin libero est, imperdiet quis odio sit amet, facilisis interdum velit. Ut vel elementum lacus. Nulla eget volutpat erat, id gravida orci. Phasellus feugiat nec libero vitae facilisis. Phasellus et facilisis mauris, in efficitur mi. Donec blandit vel lorem quis efficitur. Integer tristique nunc in ligula dapibus lobortis.

    Pellentesque est est, porta ut dignissim id, convallis iaculis diam. Integer gravida est felis, id sodales ante luctus eu. Ut rutrum nisl turpis, id feugiat ante fringilla vel. Duis molestie ligula sit amet odio tristique ullamcorper. Vestibulum iaculis dolor quam, vitae sagittis ante finibus quis. Fusce euismod ornare ex, eu mollis justo. In blandit urna nec lacinia sodales. Quisque faucibus nibh nec semper mollis. Fusce et augue eu diam mattis laoreet. Sed eu ligula in urna rhoncus ultrices eget nec enim. Nulla a convallis lorem. Duis tempus vulputate turpis. Etiam ut dui eget justo vestibulum lobortis. Nam nisl dui, commodo in scelerisque ut, auctor ut nibh.</p>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card >
                        <div class="card-container cell">
                                <h3 class="cell" >
                                    
                                    Cena:
                                </h3>
                                <p  class="cell details-price ">40 zł</p>
                                <p class="cell details-unit ">za 1 europaletę produktu</p>
                                <div class="order-button cell">
                                    <add-to-cart/>
                                </div>
                                <p class="detail-claim cell">Produkt z tej oferty ma jeszcze conajmniej 1 miesiąc przydatności</p>
                            </div>
                        </v-card>

                        <!-- special offers -->

                        <v-card class="mt-5" v-for="k in 1" :key="k">
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
                                <p  class="cell details-price "><span class="old-price">40</span> 30 zł</p>
                                <p class="cell details-unit ">za 1 europaletę produktu</p>
                                <div class="order-button cell">
                                    <add-to-cart :sale="true" />
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
                                        12.02.2021
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
            i_search: '',
            e_search: '',
            products_search: [],
        }
    },

    computed:{
        store_name(){
            return this.$store.getters.getStoreName;
        }
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