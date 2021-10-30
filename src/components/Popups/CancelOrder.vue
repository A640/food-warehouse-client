<template >
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn v-on="on" depressed  @click="dialog=true" class="center-btn">
                {{ $t("orders.cancel") }}
            </v-btn>
        </template>
        <v-card v-if="loading" class="loader">
            <p>{{ $t("orders.orderCancellation") }}</p>
            <v-progress-circular
                indeterminate
                color="red"
            ></v-progress-circular>
        </v-card>
        <v-card v-else >
            <v-card-title>
                <h2 class="mb-2 mt-3">{{ $t("orders.cancel") }}</h2>
                <br/>
            </v-card-title>
            <v-card-subtitle>
                {{ $t("common.id") }}: {{ id }}
            </v-card-subtitle>

            <v-card-text>
                <p class="mb-1">{{ $t("orders.cancellationQuestion") }}</p>
                <p class="mt-0">{{ $t("common.actionIrreversible") }}</p>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text class="mb-3" @click="dialog = false">{{ $t("orders.notCancel") }}</v-btn>
                <v-btn 
                 color="red lighten-1" 
                 class="mb-3 mr-2" 
                 elevation="1"
                 dark 
                 @click="cancelConfirm()"
                >{{ $t("orders.cancel") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        id:{
            type: Number,
            default: undefined,
        },
    },

    data() {
        return {
            dialog: false,
            loading: false,
        }
    },

    methods: {
        cancelConfirm(){
            this.loading = true;
           this.$store.dispatch('cancelOrder',this.id).then(() => {
               this.$emit('updateOrderDetails');
               this.dialogClose();
           });
        },
        dialogClose(){
            this.dialog = false;
            this.loading =  false;
        }
    },
    
}
</script>

<style scoped>
    .loader{
        height: 12rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .loader > p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
    }
    .center-btn{
        margin: 0 auto !important;
    }
</style>