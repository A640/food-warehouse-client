<template >
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn 
                v-on="on" 
                color="red lighten-1" 
                class="mb-3 mr-2" 
                elevation="0"
                :dark="count != 0"
                @click="dialog=true"
                :disabled="count == 0"
            >
                Usuń wybrane
            </v-btn>
        </template>
        <v-card v-if="loading" class="loader">
            <p>Trwa usuwanie</p>
            <v-progress-circular
                indeterminate
                color="red"
            ></v-progress-circular>
        </v-card>
        <v-card v-else>
            
            <v-card-title>
                <h2 class="mb-2 mt-3">{{ name }}</h2>
                <br/>
            </v-card-title>
            <v-card-subtitle>
                wybranych: <b>{{ count }}</b>
            </v-card-subtitle>

            <v-card-text>
                <p class="mb-1">Czy napewno chcesz usunąć <b>{{ count }}</b> {{ type }}?</p>
                <p class="mt-0">Tej akcji nie można cofnąć!</p>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text class="mb-3" @click="dialog = false">Anuluj</v-btn>
                <v-btn 
                 color="red lighten-1" 
                 class="mb-3 mr-2" 
                 elevation="1"
                 dark 
                 @click="deleteConfirm"
                >Usuń</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        name:{
            type: String,
            default: 'Usuń',
        },
        count:{
            type: Number,
            default: undefined,
        },
        type:{
            type: String,
            default: '',
        }
    },

    data() {
        return {
            dialog: false,
            loading: false,
        }
    },

    methods: {
        deleteConfirm(){
            this.loading = true;
            this.$emit('deleteConfirm');
        },

        dialogClose(){
            this.dialog = false;
            this.loading =  false;
        },
        
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
</style>