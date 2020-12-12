<template >
    <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:[`activator`]="{ on }">
            <v-btn v-if="edit" v-on="on" class="mx-2" icon  small  @click="dialog=true">
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-else v-on="on" text outlined class="ml-5" @click="dialog=true">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2 class="mb-2 mt-3">{{ title() }}</h2>
                <br/>
            </v-card-title>
            
            <slot></slot>
           

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
        id:{
            type: Number,
            default: undefined,
        },
        edit:{
            type: Boolean,
            default: false,
        },
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
        },

        title(){
            let title='';
            if(this.edit){
                title += "Edytuj pracownika"
            }
            else{ title += "Dodaj pracownika"}


            return title;
        },
    },
    
}
</script>