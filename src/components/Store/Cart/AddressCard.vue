<template>
    <v-card class="pa-5 d-flex " :elevation="elevation ? elevation : 1 ">
        <div class="center-content d-flex">
            <p class="detail mb-2"><span v-if="address.street" class="detail " >{{address.street}}</span>
            {{address.building_number}}
            <span v-if="address.apartment_number" class="detail " >/ {{address.apartment_number}}</span>
            </p>
            <p class="detail mb-2">{{address.postal_code}}, {{address.town}}</p>
            <p class="detail mb-0">{{address.country}}</p>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'AddressCard',

    props:{
        address:{
            type: Object,

        },
        elevation:{
            type: Number,
            default: null,
        }
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
</style>