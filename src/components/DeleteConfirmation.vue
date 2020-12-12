<template >
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn v-on="on" class="mx-2" icon  small  @click="dialog=true">
                <v-icon dark>mdi-delete</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2 class="mb-2 mt-3">{{ name }}</h2>
                <br/>
            </v-card-title>
            <v-card-subtitle>
                ID: {{ id }}
            </v-card-subtitle>

            <v-card-text>
                <p class="mb-1">Czy napewno chcesz usunąć {{ typeShow() }} {{ name }}?</p>
                <p class="mt-0">Tej akcji nie można cofnąć!</p>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text class="mb-3" @click="dialog = false">Anuluj</v-btn>
                <v-btn 
                 color="red lighten-1" 
                 class="mb-3 mr-2" 
                 dark 
                 @click="deleteFromDB(id)"
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
        id:{
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
        }
    },

    methods: {
        deleteFromDB(id){
            if(this.type === 'user'){
                this.$store.dispatch('deleteCard', id)
            }
            else{
                console.log("Nierozpoznano typu do usunięcia")
            }
        },

        typeShow(){
            if(this.type === 'user'){
                return 'użytkownika'
            }
        }
    },
    
}
</script>