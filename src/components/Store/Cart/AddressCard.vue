<template>
    <v-card class="pa-5 d-flex main" :elevation="elevation ? elevation : 1 " @click="clicked">
        <div class="center-content d-flex">
            <p class="detail mb-2"><span v-if="address.street" class="detail " >{{address.street}}</span>
            {{address.building_number}}
            <span v-if="address.apartment_number" class="detail " >/ {{address.apartment_number}}</span>
            </p>
            <p class="detail mb-2">{{address.postal_code}}, {{address.town}}</p>
            <p class="detail mb-0">{{address.country}}</p>
        </div>
        <v-btn depressed v-if="editable" @click="deleteAddress"><v-icon>mdi-delete</v-icon></v-btn>
    </v-card>
</template>

<script>

export default {
    name: 'AddressCard',

    data() {
        return {
            
        }
    },

    props:{
        address:{
            type: Object,

        },
        elevation:{
            type: Number,
            default: null,
        },
        editable:{
            type: Boolean,
            default: false,
        }

    },

    methods: {

        deleteAddress(){
            // this.$emit("deleteAddress",this.address.address_id);
            this.$store.commit('deleteAddress',this.address.address_id);
        },

        clicked(){
            this.$emit('addressClicked');
        }
    },

    watch:{

    }
}
</script>


<style scoped>

    .details{
        margin: 0;
        padding: 0;
        background-color: white;
        background-color: #F0F2F5;
    }

    .detail{
        font-weight: 600;
        font-size: 1rem;
    }

    .center-content{
        margin: 0 auto;
        flex-direction: column;
    }

    .main{
        position: relative;
    }

</style>