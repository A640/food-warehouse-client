<template>
    <div class="alerts-container"> 
        
        <v-card :class="{card: true, 'dan': alert.danger, 'war': alert.warning}" v-for="alert in alerts" :key="alert.content" max-width="500px">
            <p class="a-title cell mb-3">{{alert.title}}</p>
            <p class="content cell">{{alert.content}}</p>
        </v-card>

    </div>
</template>


<script>
export default {
    
    name: 'SystemAlerts',


    computed:{
        alerts(){
            let al = this.$store.getters.getAlerts;
            if(al.expiring_batches != null){
                al.expiring_batches.map((a) => {
                a.title = this.$t('errors.alerts.expirationDate'),
                a.danger = false;
                a.warning = true;
                return a;
                });
                al.running_out_products.map((a) => {
                    a.title = this.$t('errors.alerts.outOfStock'),
                    a.danger = false;
                    a.warning = true;
                    return a;
                });
                al.storages_running_out_of_space.map((a) => {
                    a.title = this.$t('errors.alerts.outOfSpace'),
                    a.danger = true;
                    a.warning = false;
                    return a;
                });
                let result = al.storages_running_out_of_space.concat(al.running_out_products).concat(al.expiring_batches);
                return result;
            }
            else{
                return {};
            }
        }
    },


    mounted() {
        this.$store.dispatch('getAlerts');
    },

}
</script>

<style scoped>

    .card{
        padding: 30px 0px;
        margin: 15px;
    }

    .alerts-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        
    }

    .content{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
        color: rgba(40, 40, 40, 0.8);
        
        /* color: blueviolet; */
    }

    .a-title{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        
        word-break: break-all;
        margin-bottom: 1.5rem;
    }

    .cell{
        width: 80%;
        margin: 0 auto;
    }

    .dan{
        border: solid 3px red !important;
    }

    .war{
         border: solid 3px rgb(255, 217, 0) !important;
    }
</style>
