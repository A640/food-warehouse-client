<template>
    <div class="container">
        <p class="p_title">Płatność</p>
        <div class="p_buttons">
            <v-btn outlined color="red" class="mr-5" @click="pay(false)" >Płatność nieudana</v-btn>
            <v-btn outlined color="green" class="ml-5" @click="pay(true)" >Płatność udana</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    
    name: 'Payment',

    methods: {
        pay(is_successful){
            this.$store.dispatch('payForOrder',is_successful)
            .then((result) => {
                console.log("payment result",result);
                if(result){
                    this.$store.commit('clearCart');
                    if(is_successful){
                        this.$router.push({ name: 'Order_Success'});
                    }
                    else{
                        this.$router.push({ name: 'Order_Warning'});
                    }
                }
               
            })
            
        }
    },
}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .p_buttons{
        
    }

    .p_title{
        font-size: 1.5rem;
        font-weight: 600;
    }
</style>