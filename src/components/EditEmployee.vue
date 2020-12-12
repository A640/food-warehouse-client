<template>
    <popup :id="id" :edit="edit" >
        Hello from NiosII
     </popup>
</template>

<script>
import Popup from '@/components/EditPopup.vue'


export default {
    components:{
        Popup
    },

    props:{
        id:{
            type: Number,
            default: undefined,
        },
        edit:{
            type: Boolean,
            default: false,
        },
    }
}
</script>