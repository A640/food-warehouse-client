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
        <v-card class="pop-card">

            <div class="cell ">
                <h2 class="pop title">{{ title() }}</h2>
            </div>
            
            <slot></slot>
           

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text class="mb-3" @click="dialog = false">Anuluj</v-btn>
                <v-btn 
                 color="blue lighten-1" 
                 class="mb-3 mr-2" 
                 dark 
                 @click="deleteFromDB(id)"
                >Zapisz</v-btn>
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

<style scoped>

    .cell{
        display: block;
        /* vertical-align: middle; */
        width: 80%;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        /* border: 1px solid red; */
    }
    .pop-card{
        padding-top: 2rem;
    }

    .pop-title{
        /* margin-top: 1rem; */
        margin-bottom: 1rem;
    }

</style>